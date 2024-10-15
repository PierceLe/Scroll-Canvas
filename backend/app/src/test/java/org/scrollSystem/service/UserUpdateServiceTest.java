//package org.scrollSystem.service;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.junit.jupiter.api.*;
//import org.junit.jupiter.api.MethodOrderer;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.TestMethodOrder;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.scrollSystem.exception.ValidationException;
//import org.scrollSystem.models.User;
//import org.scrollSystem.repository.UserRepository;
//import org.scrollSystem.request.RegisterRequest;
//import org.scrollSystem.request.UserUpdateRequest;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.security.core.context.SecurityContext;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.context.TestPropertySource;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.web.context.WebApplicationContext;
//
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//import static org.mockito.ArgumentMatchers.anyString;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//@TestPropertySource("/test.properties")
//@Transactional
//@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//
//public class UserUpdateServiceTest {
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private WebApplicationContext webApplicationContext;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    private UserUpdateRequest userUpdateRequest;
//    private UserUpdateRequest userUpdateRequest1;
//    private UserUpdateRequest userUpdateRequest2;
//
//    @BeforeEach
//    public void initData() {
//        // Set up the mockMvc using the WebApplicationContext
//        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
//
//        // Mock the SecurityContext and authentication
//        SecurityContext securityContext = mock(SecurityContext.class);
//        SecurityContextHolder.setContext(securityContext);
//        when(securityContext.getAuthentication())
//                .thenReturn(new org.springframework.security.authentication.UsernamePasswordAuthenticationToken("nvuo0694", null));
//
//        // Insert sample user records into the H2 database
//        userRepository.save(User.builder()
//                .id(1)
//                .username("hale0087")
//                .email("hale0087@uni.sydney.edu.au")
//                .firstName("Pierce")
//                .lastName("Le")
//                .role("ROLE_ADMIN")
//                .phone("+61449510532")
//                .build());
//
//        userRepository.save(User.builder()
//                .id(2)
//                .username("t3")
//                .email("c@gmail.com")
//                .firstName("hello")
//                .lastName("hi")
//                .role("ROLE_USER")
//                .phone(null)
//                .build());
//
//        userRepository.save(User.builder()
//                .id(3)
//                .username("11111111")
//                .email("s@gmail.com")
//                .firstName("hello")
//                .lastName("hi")
//                .role("ROLE_USER")
//                .phone("123456789")
//                .build());
//
//        userRepository.save(User.builder()
//                .id(5)
//                .username("hohohoho")
//                .email("nvuo0694@uni.sydney.edu.au")
//                .firstName("Nhat Minh")
//                .lastName("Vuong")
//                .role("ROLE_ADMIN")
//                .phone("123456789")
//                .build());
//
//        userRepository.save(User.builder()
//                .id(6)
//                .username("ohhohoho")
//                .email("hhheahehe@gmail.com")
//                .firstName("hehe")
//                .lastName("hihi")
//                .role("ROLE_USER")
//                .phone("123456789")
//                .build());
//
//        userRepository.save(User.builder()
//                .id(7)
//                .username("nvuo0694")
//                .email("nvuog0694@uni.sydney.edu.au")
//                .firstName("Nhat Minh")
//                .lastName("Vuong")
//                .role("ROLE_USER")
//                .phone("123456789")
//                .build());
//
//        userUpdateRequest = UserUpdateRequest.builder()
//                .username("aohohoho")
//                .firstName("aehe")
//                .lastName("aihi")
//                .email("ahheahehe@gmail.com")
//                .build();
//
//        userUpdateRequest1 = UserUpdateRequest.builder()
//                .username("ohhohoho")
//                .firstName("aehe")
//                .lastName("aihi")
//                .email("ahheahehe@gmail.com")
//                .build();
//
//        userUpdateRequest2 = UserUpdateRequest.builder()
//                .username("ohhohoho")
//                .firstName("aehe")
//                .lastName("aihi")
//                .email("s@gmail.com")
//                .build();
//    }
//
//    @Test
//    @Order(3)
//    @WithMockUser(username = "nvuo0694", roles = {"USER"})
//    public void testUpdateUsersSuccess() throws Exception {
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        String content = objectMapper.writeValueAsString(userUpdateRequest);
//
//        mockMvc.perform(MockMvcRequestBuilders
//                        .post("/api/v1/update/user/nvuo0694")
//                        .contentType(MediaType.APPLICATION_JSON_VALUE)
//                        .content(content))
//                .andExpect(MockMvcResultMatchers.status().isOk());
//    }
//
//    @Test
//    @Order(1)
//    @WithMockUser(username = "nvuo0694", roles = {"USER"})
//    public void testUpdateUsersExistUsername() throws Exception {
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        String content = objectMapper.writeValueAsString(userUpdateRequest1);
//
//        mockMvc.perform(MockMvcRequestBuilders
//                        .post("/api/v1/update/user/nvuo0694")
//                        .contentType(MediaType.APPLICATION_JSON_VALUE)
//                        .content(content))
//                .andExpect(MockMvcResultMatchers.status().isOk());
//    }
//
//    @Test
//    @Order(2)
//    @WithMockUser(username = "nvuo0694", roles = {"USER"})
//    public void testUpdateUsersExistEmail() throws Exception {
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        String content = objectMapper.writeValueAsString(userUpdateRequest2);
//
//        mockMvc.perform(MockMvcRequestBuilders
//                        .post("/api/v1/update/user/nvuo0694")
//                        .contentType(MediaType.APPLICATION_JSON_VALUE)
//                        .content(content))
//                .andExpect(MockMvcResultMatchers.status().isOk());
//    }
//}