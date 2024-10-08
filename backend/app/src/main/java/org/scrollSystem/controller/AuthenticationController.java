package org.scrollSystem.controller;


import jakarta.validation.Valid;
import org.scrollSystem.request.AuthenticationRequest;
import org.scrollSystem.request.RegisterRequest;
import org.scrollSystem.response.AuthenticationResponse;
import org.scrollSystem.response.DefaultResponse;
import org.scrollSystem.service.UserAuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final UserAuthenticationService userAuthenticationService;

    @PostMapping("/register")
    public ResponseEntity<DefaultResponse<AuthenticationResponse>> register(
            @RequestBody @Valid RegisterRequest request
    ) {
        return DefaultResponse.success(userAuthenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<DefaultResponse<AuthenticationResponse>> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return DefaultResponse.success(userAuthenticationService.authenticate(request));
    }
    @GetMapping("/check")
    @PreAuthorize("hasRole('user')")
    public ResponseEntity<DefaultResponse<String>> check(
    ) {
        return DefaultResponse.success("hello world");
    }
}
