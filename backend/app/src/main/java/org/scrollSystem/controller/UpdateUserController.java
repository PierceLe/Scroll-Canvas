package org.scrollSystem.controller;


import jakarta.validation.Valid;
import lombok.*;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.scrollSystem.request.UserUpdateRequest;
import org.scrollSystem.response.DefaultResponse;
import org.scrollSystem.service.UserUpdateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/update")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UpdateUserController {
    UserUpdateService userUpdateService;

    @PutMapping("/user/{user_id}")
    public ResponseEntity<DefaultResponse<String>> update(@RequestBody @Valid UserUpdateRequest request,
                                                           @PathVariable String user_id) {
        return DefaultResponse.success(userUpdateService.update(request, user_id));
    }
}
