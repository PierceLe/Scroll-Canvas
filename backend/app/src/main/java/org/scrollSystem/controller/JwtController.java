package org.scrollSystem.controller;


import org.scrollSystem.models.User;
import org.scrollSystem.response.DefaultResponse;
import lombok.RequiredArgsConstructor;
import org.scrollSystem.response.UserResponse;
import org.scrollSystem.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class JwtController {

    private final UserService jwtService;

    @GetMapping("getinfo")
    public ResponseEntity<DefaultResponse<UserResponse>> register(
    ) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return DefaultResponse.success(jwtService.getInfo());
    }
}
