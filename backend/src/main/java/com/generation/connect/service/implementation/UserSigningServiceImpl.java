package com.generation.connect.service.implementation;

import com.generation.connect.dto.auth.SignInRequestDTO;
import com.generation.connect.dto.auth.SignUpRequestDTO;
import com.generation.connect.entity.UserEntity;
import com.generation.connect.exception.DuplicateAccountException;
import com.generation.connect.exception.UnauthorizedAccessException;
import com.generation.connect.exception.UserNotFoundException;
import com.generation.connect.mapper.UserDtoEntityMapper;
import com.generation.connect.repository.UserRepository;
import com.generation.connect.service.UserSigningService;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Base64;

import java.time.LocalDateTime;

@Service
public class UserSigningServiceImpl implements UserSigningService {

    private final Logger logger = LoggerFactory.getLogger(UserSigningServiceImpl.class);

    private final UserRepository userRepository;

    private final PasswordEncoder encoder;

    private final UserDtoEntityMapper userDtoEntityMapper;

    public UserSigningServiceImpl(UserRepository userRepository, PasswordEncoder encoder,
                                  UserDtoEntityMapper userDtoEntityMapper) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.userDtoEntityMapper = userDtoEntityMapper;
    }

    @PostConstruct
    public void createDefaultGenerationConnectAdmin() {
        String defaultPassword = "2025%generation-connect";
        String emailId = "admin@gc.ac.in";

        if (userRepository.findUserByEmailId(emailId) != null) {
            logger.info("Default admin already exists: {}", emailId);
            return;
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setEmailId(emailId);
        userEntity.setGenerationConnectAdmin(true);
        userEntity.setPassword(encoder.encode(defaultPassword));

        userRepository.save(userEntity);
        logger.info("Default admin created successfully with email: {}", emailId);

    }

    @Override
    public SignUpRequestDTO signUpUser(SignUpRequestDTO signUpRequestDTO) throws DuplicateAccountException {

        UserEntity userEntity = userRepository.findUserByEmailId(signUpRequestDTO.getEmailId());
        if (userEntity != null) {
            logger.error("Account with {} already exists. ", signUpRequestDTO.getEmailId());
            throw new DuplicateAccountException("Account with " + signUpRequestDTO.getEmailId() + " already exists. Try again!");
        }

        userEntity = userDtoEntityMapper.convertToUserEntity(signUpRequestDTO);
        userEntity.setGenerationConnectAdmin(false);
        userEntity.setPassword(encoder.encode(signUpRequestDTO.getPassword()));
        userRepository.save(userEntity);
        logger.info("User {} successfully signed up", signUpRequestDTO.getEmailId());
        return userDtoEntityMapper.convertToUserDto(userEntity);

    }

    @Override
    public void verifyUserRole(SignInRequestDTO signInRequestDTO) {
        UserEntity user = userRepository.findUserByEmailId(signInRequestDTO.getUsername());
        if (user == null) {
            throw new UserNotFoundException("User with email '" + signInRequestDTO.getUsername() + "' not found.");
        }

        if (signInRequestDTO.isAdmin()) {
            if (user != null && !Boolean.TRUE.equals(user.isGenerationConnectAdmin())) {
                throw new UnauthorizedAccessException("Access denied. Admin accounts credentials are required.");
            }
        } else {
            if (user != null && Boolean.TRUE.equals(user.isGenerationConnectAdmin())) {
                throw new UnauthorizedAccessException("Access denied. Admin accounts must log in through the admin portal.");
            }
        }

        user.setLastSignedInAt(LocalDateTime.now());
        userRepository.save(user);
    }

    @Override
    public UserEntity getUser(String emailId) {
        return userRepository.findUserByEmailId(emailId);
    }
}
