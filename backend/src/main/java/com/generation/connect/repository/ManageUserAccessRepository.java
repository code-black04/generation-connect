package com.generation.connect.repository;

import com.generation.connect.dto.auth.UserAccessRoleEnum;
import com.generation.connect.entity.UserAccessManagementEmbeddedId;
import com.generation.connect.entity.UserAccessManagementEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManageUserAccessRepository extends JpaRepository<UserAccessManagementEntity, UserAccessManagementEmbeddedId> {

    // Find all user access records for a given family tree ID
    List<UserAccessManagementEntity> findByIdFamilyTreeId(Long familyTreeId);

    // Find all user access records for a given member user ID
    List<UserAccessManagementEntity> findByIdMemberUserId(String memberUserId);

    // Find a specific record by family tree ID and member user ID
    UserAccessManagementEntity findByIdFamilyTreeIdAndIdMemberUserId(Long familyTreeId, String memberUserId);

    List<UserAccessManagementEntity> findByFamilyTreeFamilyTreeId(Long familyTreeId);

    List<UserAccessManagementEntity> findAllById_MemberUserId(String memberUserId);

    void deleteAllById_FamilyTreeId(Long familyTreeId);

    List<UserAccessManagementEntity> findByUserAccessRole(UserAccessRoleEnum userAccessRole);

}
