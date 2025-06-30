package com.generation.connect.mapper;

import com.generation.connect.dto.auth.SignUpRequestDTO;
import com.generation.connect.entity.UserEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserDtoEntityMapper {

    @Autowired
    public ModelMapper modelMapper;

    public SignUpRequestDTO convertToUserDto(UserEntity userEntity) {
        return modelMapper.map(userEntity, SignUpRequestDTO.class);
    }

    public UserEntity convertToUserEntity(SignUpRequestDTO signUpRequestDTO) {
        return modelMapper.map(signUpRequestDTO, UserEntity.class);
    }
}
