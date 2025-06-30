package com.generation.connect.controller;

import com.generation.connect.auth.AuthUtils;
import com.generation.connect.dto.ManageUserDTO;
import com.generation.connect.dto.SendInviteRequestDTO;
import com.generation.connect.exception.BadRequestException;
import com.generation.connect.exception.InvalidRoleAssignmentException;
import com.generation.connect.exception.UnauthorizedActionException;
import com.generation.connect.exception.UserNotFoundException;
import com.generation.connect.service.ManageUserAccessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/family-tree/manage-users")
public class ManageUserAccessController {

    @Autowired
    private ManageUserAccessService manageUserAccessService;

    @Autowired
    private AuthUtils authUtils;

    @PostMapping("/{familyTreeId}")
    public ResponseEntity<String> addUserToFamilyTree(@RequestBody ManageUserDTO manageUserDTO) {
        try {
            String userId = authUtils.getCurrentUserId();
            manageUserDTO.setMemberAddedBy(userId);
            manageUserAccessService.addUserToFamilyTree(manageUserDTO);
            return ResponseEntity.ok("User added successfully");
        } catch (BadRequestException | InvalidRoleAssignmentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    @GetMapping("/{familyTreeId}/users")
    public ResponseEntity<List<ManageUserDTO>> getFamilyTreeUsers(@PathVariable Long familyTreeId) {
        try {
            String userId = authUtils.getCurrentUserId();
            List<ManageUserDTO> users = manageUserAccessService.getFamilyTreeUsers(familyTreeId, userId);
            return ResponseEntity.ok(users);
        } catch (UnauthorizedActionException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{familyTreeId}")
    public ResponseEntity<String> deleteUserFromFamilyTree(@RequestBody ManageUserDTO manageUserDTO) {
        try {
            String userId = authUtils.getCurrentUserId();
            manageUserDTO.setMemberAddedBy(userId);
            manageUserAccessService.removeUserFromFamilyTree(manageUserDTO);
            return ResponseEntity.ok("User removed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/send")
    public ResponseEntity<String> generateAndSendInvite(@RequestBody SendInviteRequestDTO request) {
        String token = manageUserAccessService.generateAndSendInvite(request);
        return ResponseEntity.ok("Invite sent successfully..");
    }

    @PostMapping("/accept")
    public ResponseEntity<String> acceptInvite(@RequestBody String token) {
        token = token.replace("\"", "");
        manageUserAccessService.acceptInvite(token);
        return ResponseEntity.ok("Invite accepted successfully.");
    }

}
