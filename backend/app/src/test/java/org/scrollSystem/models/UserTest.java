package org.scrollSystem.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

import static org.junit.jupiter.api.Assertions.*;

public class UserTest {

    private User user;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .id(1)
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .username("john1234")
                .role("ROLE_USER")
                .password("hashedpassword")
                .phone("+1234567890")
                .salt("somesalt")
                .build();
    }

    @Test
    void testGettersAndSetters() {
        assertEquals(1, user.getId());
        assertEquals("John", user.getFirstName());
        assertEquals("Doe", user.getLastName());
        assertEquals("john.doe@example.com", user.getEmail());
        assertEquals("john1234", user.getUsername());
        assertEquals("ROLE_USER", user.getRole());
        assertEquals("hashedpassword", user.getPassword());
        assertEquals("+1234567890", user.getPhone());
        assertEquals("somesalt", user.getSalt());

        user.setFirstName("Jane");
        assertEquals("Jane", user.getFirstName());
    }

    @Test
    void testUserDetailsImplementation() {
        Collection<? extends GrantedAuthority> authorities = user.getAuthorities();
        assertEquals(1, authorities.size());
        assertTrue(authorities.stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_USER")));

        assertTrue(user.isAccountNonExpired());
        assertTrue(user.isAccountNonLocked());
        assertTrue(user.isCredentialsNonExpired());
        assertTrue(user.isEnabled());
    }

    @Test
    void testUserBuilder() {
        User user2 = User.builder()
                .id(2)
                .firstName("Jane")
                .lastName("Smith")
                .email("jane.smith@example.com")
                .username("jane1234")
                .role("ROLE_ADMIN")
                .password("hashedpassword2")
                .phone("+0987654321")
                .salt("anothersalt")
                .build();

        assertEquals(2, user2.getId());
        assertEquals("Jane", user2.getFirstName());
        assertEquals("Smith", user2.getLastName());
        assertEquals("jane.smith@example.com", user2.getEmail());
        assertEquals("jane1234", user2.getUsername());
        assertEquals("ROLE_ADMIN", user2.getRole());
        assertEquals("hashedpassword2", user2.getPassword());
        assertEquals("+0987654321", user2.getPhone());
        assertEquals("anothersalt", user2.getSalt());
    }

    @Test
    void testEqualsAndHashCode() {
        User userCopy = User.builder()
                .id(1)
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .username("john1234")
                .role("ROLE_USER")
                .password("hashedpassword")
                .phone("+1234567890")
                .salt("somesalt")
                .build();

        assertEquals(user, userCopy);
        assertEquals(user.hashCode(), userCopy.hashCode());
    }

    @Test
    void testUserDetailsFields() {

        assertEquals("john1234", user.getUsername());

        assertEquals("hashedpassword", user.getPassword());
    }
}
