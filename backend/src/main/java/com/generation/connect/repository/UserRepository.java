package com.generation.connect.repository;

import com.generation.connect.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {

    UserEntity findUserByEmailId(String emailId);

    long countByIsGenerationConnectAdminTrue();

    long countByIsGenerationConnectAdminFalse();

    long countByLastSignedInAtAfter(LocalDateTime dateTime);

}
