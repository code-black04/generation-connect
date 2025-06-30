package com.generation.connect.service;

import com.generation.connect.dto.ManageUserDTO;
import com.generation.connect.dto.SendInviteRequestDTO;
import com.generation.connect.entity.UserAccessManagementEntity;

import java.util.List;

public interface ManageUserAccessService {

    UserAccessManagementEntity addUserToFamilyTree(ManageUserDTO manageUserDTO);

    List<ManageUserDTO> getFamilyTreeUsers(Long familyTreeId, String userId);

    void removeUserFromFamilyTree(ManageUserDTO manageUserDTO);

    String generateAndSendInvite(SendInviteRequestDTO inviteRequestDTO);

    void acceptInvite(String token);

}
