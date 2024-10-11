package org.scrollSystem.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.scrollSystem.config.ApplicationConfig;
import org.scrollSystem.config.security.JwtService;
import org.scrollSystem.models.User;
import org.scrollSystem.repository.UserRepository;
import org.scrollSystem.request.AuthenticationRequest;
import org.scrollSystem.request.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/test.properties")
@Transactional
public class UserAuthenticationServiceTest
{
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private ApplicationConfig applicationConfig;

    private AuthenticationRequest authenticationRequest;
    private RegisterRequest registerRequestSucesss;
    private RegisterRequest registerRequestFail1;
    private RegisterRequest registerRequestFail2;

    @BeforeEach
    void initdata()
    {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        userRepository.save(User.builder()
                .id(1)
                .username("hale0087")
                .email("hale0087@uni.sydney.edu.au")
                .firstName("Pierce")
                .lastName("Le")
                .role("ROLE_ADMIN")
                .phone("+61449510532")
                .password("123456")
                .build());



        registerRequestSucesss = RegisterRequest.builder()
                .firstName("Nhat Minh")
                .lastName("Vuong")
                .email("nvuo0694@uni.sydney.edu.au")
                .password("LongBien1@")
                .username("nvuo0694")
                .phone("0413688993")
                .build();


    }

    @Test
    void testLoginFail() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        String content = objectMapper.writeValueAsString(authenticationRequest);

        mockMvc.perform(MockMvcRequestBuilders
                .post("/api/v1/auth/login")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(content))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void testLoginSuccess() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();

        authenticationRequest = AuthenticationRequest.builder()
                .username("hale0087")
                .password("123456")
                .build();
        String content = objectMapper.writeValueAsString(authenticationRequest);

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(content))
                .andExpect(MockMvcResultMatchers.status().isOk());
//                .andExpect(MockMvcResultMatchers.jsonPath("$.success").value(true))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.data.token").isNotEmpty());
    }

    @Test
    void testRegisterFail2() throws Exception
    {
        ObjectMapper objectMapper = new ObjectMapper();

        registerRequestFail2 = RegisterRequest.builder()
                .firstName("Nha Minh")
                .lastName("Vung")
                .email("hale@uni.sydney.edu.au")
                .password("LongBien1@")
                .username("hale0087")
                .phone("0413688993")
                .build();
        String content = objectMapper.writeValueAsString(registerRequestFail2);

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(content))
                .andExpect(MockMvcResultMatchers.status().isOk());

    }

    @Test
    void testRegisterSuccess() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        String content = objectMapper.writeValueAsString(registerRequestSucesss);

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(content))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void testRegisterFail1() throws Exception {

        registerRequestFail1 = RegisterRequest.builder()
                .firstName("Nha Minh")
                .lastName("Vung")
                .email("hale0087@uni.sydney.edu.au")
                .password("LongBien1@")
                .username("hale0087")
                .phone("0413688993")
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        String content = objectMapper.writeValueAsString(registerRequestFail1);

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(content))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

}
