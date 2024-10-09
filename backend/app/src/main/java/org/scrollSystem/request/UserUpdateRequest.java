package org.scrollSystem.request;

import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {

    @Pattern(regexp = "^(?=.*[a-zA-Z])(?!\\s*$).*$", message = "First name must contain only letters")
    String firstName;

    @Pattern(regexp = "^(?=.*[a-zA-Z])(?!\\s*$).*$", message = "Last name must contain only letters")
    String lastName;

    @Email(message = "Invalid email format")
    String email;

    @Size(max = 8, message = "Your customisable ID key must contain exactly 8 characters")
    @Size(min = 8, message = "Your customisable ID key must contain exactly 8 characters")
    @Pattern(regexp = "^[a-z0-9]+", message = "Your new customisable ID key must only contain digits and letters.")
    String username;

    @NotNull(message = "You must enter your current password first")
    @NotBlank(message="You must enter your current password first")
    String currentPassword;

    @Size(min = 8, message = "Your new password must be at least 8 characters long")
    @Size(max = 16, message = "Your new password must be no longer than 16 characters long")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_\\s\\t]).{8,16}$",
            message = "Password must contain at least one digit, one uppercase and lowercase " +
                    "letter, one special character, and may include spaces or tabs")
    String newPassword;


    @Pattern(regexp = "^[+]?[0-9]{10,13}$", message = "Invalid phone number")
    String phoneNumber;


}
