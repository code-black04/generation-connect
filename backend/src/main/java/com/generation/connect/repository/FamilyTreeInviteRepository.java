package com.generation.connect.repository;

import com.generation.connect.entity.FamilyTreeInviteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FamilyTreeInviteRepository extends JpaRepository<FamilyTreeInviteEntity, Long> {
    Optional<FamilyTreeInviteEntity> findByInviteToken(String token);

    Optional<FamilyTreeInviteEntity> findByFamilyTreeIdAndInvitedEmail(Long familyTreeId, String invitedEmail);

    long countByAcceptedFalse();

}
