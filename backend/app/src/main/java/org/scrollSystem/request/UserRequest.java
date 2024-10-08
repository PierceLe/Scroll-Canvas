package org.scrollSystem.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UserRequest {
    @Pattern(regexp = "^[A-Za-z\\s]+$", message = "first name must contain only alphabetic characters")
    private String firstName;

    @Pattern(regexp = "^[A-Za-z\\s]+$", message = "last name must contain only alphabetic characters")
    private String lastName;

    @Email(message = "email is not in correct form")
    private String email;

    @Size(max=8, message = "user name must be no longer than 8 character")
    private String username;

    private String phone;
}
