package org.scrollSystem.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.scrollSystem.exception.ValidationException;
import org.scrollSystem.models.User;
import org.scrollSystem.repository.UserRepository;
import org.scrollSystem.request.UserRequest;
import org.scrollSystem.response.UserResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<UserResponse> getUsers(String email, String username) {
        List<UserResponse> response = new ArrayList<>();

        List<User> userList = userRepository.getListUser(email, username);
        for (User user: userList) {
            UserResponse userResponse = UserResponse.builder()
                    .id(user.getId())
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .email(user.getEmail())
                    .username(user.getUsername())
                    .phone(user.getPhone())
                    .role(user.getRole())
                    .build();

            response.add(userResponse);
        }

        return response;
    }


    public String delete(Integer id) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        userRepository.delete(user);
        return "Success";
    }


    public UserResponse getInfo() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        UserResponse userResponse = UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .username(user.getUsername())
                .phone(user.getPhone())
                .role(user.getRole())
                .build();

        return userResponse;
    }
}