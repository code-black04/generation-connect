package com.generation.connect.controller;

import com.generation.connect.dto.auth.SignInRequestDTO;
import com.generation.connect.dto.auth.SignUpRequestDTO;
import com.generation.connect.entity.UserEntity;
import com.generation.connect.service.implementation.JwtService;
import com.generation.connect.service.UserSigningService;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import java.util.Base64;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class UserSigningControllerTest {

    private MockMvc mockMvc;

    @Mock
    private UserSigningService userSigningService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private UserSigningController userSigningController;

    @Mock
    private HttpServletResponse httpServletResponse;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userSigningController).build();
    }

    @Test
    void testSignUpUser_Success() throws Exception {
        SignUpRequestDTO signUpRequestDTO = new SignUpRequestDTO();
        signUpRequestDTO.setFirstName("John");
        signUpRequestDTO.setLastName("Doe");
        signUpRequestDTO.setEmailId("john.doe@example.com");
        signUpRequestDTO.setPassword(Base64.getEncoder().encodeToString("Password123!".getBytes()));
        signUpRequestDTO.setDateOfBirth(java.time.LocalDate.of(1990, 1, 1));

        when(userSigningService.signUpUser(any(SignUpRequestDTO.class))).thenReturn(signUpRequestDTO);

        mockMvc.perform(post("/auth/signup")
                        .contentType("application/json")
                        .content("{ \"firstName\": \"John\", \"lastName\": \"Doe\", \"emailId\": \"john.doe@example.com\", \"password\": \"Password123!\", \"dateOfBirth\": \"1990-01-01\" }"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.responseMessage").value("Signup successful for: john.doe@example.com"));
    }

    @Test
    void testSignUpUser_Failure() throws Exception {
        SignUpRequestDTO signUpRequestDTO = new SignUpRequestDTO();
        signUpRequestDTO.setFirstName("John");
        signUpRequestDTO.setLastName("Doe");
        signUpRequestDTO.setEmailId("john.doe@example.com");
        signUpRequestDTO.setPassword(Base64.getEncoder().encodeToString("Password123!".getBytes()));
        signUpRequestDTO.setDateOfBirth(java.time.LocalDate.of(1990, 1, 1));

        when(userSigningService.signUpUser(any(SignUpRequestDTO.class))).thenReturn(null);

        mockMvc.perform(post("/auth/signup")
                        .contentType("application/json")
                        .content("{ \"firstName\": \"John\", \"lastName\": \"Doe\", \"emailId\": \"john.doe@example.com\", \"password\": \"Password123!\", \"dateOfBirth\": \"1990-01-01\" }"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.responseMessage").value("Unsuccessful signup attempt"));
    }

    @Test
    void testAuthenticateAndGetToken_Success() throws Exception {

        UserEntity userEntity = new UserEntity();
        userEntity.setEmailId("john.doe@example.com");

        Authentication authentication = mock(Authentication.class);
        when(authentication.isAuthenticated()).thenReturn(true);  // Mock successful authentication
        when(authentication.getPrincipal()).thenReturn(userEntity);  // Return the mock user as principal
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);

        when(userSigningService.getUser("john.doe@example.com")).thenReturn(userEntity);

        when(jwtService.GenerateToken(any(), anyList())).thenReturn("mocked-jwt-token");

        mockMvc.perform(post("/auth/login")
                        .contentType("application/json")
                        .content("{ \"username\": \"john.doe@example.com\", \"password\": \""+ Base64.getEncoder().encodeToString("Password123!".getBytes()) +"\" }"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").value("mocked-jwt-token"));
    }
}
