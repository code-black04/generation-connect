package com.generation.connect.service;

import com.generation.connect.dto.auth.SignInRequestDTO;
import com.generation.connect.dto.auth.SignUpRequestDTO;
import com.generation.connect.entity.UserEntity;
import com.generation.connect.exception.DuplicateAccountException;

public interface UserSigningService {

    SignUpRequestDTO signUpUser(SignUpRequestDTO signUpRequestDTO) throws DuplicateAccountException;

    void verifyUserRole(SignInRequestDTO signInRequestDTO);

    UserEntity getUser(String emailId);
}
