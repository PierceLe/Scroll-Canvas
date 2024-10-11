package org.scrollSystem.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.scrollSystem.request.RegisterRequest;
import org.scrollSystem.request.UserUpdateRequest;
import org.scrollSystem.response.AuthenticationResponse;
import org.scrollSystem.response.DefaultResponse;
import org.scrollSystem.response.UserResponse;
import org.scrollSystem.request.AuthenticationRequest;
import org.scrollSystem.service.UserAuthenticationService;
import org.scrollSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/test.properties")
public class AuthenticationControllerTest
{
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @MockBean
    private UserAuthenticationService userAuthenticationService;

    private AuthenticationRequest authenticationRequestFails;
    private RegisterRequest registerRequestSucesss;
    private RegisterRequest registerRequestFails;
    private AuthenticationResponse authenticationResponse;
    private UserUpdateRequest updateRequestSucesss;
    @BeforeEach
    void initData()
    {
        authenticationRequestFails = AuthenticationRequest.builder()
                .username("idolbminh")
                .password("Minh301203@")
                .build();

        registerRequestSucesss = RegisterRequest.builder()
                .firstName("Nhat Minh")
                .lastName("Vuong")
                .email("nvuo0694@uni.sydney.edu.au")
                .password("LongBien1@")
                .username("nvuo0694")
                .phone("0413688993")
                .build();

        registerRequestFails = RegisterRequest.builder()
            .firstName("Nhat Minh")
            .lastName("Vuong")
            .email("nvuo0694@uni.sydney.edu.au")
            .password("1")
            .username("nvuo0694")
            .phone("0413688993")
            .build();

        authenticationResponse = AuthenticationResponse.builder()
                .token("token")
                .build();

        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();



    }

    @Test
    public void testRegisterSuccess() throws Exception
    {
        ObjectMapper objectMapper = new ObjectMapper();
        String content = objectMapper.writeValueAsString(registerRequestSucesss);

        Mockito.when(userAuthenticationService.register(ArgumentMatchers.any())).thenReturn(authenticationResponse);

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(content))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testRegisterFail() throws Exception
    {
        ObjectMapper objectMapper = new ObjectMapper();
        String content = objectMapper.writeValueAsString(registerRequestFails);

        Mockito.when(userAuthenticationService.register(ArgumentMatchers.any())).thenReturn(authenticationResponse);

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(content))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testLoginFail() throws Exception
    {
        ObjectMapper objectMapper = new ObjectMapper();
        String content = objectMapper.writeValueAsString(authenticationRequestFails);

        Mockito.when(userAuthenticationService.register(ArgumentMatchers.any())).thenReturn(authenticationResponse);

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(content))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }










}
