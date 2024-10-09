package org.scrollSystem.controller;


import jakarta.validation.Valid;
import org.scrollSystem.request.AuthenticationRequest;
import org.scrollSystem.request.RegisterRequest;
import org.scrollSystem.response.AuthenticationResponse;
import org.scrollSystem.response.DefaultResponse;
import org.scrollSystem.service.UserAuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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


    @PostMapping("/login")
    public ResponseEntity<DefaultResponse<AuthenticationResponse>> login(
            @RequestBody AuthenticationRequest request
    ) {
        return DefaultResponse.success(userAuthenticationService.login(request));
    }
}
