package org.scrollSystem.controller;

import org.scrollSystem.response.DefaultResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/check")
public class CheckController {
    @GetMapping("/health")
    public ResponseEntity<DefaultResponse<String>> healthCheck() {
        return DefaultResponse.success("Hello from unsecured endpoint" );
    }

    @GetMapping("/token")
    public ResponseEntity<DefaultResponse<String>> checkToken() {
        return DefaultResponse.success("Hello from secured endpoint" );
    }
}
