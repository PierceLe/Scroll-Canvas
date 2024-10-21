package org.scrollSystem.controller;

import lombok.RequiredArgsConstructor;
import org.scrollSystem.exception.ValidationException;
import org.scrollSystem.request.FileRequest;
import org.scrollSystem.response.*;
import org.scrollSystem.service.ScrollService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Nullable;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/api/v1/scroll")
@RequiredArgsConstructor
public class ScrollController {
    private final ScrollService scrollService;

    // API for upload the file into AWS S3
    @PostMapping({"/upload"})
    public ResponseEntity<DefaultResponse<FileResponse>> uploadScroll(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title
    ) throws IOException {
        try {
            FileResponse fileResponse = scrollService.uploadFile(file, title);
            return DefaultResponse.success(fileResponse);
        }
        catch (IOException e) {
            return DefaultResponse.error("Failed to upload file");
        }
    }

    // API for delete the file
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<DefaultResponse<Integer>> deleteFile(@PathVariable Integer id) {
        try {
            Integer id_deleted = scrollService.deleteFile(id);
            return DefaultResponse.success("File deleted successfully", id_deleted);
        } catch (Exception e) {
            return DefaultResponse.error("Error deleting file: " + e.getMessage());
        }
    }

    // API for get scrolls and filter depend on the params such as title, file_type, owner
    @GetMapping("")
    public ResponseEntity<DefaultResponse<List<FileResponse>>> getSearchFilter(@RequestParam("title") @Nullable String title,
                                                                               @RequestParam("file_type") @Nullable String fileType,
                                                                               @RequestParam("owner") @Nullable String ownerUsername,
                                                                               @RequestParam("file_id") @Nullable Integer fileId,
                                                                               @RequestParam("From") @Nullable Timestamp fromDate,
                                                                               @RequestParam("To") @Nullable Timestamp toDate) throws ValidationException {
//        System.out.println(fromDate + " " + toDate);
        return DefaultResponse.success(scrollService.getSearchFilter(title, fileType, ownerUsername,fileId, fromDate, toDate));
    }

//    @GetMapping("")
//    public ResponseEntity<DefaultListResponse<FileResponse>> getScrolls(
//    ) {
//        return DefaultListResponse.success(scrollService.getScrolls());
//    }

    @GetMapping("/download/{id}")
    public ResponseEntity<DefaultResponse<String>> download(@PathVariable Integer id) {
        return DefaultResponse.success(scrollService.download(id));
    }

    @PutMapping("/update")
    public ResponseEntity<DefaultResponse<FileResponse>> update(@RequestBody FileRequest request) {
        return DefaultResponse.success(scrollService.update(request));
    }
}