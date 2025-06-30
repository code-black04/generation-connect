package com.generation.connect.service.implementation;

import com.generation.connect.dto.auth.SignInRequestDTO;
import com.generation.connect.dto.auth.SignUpRequestDTO;
import com.generation.connect.entity.UserEntity;
import com.generation.connect.exception.DuplicateAccountException;
import com.generation.connect.exception.UnauthorizedAccessException;
import com.generation.connect.exception.UserNotFoundException;
import com.generation.connect.mapper.UserDtoEntityMapper;
import com.generation.connect.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Base64;

class UserSigningServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder encoder;

    @Mock
    private UserDtoEntityMapper userDtoEntityMapper;


    @InjectMocks
    private UserSigningServiceImpl userSigningService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateDefaultGenerationConnectAdmin_AdminExists() {
        String email = "admin@gc.ac.in";

        when(userRepository.findUserByEmailId(email)).thenReturn(new UserEntity());

        userSigningService.createDefaultGenerationConnectAdmin();

        verify(userRepository, never()).save(any(UserEntity.class));
    }

    @Test
    void testCreateDefaultGenerationConnectAdmin_AdminDoesNotExist() {
        String email = "admin@gc.ac.in";

        when(userRepository.findUserByEmailId(email)).thenReturn(null);

        when(userRepository.save(any(UserEntity.class))).thenReturn(new UserEntity());

        userSigningService.createDefaultGenerationConnectAdmin();

        verify(userRepository, times(1)).save(any(UserEntity.class));
    }

    @Test
    void testSignUpUser_Success() throws DuplicateAccountException {
        String base64EncodedPassword = "QmFzZTY0UGFzc3dvcmQxMjM="; // Base64-encoded password
        SignUpRequestDTO signUpRequestDTO = new SignUpRequestDTO();
        signUpRequestDTO.setEmailId("newuser@example.com");
        signUpRequestDTO.setPassword(base64EncodedPassword);

        try (MockedStatic<Base64> mockedBase64 = mockStatic(Base64.class)) {
            byte[] decodedPassword = "Base64Password123".getBytes();

            java.util.Base64.Decoder mockDecoder = mock(java.util.Base64.Decoder.class);
            when(mockDecoder.decode(base64EncodedPassword)).thenReturn(decodedPassword);

            mockedBase64.when(Base64::getDecoder).thenReturn(mockDecoder);

            when(userRepository.findUserByEmailId(signUpRequestDTO.getEmailId())).thenReturn(null);

            when(encoder.encode(anyString())).thenReturn("encodedPassword");

            when(userDtoEntityMapper.convertToUserEntity(signUpRequestDTO)).thenReturn(new UserEntity());

            when(userDtoEntityMapper.convertToUserDto(any(UserEntity.class))).thenReturn(new SignUpRequestDTO());

            SignUpRequestDTO result = userSigningService.signUpUser(signUpRequestDTO);

            verify(userRepository, times(1)).save(any(UserEntity.class));

            assertNotNull(result);
        }
    }

    @Test
    void testSignUpUser_ExistingUser() {
        SignUpRequestDTO signUpRequestDTO = new SignUpRequestDTO();
        signUpRequestDTO.setEmailId("existinguser@example.com");

        UserEntity existingUser = new UserEntity();
        existingUser.setEmailId("existinguser@example.com");

        when(userRepository.findUserByEmailId(signUpRequestDTO.getEmailId())).thenReturn(existingUser);

        assertThrows(DuplicateAccountException.class, () -> {
            userSigningService.signUpUser(signUpRequestDTO);
        });

        verify(userRepository, never()).save(any(UserEntity.class));
    }

    @Test
    void testVerifyUserRole_AdminSuccess() throws UnauthorizedAccessException, UserNotFoundException {
        // Prepare test data
        SignInRequestDTO signInRequestDTO = new SignInRequestDTO();
        signInRequestDTO.setUsername("admin@example.com");
        signInRequestDTO.setPassword("password");
        signInRequestDTO.setAdmin(true);

        UserEntity user = new UserEntity();
        user.setEmailId("admin@example.com");
        user.setGenerationConnectAdmin(true);

        when(userRepository.findUserByEmailId(signInRequestDTO.getUsername())).thenReturn(user);

        when(userRepository.save(any(UserEntity.class))).thenReturn(user);

        userSigningService.verifyUserRole(signInRequestDTO);

        verify(userRepository, times(1)).save(any(UserEntity.class));
    }

    @Test
    void testVerifyUserRole_UnauthorizedAccessException() throws UnauthorizedAccessException, UserNotFoundException {
        SignInRequestDTO signInRequestDTO = new SignInRequestDTO();
        signInRequestDTO.setUsername("nonadmin@example.com");
        signInRequestDTO.setPassword("password");
        signInRequestDTO.setAdmin(true);

        UserEntity user = new UserEntity();
        user.setEmailId("nonadmin@example.com");
        user.setGenerationConnectAdmin(false);

        when(userRepository.findUserByEmailId(signInRequestDTO.getUsername())).thenReturn(user);

        assertThrows(UnauthorizedAccessException.class, () -> {
            userSigningService.verifyUserRole(signInRequestDTO);
        });
    }

    @Test
    void testGetUser() {
        String emailId = "user@example.com";
        UserEntity user = new UserEntity();
        user.setEmailId(emailId);

        when(userRepository.findUserByEmailId(emailId)).thenReturn(user);

        UserEntity result = userSigningService.getUser(emailId);

        assertNotNull(result);
        assertEquals(emailId, result.getEmailId());
    }
}
