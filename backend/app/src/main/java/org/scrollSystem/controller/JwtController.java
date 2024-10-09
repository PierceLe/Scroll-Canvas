package org.scrollSystem.controller;


import org.scrollSystem.response.AuthenticationResponse;
import org.scrollSystem.response.DefaultResponse;
import lombok.RequiredArgsConstructor;
import org.scrollSystem.service.JwtService;
import org.scrollSystem.service.UserUpdateService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

public class JwtController {
    @RestController
    @RequestMapping("/api/v1/")
    @RequiredArgsConstructor
    public static class UpdateRequest {
        public JwtService jwtService;

        @GetMapping("getinfo")
        public ResponseEntity<DefaultResponse<String>> register(
        ) {
            return DefaultResponse.success(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        }
    }
}
