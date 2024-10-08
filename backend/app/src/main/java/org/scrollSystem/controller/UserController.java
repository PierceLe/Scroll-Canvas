package org.scrollSystem.controller;

import jakarta.validation.constraints.NotNull;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.scrollSystem.request.UserRequest;
import org.scrollSystem.response.DefaultListResponse;
import org.scrollSystem.response.DefaultResponse;
import org.scrollSystem.response.UserResponse;
import org.scrollSystem.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Nullable;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<DefaultListResponse<UserResponse>> getUsers(
            @RequestParam @Nullable String email,
            @RequestParam @Nullable String username
    ) {
        return DefaultListResponse.success(userService.getUsers(email, username));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DefaultResponse<String>> updateUser (
            @PathVariable @NotNull Integer id,
            @RequestBody UserRequest userRequest
            ) {
        return DefaultResponse.success(userService.update(id, userRequest));
    }
}
