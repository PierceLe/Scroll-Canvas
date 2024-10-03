package org.example.request;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String firstname;
    private String lastname;
    @NotNull(message = "email can not be empty")
    @NotBlank(message = "email can not be empty")
    private String email;
    @NotNull(message = "password can not be empty")
    @NotBlank(message = "password can not be empty")
    private String password;
}
