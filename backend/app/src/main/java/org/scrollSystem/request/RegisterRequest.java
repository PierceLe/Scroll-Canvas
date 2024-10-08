package org.scrollSystem.request;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @NotNull(message = "first name can not be empty")
    @NotBlank(message = "first name can not be empty")
    @Pattern(regexp = "^[A-Za-z\\s]+$", message = "first name must contain only alphabetic characters")
    private String firstName;

    @NotNull(message = "last name can not be empty")
    @NotBlank(message = "last name can not be empty")
    @Pattern(regexp = "^[A-Za-z\\s]+$", message = "last name must contain only alphabetic characters")
    private String lastName;

    @Email(message = "email is not in correct form")
    @NotNull(message = "email can not be empty")
    @NotBlank(message = "email can not be empty")
    private String email;

    @NotNull(message = "password can not be empty")
    @NotBlank(message = "password can not be empty")
    @Size(min = 8, message = "password must be at least 8 characters long")
    @Size(max = 16, message = "password must be no longer than 16 characters long")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_\\s\\t]).{8,16}$",
            message = "password must contain at least one digit, one uppercase and lowercase letter, one special character, and may include spaces or tabs")
    private String password;

    @NotNull(message = "user name can not be empty")
    @NotBlank(message = "user name can not be empty")
    @Size(max=8, message = "user name must be no longer than 8 character")
    private String username;

    @NotNull(message = "phone can not be empty")
    @NotBlank(message = "phone can not be empty")
    private String phone;
}
