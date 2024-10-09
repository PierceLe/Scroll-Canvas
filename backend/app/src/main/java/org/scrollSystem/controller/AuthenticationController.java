package org.scrollSystem.controller;


import jakarta.validation.Valid;
import org.scrollSystem.request.AuthenticationRequest;
import org.scrollSystem.request.RegisterRequest;
import org.scrollSystem.request.UpdatePasswordRequest;
import org.scrollSystem.response.AuthenticationResponse;
import org.scrollSystem.response.DefaultResponse;
import org.scrollSystem.service.UserAuthenticationService;
import lombok.RequiredArgsConstructor;
import org.scrollSystem.service.UserService;
import org.scrollSystem.service.UserUpdateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final UserAuthenticationService userAuthenticationService;
    private final UserUpdateService userUpdateService;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<DefaultResponse<AuthenticationResponse>> register(
            @RequestBody @Valid RegisterRequest request
    ) {
        return DefaultResponse.success(userAuthenticationService.register(request));
    }


    @PostMapping("/login")
    public ResponseEntity<DefaultResponse<AuthenticationResponse>> login(
            @RequestBody AuthenticationRequest request
    ) {
        return DefaultResponse.success(userAuthenticationService.login(request));
    }

    @PutMapping("/change_password/{user_id}")
    public ResponseEntity<DefaultResponse<String>> updatePassword(
            @PathVariable String user_id,
            @RequestBody @Valid UpdatePasswordRequest request
    ) {
        return DefaultResponse.success(userUpdateService.updatePassword(user_id, request));
    }

    @GetMapping("/check-username")
    public ResponseEntity<DefaultResponse<String>> checkExistingUsername(
            @RequestParam String username
    ) {
        return DefaultResponse.success(userService.checkExistingUsername(username));
    }
}
