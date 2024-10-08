package org.scrollSystem.controller;

import jakarta.validation.Valid;
import org.scrollSystem.request.RegisterRequest;
import org.scrollSystem.response.DefaultResponse;
import org.scrollSystem.service.UserAuthenticationService;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/check")
@RequiredArgsConstructor
public class CheckHealthController {
    private static final org.slf4j.Logger log = LoggerFactory.getLogger(AuthenticationController.class);
    private final UserAuthenticationService userAuthenticationService;


    @PostMapping("/health")
    public ResponseEntity<DefaultResponse<String>> check(
    ) {

        log.info(SecurityContextHolder.getContext().getAuthentication().getName());
        return DefaultResponse.success("hello world");
    }
}
