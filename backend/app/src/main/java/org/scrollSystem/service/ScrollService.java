package org.scrollSystem.service;

import lombok.RequiredArgsConstructor;
import org.scrollSystem.exception.ValidationException;
import org.scrollSystem.models.FileStorage;
import org.scrollSystem.models.User;
import org.scrollSystem.repository.FileStorageRepository;
import org.scrollSystem.response.FileResponse;
import org.scrollSystem.response.UserResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ScrollService {
    private final FileStorageRepository fileRepository;
    private final S3Service s3Service;

    public FileResponse uploadFile(MultipartFile file, String title) throws IOException {
        Optional<FileStorage> optionalFileStorage = fileRepository.getFileStorageByTitle(title);

        if (optionalFileStorage.isPresent()) {
            throw new ValidationException("File title is exists");
        }

        String filePath = s3Service.uploadFile(file);

        User owner = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        FileStorage fileStorage = FileStorage.builder()
                .title(title)
                .filePath(filePath)
                .fileSize(file.getSize())
                .fileType(file.getContentType())
                .owner(owner)
                .build();
        fileRepository.save(fileStorage);

        FileResponse response = FileResponse.builder()
                .fileId(fileStorage.getFileId())
                .title(fileStorage.getTitle())
                .filePath(fileStorage.getFilePath())
                .fileSize(fileStorage.getFileSize())
                .fileType(fileStorage.getFileType())
                .uploadDate(fileStorage.getUploadDate())
                .downloadAmount(fileStorage.getDownloadAmount())
                .build();

        UserResponse ownerResponse = UserResponse.builder()
                .id(owner.getId())
                .firstName(owner.getFirstName())
                .lastName(owner.getLastName())
                .email(owner.getEmail())
                .username(owner.getUsername())
                .phone(owner.getPhone())
                .role(owner.getRole())
                .build();

        response.setOwner(ownerResponse);

        return response;
    }

    public void deleteFile(Integer id) {
        Optional<FileStorage> optionalFileStorage = fileRepository.getFileStorageByFileId(id);

        if (optionalFileStorage.isEmpty()) {
            throw new ValidationException("File id is not exists");
        }

        FileStorage fileStorage = optionalFileStorage.get();
        s3Service.deleteFile(fileStorage.getTitle());
        fileRepository.delete(fileStorage);
    }
}
