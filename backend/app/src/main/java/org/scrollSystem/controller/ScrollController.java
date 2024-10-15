package org.scrollSystem.controller;

import lombok.RequiredArgsConstructor;
import org.scrollSystem.response.DefaultListResponse;
import org.scrollSystem.response.DefaultResponse;
import org.scrollSystem.response.FileResponse;
import org.scrollSystem.response.UserResponse;
import org.scrollSystem.service.ScrollService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Nullable;
import java.io.IOException;

@RestController
@RequestMapping("/api/v1/scroll")
@RequiredArgsConstructor
public class ScrollController {
    private final ScrollService ScrollService;

    @PostMapping({"/upload"})
    public ResponseEntity<DefaultResponse<FileResponse>> uploadScroll(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title
    ) throws IOException {
        try {
            FileResponse fileResponse = ScrollService.uploadFile(file, title);
            return DefaultResponse.success(fileResponse);
        }
        catch (Exception e) {
            return DefaultResponse.error("Failed to upload file");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<DefaultResponse<String>> deleteFile(@PathVariable Integer id) {
        try {
            ScrollService.deleteFile(id);
            return DefaultResponse.success("File deleted successfully");
        } catch (Exception e) {
            return DefaultResponse.error("Error deleting file: " + e.getMessage());
        }
    }

    @GetMapping("")
    public ResponseEntity<DefaultListResponse<FileResponse>> getScrolls(
    ) {
        return DefaultListResponse.success(ScrollService.getScrolls());
    }

}