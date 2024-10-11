package org.scrollSystem.service;

import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.mockito.internal.matchers.Null;
import org.scrollSystem.models.User;
import org.scrollSystem.repository.UserRepository;
import org.scrollSystem.response.DefaultResponse;
import org.scrollSystem.response.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

//@SpringBootTest
//@AutoConfigureMockMvc
//@TestPropertySource("/test.properties")
//public class UserServiceTest
//{
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private UserService userService;
//
//    @Autowired
//    private WebApplicationContext webApplicationContext;
//
//    @MockBean
//    private UserRepository userRepository;
//
//    private DefaultResponse<List<UserResponse>> defaultResponse;
//    private UserResponse userResponse;
//
//    @BeforeEach
//    void initdata()
//    {
//
//        User user  = User.builder()
//                .firstName("Nhat Minh")
//                .lastName("Vuong")
//                .email("abcdef@gmail.com")
//                .username("nhatminh")
//                .role("abc")
//                .password("Minh301203@")
//                .phone("0413688993")
//                .build();
//
//        UserResponse userResponse = UserResponse.builder()
//                .firstName("Nhat Minh")
//                .lastName("Vuong")
//                .email("abcdef@gmail.com")
//                .username("nhatminh")
//                .role("abc")
//                .build();
//
//        userRepository.save(user);
//
//        defaultResponse = DefaultResponse.<List<UserResponse>>builder()
//                .success(null)
//                .data(List.of(userResponse))
//                .build();
//
//        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
//    }
//
//    @Test
//    void getUsersSuccess() throws Exception {
//        Mockito.when(userService.getUsers(null, null)).thenReturn(defaultResponse.getData());
//
//        // Perform the GET request and verify the response
//        mockMvc.perform(MockMvcRequestBuilders
//                        .get("/api/v1/user")
//                        .contentType(MediaType.APPLICATION_JSON_VALUE))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andExpect(MockMvcResultMatchers.jsonPath("$.success").value(true))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.message").isEmpty())
//                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].username").value("nhatminh"))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].email").value("abcdef@gmail.com"));
//
//
//    }
//
//}
