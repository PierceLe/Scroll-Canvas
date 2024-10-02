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
    @NotNull(message = "email ko được để trống")
    @NotBlank(message = "email ko được để trống")
    private String email;
    @NotNull(message = "Mật khẩu không được để trống")
    @NotBlank(message = "Mật khẩu không được để trống")
    private String password;
}
