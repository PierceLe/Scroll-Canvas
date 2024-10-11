package org.scrollSystem.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import org.mockito.Mockito;
import org.scrollSystem.models.User;
import org.scrollSystem.repository.UserRepository;
import org.scrollSystem.response.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/test.properties")
@Transactional
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)

public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void initData() {
        // Set up the mockMvc using the WebApplicationContext
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        // Insert sample user records into the H2 database
        userRepository.save(User.builder()
                .id(1)
                .username("hale0087")
                .email("hale0087@uni.sydney.edu.au")
                .firstName("Pierce")
                .lastName("Le")
                .role("ROLE_ADMIN")
                .phone("+61449510532")
                .build());

        userRepository.save(User.builder()
                .id(2)
                .username("t3")
                .email("c@gmail.com")
                .firstName("hello")
                .lastName("hi")
                .role("ROLE_USER")
                .phone(null)
                .build());

        userRepository.save(User.builder()
                .id(3)
                .username("11111111")
                .email("s@gmail.com")
                .firstName("hello")
                .lastName("hi")
                .role("ROLE_USER")
                .phone("123456789")
                .build());

        userRepository.save(User.builder()
                .id(4)
                .username("john1234")
                .email("john.doe@example.com")
                .firstName("John")
                .lastName("Doe")
                .role("ROLE_USER")
                .phone("+1234567890")
                .build());

        userRepository.save(User.builder()
                .id(5)
                .username("nvuo0694")
                .email("nvuo0694@uni.sydney.edu.au")
                .firstName("Nhat Minh")
                .lastName("Vuong")
                .role("ROLE_ADMIN")
                .phone("123456789")
                .build());
    }

    @Test
    @Order(1)
    @WithMockUser(username = "hale0087", roles = {"ADMIN"})
    public void testGetUsersSuccess() throws Exception {
        // Perform the GET request and verify the response
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/user")
                        .header("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IlJPTEVfQURNSU4iLCJzdWIiOiJoYWxlMDA4NyIsImlhdCI6MTcyODUxMDMwNiwiZXhwIjoxNzI4NTk2NzA2fQ.yhhT-bsGcii02RTL5rbYemBlHqQJYHzsKhgBsGIOZoU")
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.success").value(true))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").isEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].firstName").value("Pierce"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].lastName").value("Le"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].email").value("hale0087@uni.sydney.edu.au"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].username").value("hale0087"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].role").value("ROLE_ADMIN"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].phone").value("+61449510532"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[1].id").value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[1].firstName").value("hello"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[1].lastName").value("hi"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[1].email").value("c@gmail.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[1].username").value("t3"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[1].role").value("ROLE_USER"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[1].phone").doesNotExist())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[2].id").value(3))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[2].firstName").value("hello"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[2].lastName").value("hi"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[2].email").value("s@gmail.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[2].username").value("11111111"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[2].role").value("ROLE_USER"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[2].phone").value("123456789"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[3].id").value(4))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[3].firstName").value("John"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[3].lastName").value("Doe"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[3].email").value("john.doe@example.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[3].username").value("john1234"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[3].role").value("ROLE_USER"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[3].phone").value("+1234567890"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[4].id").value(5))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[4].firstName").value("Nhat Minh"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[4].lastName").value("Vuong"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[4].email").value("nvuo0694@uni.sydney.edu.au"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[4].username").value("nvuo0694"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[4].role").value("ROLE_ADMIN"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[4].phone").value("123456789"));
    }



    @Test
    @Order(2)
    @WithMockUser(username = "hale0087", roles = {"ADMIN"})
    public void deleteSuccessfully() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/api/v1/user/11111111")
                        .header("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IlJPTEVfQURNSU4iLCJzdWIiOiJoYWxlMDA4NyIsImlhdCI6MTcyODUxMDMwNiwiZXhwIjoxNzI4NTk2NzA2fQ.yhhT-bsGcii02RTL5rbYemBlHqQJYHzsKhgBsGIOZoU")
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.success").value(true))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").isEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data").value("User with username 11111111 deleted successfully"));
    }



}