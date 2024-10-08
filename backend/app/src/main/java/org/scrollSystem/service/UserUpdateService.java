package org.scrollSystem.service;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.scrollSystem.config.security.JwtService;
import org.scrollSystem.exception.ValidationException;
import org.scrollSystem.models.User;
import org.scrollSystem.repository.UserRepository;
import org.scrollSystem.request.UpdatePasswordRequest;
import org.scrollSystem.request.UserUpdateRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateService {
    final UserRepository userRepository;
    final JwtService jwtService;
    final UserAuthenticationService authenticationService;
    final int maxAttempts = 3;
    private final PasswordEncoder passwordEncoder;
    String firstName;
    String lastName;
    String email;
    String username;
    String password;
    String role;
    String phoneNumber;;

    @Transactional
    public String update(UserUpdateRequest request, String currUsername) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!Objects.equals(user.getUsername(), currUsername)) {
            throw new ValidationException("No editing right");
        }



        //Check for first name
        if (Objects.nonNull(request.getFirstName()))
            user.setFirstName(request.getFirstName());

        // Check for last name
        if (Objects.nonNull(request.getLastName()))
            user.setLastName(request.getLastName());

        // Check for email
        if (Objects.nonNull(request.getEmail()))
           user.setEmail(request.getEmail());


        if (Objects.nonNull(request.getUsername())) {
            // Check for username
            Optional<User> username = userRepository.findByUsername(request.getUsername());
           
            if (username.isPresent())
                return "The new username is already taken";
            user.setUsername(request.getUsername());
        }
            


        // Check for phone number
        if (Objects.nonNull(request.getPhoneNumber()))
            user.setPhone(request.getPhoneNumber());

        userRepository.save(user);

        return "success";

    }

    private void setPassword(User user, String password) {
        var salt = user.getSalt();
        user.setPassword(passwordEncoder.encode(password + salt));
    }

    public String updatePassword(String user_id, UpdatePasswordRequest request) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!Objects.equals(user.getId().toString(), user_id)) {
            throw new ValidationException("No editing right");
        }

        if (!authenticationService.isAuthenticated(user, request.getOldPassword())) {
            throw new ValidationException("Password fail");
        }

        setPassword(user, request.getNewPassword());
        userRepository.save(user);

        return "success";
    }
}
