package com.generation.connect.service.implementation;

import com.generation.connect.auth.GCAuthUserDetails;
import com.generation.connect.dto.ManageUserDTO;
import com.generation.connect.dto.SendInviteRequestDTO;
import com.generation.connect.dto.auth.UserAccessRoleEnum;
import com.generation.connect.entity.*;
import com.generation.connect.exception.*;
import com.generation.connect.repository.FamilyTreeInviteRepository;
import com.generation.connect.repository.FamilyTreeRepository;
import com.generation.connect.repository.ManageUserAccessRepository;
import com.generation.connect.repository.UserRepository;
import com.generation.connect.service.FamilyTreeAuditEventService;
import com.generation.connect.service.ManageUserAccessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.generation.connect.service.FamilyTreeAuditEventService.*;

@Service
public class ManageUserAccessServiceImpl implements ManageUserAccessService {

    @Autowired
    private ManageUserAccessRepository manageUserAccessRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FamilyTreeRepository familyTreeRepository;

    @Autowired
    private FamilyTreeInviteRepository familyTreeInviteRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private FamilyTreeAuditEventService familyTreeAuditEventService;

    @Override
    @Transactional
    public UserAccessManagementEntity addUserToFamilyTree(ManageUserDTO manageUserDTO) {

        UserEntity addedByUser = userRepository.findUserByEmailId(manageUserDTO.getMemberAddedBy());

        if (addedByUser == null) {
            throw new UserNotFoundException("Unauthorized user actions can't be completed..");
        }

        FamilyTreeEntity familyTree = familyTreeRepository.findFamilyTreeByFamilyTreeId(manageUserDTO.getFamilyTreeId());
        if (familyTree == null) {
            throw new FamilyTreeNotFoundException("Family Tree not found for id: " + manageUserDTO.getFamilyTreeId());
        }
        boolean isOwner = familyTree.getCreatedBy().equalsIgnoreCase(manageUserDTO.getMemberAddedBy());
        if (!isOwner) {
            throw new SecurityException("Only the owner can assign access to other users.");
        }

        UserEntity user = userRepository.findUserByEmailId(manageUserDTO.getAddedMemberUserId());

        if (user == null) {
            throw new UserNotFoundException("The user you are trying to add to the family tree does not exist: " + manageUserDTO.getAddedMemberUserId());
        }

        // Prevent updating the OWNER's role
        if (familyTree.getCreatedBy().equalsIgnoreCase(manageUserDTO.getAddedMemberUserId())) {
            if (!manageUserDTO.getRole().equals(UserAccessRoleEnum.OWNER)) {
                throw new InvalidRoleAssignmentException("The owner's role cannot be changed or reassigned.");
            }

            UserAccessManagementEmbeddedId ownerId = new UserAccessManagementEmbeddedId();
            ownerId.setFamilyTreeId(manageUserDTO.getFamilyTreeId());
            ownerId.setMemberUserId(manageUserDTO.getAddedMemberUserId());

            Optional<UserAccessManagementEntity> existingOwner = manageUserAccessRepository.findById(ownerId);
            if (existingOwner.isPresent()) {
                return existingOwner.get(); // Do nothing if already exists
            }
        }

        UserAccessManagementEmbeddedId id = new UserAccessManagementEmbeddedId();
        id.setFamilyTreeId(manageUserDTO.getFamilyTreeId());
        id.setMemberUserId(manageUserDTO.getAddedMemberUserId());

        Optional<UserAccessManagementEntity> existingUser = manageUserAccessRepository.findById(id);
        if (existingUser.isPresent() && existingUser.get().getUserAccessRole() == manageUserDTO.getRole()) {
            throw new BadRequestException("User is already the member of the tree");
        }

        UserAccessManagementEntity entity = new UserAccessManagementEntity();
        entity.setId(id);
        entity.setFamilyTree(familyTree);
        entity.setUser(user);
        entity.setUserAccessRole(manageUserDTO.getRole());
        entity.setUserAddedBy(manageUserDTO.getMemberAddedBy());

        UserAccessManagementEntity save = manageUserAccessRepository.save(entity);
        familyTreeAuditEventService.addEvent(manageUserDTO.getFamilyTreeId(),
                FAMILY_TREE_USER_ACCESS,
                ActionType.ADD,
                manageUserDTO.getAddedMemberUserId(),
                null);
        return save;
    }

    @Override
    public List<ManageUserDTO> getFamilyTreeUsers(Long familyTreeId, String userId) {

        validateUserRole(familyTreeId, userId, List.of(UserAccessRoleEnum.OWNER, UserAccessRoleEnum.CONTRIBUTOR));

        List<UserAccessManagementEntity> accessList = manageUserAccessRepository.findByFamilyTreeFamilyTreeId(familyTreeId);

        return accessList.stream().map(entity -> {
            ManageUserDTO dto = new ManageUserDTO();
            dto.setFamilyTreeId(entity.getFamilyTree().getFamilyTreeId());
            dto.setAddedMemberUserId(entity.getUser().getEmailId());
            dto.setRole(entity.getUserAccessRole());
            dto.setMemberAddedBy(entity.getUserAddedBy());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void removeUserFromFamilyTree(ManageUserDTO manageUserDTO) {
        FamilyTreeEntity familyTree = familyTreeRepository.findFamilyTreeByFamilyTreeId(manageUserDTO.getFamilyTreeId());
        if (familyTree == null) {
            throw new FamilyTreeNotFoundException("Family Tree not found for id: " + manageUserDTO.getFamilyTreeId());
        }

        // Ensure only the owner can remove users
        if (!familyTree.getCreatedBy().equalsIgnoreCase(manageUserDTO.getMemberAddedBy())) {
            throw new SecurityException("Only the owner can remove users from the family tree.");
        }

        // Prevent deletion of the owner
        if (familyTree.getCreatedBy().equalsIgnoreCase(manageUserDTO.getAddedMemberUserId())) {
            throw new InvalidRoleAssignmentException("Cannot remove the owner from the family tree.");
        }

        UserAccessManagementEmbeddedId id = new UserAccessManagementEmbeddedId();
        id.setFamilyTreeId(manageUserDTO.getFamilyTreeId());
        id.setMemberUserId(manageUserDTO.getAddedMemberUserId());

        Optional<UserAccessManagementEntity> entityOptional = manageUserAccessRepository.findById(id);
        if (entityOptional.isEmpty()) {
            throw new UserNotFoundException("The user is not part of the specified family tree.");
        }

        manageUserAccessRepository.deleteById(id);
        familyTreeAuditEventService.addEvent(manageUserDTO.getFamilyTreeId(),
                FAMILY_TREE_USER_ACCESS,
                ActionType.DELETE,
                manageUserDTO.getAddedMemberUserId(),
                null);
    }

    public void validateUserRole(Long familyTreeId, String userId, List<UserAccessRoleEnum> allowedRoles) {
        UserAccessManagementEntity access = manageUserAccessRepository
                .findByIdFamilyTreeIdAndIdMemberUserId(familyTreeId, userId);

        if (access == null || !allowedRoles.contains(access.getUserAccessRole())) {
            throw new UnauthorizedActionException("You do not have permission to perform this action.");
        }
    }

    public void validateOwnerOrThrow(Long familyTreeId, String inviterUserId) {
        UserAccessManagementEntity access = manageUserAccessRepository
                .findByIdFamilyTreeIdAndIdMemberUserId(familyTreeId, inviterUserId);

        if (access == null || !UserAccessRoleEnum.OWNER.equals(access.getUserAccessRole())) {
            throw new UnauthorizedActionException("You do not have permission to perform this action.");
        }
    }

    @Override
    @Transactional
    public String generateAndSendInvite(SendInviteRequestDTO inviteRequestDTO) {
        FamilyTreeEntity tree = familyTreeRepository.findById(inviteRequestDTO.getFamilyTreeId())
                .orElseThrow(() -> new FamilyTreeNotFoundException("Family Tree not found"));

        if (!tree.getCreatedBy().equalsIgnoreCase(inviteRequestDTO.getInviterUserId())) {
            throw new UnauthorizedActionException("Only the owner can send invites.");
        }

        Optional<FamilyTreeInviteEntity> existingInviteOpt = familyTreeInviteRepository
                .findByFamilyTreeIdAndInvitedEmail(inviteRequestDTO.getFamilyTreeId(), inviteRequestDTO.getInvitedEmail());

        if (existingInviteOpt.isPresent()) {
            FamilyTreeInviteEntity existingInvite = existingInviteOpt.get();

            if (existingInvite.isAccepted()) {
                throw new BadRequestException("This user has already accepted the invitation and is the member of this family tree..");
            }

            if (existingInvite.getExpiresAt().isAfter(LocalDateTime.now())) {
                sendInviteEmail(existingInvite.getInvitedEmail(), existingInvite.getInviteToken());
                return existingInvite.getInviteToken();
            } else {
                familyTreeInviteRepository.delete(existingInvite);
            }
        }

        String token = UUID.randomUUID().toString();

        FamilyTreeInviteEntity invite = new FamilyTreeInviteEntity();
        invite.setFamilyTreeId(inviteRequestDTO.getFamilyTreeId());
        invite.setInvitedEmail(inviteRequestDTO.getInvitedEmail());
        invite.setRole(inviteRequestDTO.getRole());
        invite.setInviteToken(token);
        invite.setAccepted(false);
        invite.setCreatedAt(LocalDateTime.now());
        invite.setExpiresAt(LocalDateTime.now().plusDays(7));

        familyTreeInviteRepository.save(invite);

        sendInviteEmail(invite.getInvitedEmail(), token);

        familyTreeAuditEventService.addEvent(inviteRequestDTO.getFamilyTreeId(),
                FAMILY_TREE_INVITE,
                ActionType.ADD,
                inviteRequestDTO.getInvitedEmail(),
                null);

        return token;
    }

    private void sendInviteEmail(String email, String token) {
        String inviteLink = "https://localhost/generation-connect-app/invite/accept?token=" + token;

        String messageText = """
                Hello,
                
                You've been invited to join a Family Tree on Generation Connect!
                
                📜 To accept this invitation, simply click the link below:
                %s
                
                This invitation link will expire in 7 days, so be sure to join before then.
                
                If you did not expect this invitation, you can safely ignore this message.
                
                Welcome to the family!
                
                — Generation Connect Team
                """.formatted(inviteLink);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("You're invited to join a Family Tree on Generation Connect");
        message.setText(messageText);

        mailSender.send(message);
    }

    @Override
    @Transactional
    public void acceptInvite(String token) {
        FamilyTreeInviteEntity invite = familyTreeInviteRepository.findByInviteToken(token)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid or expired invite."));

        if (invite.isAccepted() || invite.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invite has expired or already used.");
        }

        String currentUserEmail = (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof GCAuthUserDetails userDetails)
                ? userDetails.getUsername()
                : null;

        if (currentUserEmail != null) {
            if (!invite.getInvitedEmail().equalsIgnoreCase(currentUserEmail)) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "This invite was not meant for your account.");
            }
        }

        UserEntity user = userRepository.findUserByEmailId(invite.getInvitedEmail());
        if (user == null) {
            throw new UserNotFoundException("No user found with email: " + invite.getInvitedEmail());
        }

        // Check if the user already has access
        UserAccessManagementEntity existingAccess = manageUserAccessRepository.findByIdFamilyTreeIdAndIdMemberUserId(invite.getFamilyTreeId(), invite.getInvitedEmail());

        if (existingAccess == null) {
            UserAccessManagementEmbeddedId id = new UserAccessManagementEmbeddedId();
            id.setFamilyTreeId(invite.getFamilyTreeId());
            id.setMemberUserId(user.getEmailId());

            UserAccessManagementEntity entity = new UserAccessManagementEntity();
            entity.setId(id);
            entity.setUser(user);
            entity.setFamilyTree(familyTreeRepository.findFamilyTreeByFamilyTreeId(invite.getFamilyTreeId()));
            entity.setUserAccessRole(invite.getRole());
            entity.setUserAddedBy("invite");

            manageUserAccessRepository.save(entity);
        }

        invite.setAccepted(true);
        familyTreeInviteRepository.save(invite);
        familyTreeAuditEventService.addEvent(invite.getFamilyTreeId(),
                FAMILY_TREE_USER_ACCESS,
                ActionType.ADD,
                user.getEmailId(),
                null);
        familyTreeAuditEventService.addEvent(invite.getFamilyTreeId(),
                FAMILY_TREE_INVITE,
                ActionType.UPDATE,
                user.getEmailId(),
                null);
    }

}
