package org.scrollSystem.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.scrollSystem.exception.ValidationException;
import org.scrollSystem.models.FileStorage;
import org.scrollSystem.models.User;
import org.scrollSystem.repository.FileStorageRepository;
import org.scrollSystem.repository.UserRepository;
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
    private final UserService userService;
    private final UserRepository userRepository;

    @Transactional
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

        owner.setUploadNumber(owner.getUploadNumber() + 1);
        userRepository.save(owner);

        FileResponse response = FileResponse.builder()
                .fileId(fileStorage.getFileId())
                .title(fileStorage.getTitle())
                .filePath(fileStorage.getFilePath())
                .fileSize(fileStorage.getFileSize())
                .fileType(fileStorage.getFileType())
                .uploadDate(fileStorage.getUploadDate())
                .downloadAmount(fileStorage.getDownloadAmount())
                .build();

        UserResponse ownerResponse = userService.getUserResponse(owner);

        response.setOwner(ownerResponse);

        return response;
    }

    public Integer deleteFile(Integer id) {
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
        return id;
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

    public List<FileResponse> getSearchFilter(String title, String fileType, String ownerUsername, Integer fileId,
                                           Timestamp fromDate, Timestamp toDate) {
        List<FileResponse> response = new ArrayList<>();
        Optional<User> user = userRepository.findByUsername(ownerUsername);
        if (!user.isPresent() && ownerUsername != null) {
            throw new ValidationException("Username is not exists");
        }
        Integer user_id = null;
        if (ownerUsername != null){
            user_id = user.get().getId();
        }
        List<FileStorage> scrollsList = fileRepository.filterbyField(title, fileType, user_id, fileId, fromDate, toDate);
        System.out.println(scrollsList.size() + " "+ title);
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


    public String download(Integer id) {
        Optional<FileStorage> file = fileRepository.getFileStorageByFileId(id);

        if (file.isEmpty()) {
            throw new ValidationException("File id " + id + " is not exist");
        }

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        user.setDownloadNumber(user.getDownloadNumber() + 1);
        userRepository.save(user);

        return file.get().getFilePath();
    }
}
