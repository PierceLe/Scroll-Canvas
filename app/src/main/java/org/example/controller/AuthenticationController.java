package org.example.controller;

import jakarta.validation.Valid;
import org.example.request.AuthenticationRequest;
import org.example.request.RegisterRequest;
import org.example.response.AuthenticationResponse;
import org.example.response.DefaultResponse;
import org.example.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<DefaultResponse<AuthenticationResponse>> register(
            @RequestBody @Valid RegisterRequest request
    ) {
        return DefaultResponse.success(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<DefaultResponse<AuthenticationResponse>> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return DefaultResponse.success(authenticationService .authenticate(request));
    }
}
