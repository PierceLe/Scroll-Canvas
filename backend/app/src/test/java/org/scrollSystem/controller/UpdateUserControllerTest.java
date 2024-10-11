package org.scrollSystem.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.scrollSystem.models.User;
import org.scrollSystem.repository.UserRepository;
import org.scrollSystem.request.UserUpdateRequest;
import org.scrollSystem.service.UserUpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.springframework.mock.http.server.reactive.MockServerHttpRequest.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/test.properties")
public class UpdateUserControllerTest
{

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private UserRepository userRepository;

    @MockBean
    private UserUpdateService userUpdateService;

    private UserUpdateRequest userUpdateRequestSuccess;

    @BeforeEach
    void initdata()
    {

        User user  = User.builder()
            .firstName("Nhat Minh")
                .lastName("Vuong")
                .email("abcdef@gmail.com")
                .username("nhatminh")
                .role("abc")
                .password("Minh301203@")
                .phone("0413688993")
            .build();

        userRepository.save(user);


        userUpdateRequestSuccess =  UserUpdateRequest.builder()
                .firstName("Nhat Minh")
                .lastName("Vuong")
                .email("abcdef@gmail.com")
                .username("nhatminh")
                .phoneNumber("0413688993")
                .build();

        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();



    }

    @Test
    void testUpdateUser() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        String content = objectMapper.writeValueAsString(userUpdateRequestSuccess);

        Mockito.when(userUpdateService.update(any(UserUpdateRequest.class), anyString())).thenReturn("User update successfully");

        mockMvc.perform(MockMvcRequestBuilders
                        .put("/api/v1/update/user/{user_id}", "123")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(content))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

}
