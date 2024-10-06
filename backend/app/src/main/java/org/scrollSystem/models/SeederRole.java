package org.scrollSystem.models;

import lombok.RequiredArgsConstructor;
import org.scrollSystem.repository.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import io.github.cdimascio.dotenv.Dotenv;

@Configuration
@RequiredArgsConstructor
public class SeederRole implements ApplicationRunner {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Dotenv dotenv = Dotenv.configure().directory("../").load();
        var user = User.builder()
                .firstName(dotenv.get("ADMIN_FIRST_NAME"))
                .lastName(dotenv.get("ADMIN_LAST_NAME"))
                .email(dotenv.get("ADMIN_EMAIL"))
                .password(passwordEncoder.encode(dotenv.get("ADMIN_PASSWORD")))
                .username(dotenv.get("ADMIN_USERNAME"))
                .role("admin")
                .phone(dotenv.get("ADMIN_PHONE"))
                .build();
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return;
        }
        userRepository.save(user);
    }
}
