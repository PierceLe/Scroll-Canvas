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
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
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
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Integer user_id = user.getId();

        FileStorage fileStorage = optionalFileStorage.get();

        if (!fileStorage.getOwner().getId().equals(user_id) && user.getRole().equals("ROLE_USER")) {
            throw new ValidationException("You are not the owner of the file so you can not delete this scroll");
        }

        s3Service.deleteFile(fileStorage.getTitle());
        fileRepository.delete(fileStorage);
    }


    public List<FileResponse> getScrolls() {
        List<FileResponse> response = new ArrayList<>();

        List<FileStorage> scrollsList = fileRepository.findAll();
        for (FileStorage fileStorage: scrollsList) {
            FileResponse scrollResponse = FileResponse.builder()
                    .fileId(fileStorage.getFileId())
                    .title(fileStorage.getTitle())
                    .filePath(fileStorage.getFilePath())
                    .fileSize(fileStorage.getFileSize())
                    .fileType(fileStorage.getFileType())
                    .uploadDate(fileStorage.getUploadDate())
                    .downloadAmount(fileStorage.getDownloadAmount())
                    .build();
            User owner = fileStorage.getOwner();
            UserResponse userResponse = UserResponse.builder()
                    .id(owner.getId())
                    .firstName(owner.getFirstName())
                    .lastName(owner.getLastName())
                    .email(owner.getEmail())
                    .username(owner.getUsername())
                    .phone(owner.getPhone())
                    .role(owner.getRole())
                    .build();

            scrollResponse.setOwner(userResponse);
            response.add(scrollResponse);
        }
        return response;
    }
}
