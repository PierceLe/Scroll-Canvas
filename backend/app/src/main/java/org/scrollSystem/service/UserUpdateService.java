package org.scrollSystem.service;


import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.scrollSystem.config.security.JwtService;
import org.scrollSystem.exception.ValidationException;
import org.scrollSystem.models.User;
import org.scrollSystem.repository.UserRepository;
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


        var salt = user.getSalt();
        var hashRequestCurrPassword = passwordEncoder.encode(request.getCurrentPassword() + salt);
        if (!hashRequestCurrPassword.equals(user.getPassword()))
            return "false at password";


        //Check for first name
        if (Objects.nonNull(request.getFirstName()))
            user.setFirstName(request.getFirstName());

        // Check for last name
        if (Objects.nonNull(request.getLastName()))
            user.setLastName(request.getLastName());

        // Check for email
        if (Objects.nonNull(request.getEmail()))
           user.setEmail(request.getEmail());


        // Check for username
        Optional <User> username = userRepository.findByUsername(request.getUsername());


        if (Objects.nonNull(request.getUsername()))
            if (username.isPresent())
                return "The new username is already taken";
            user.setUsername(request.getUsername());


        // Check for new password
        if (Objects.nonNull((request.getNewPassword())))
            user.setPassword(passwordEncoder.encode(request.getNewPassword() + salt));


        // Check for phone number
        if (Objects.nonNull(request.getPhoneNumber()))
            user.setPhone(request.getPhoneNumber());

        userRepository.save(user);

        return "success";

    }
}

