package com.generation.connect.entity;

import com.generation.connect.dto.auth.UserAccessRoleEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "family_tree_invite")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FamilyTreeInviteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long familyTreeId;

    private String invitedEmail;

    @Enumerated(EnumType.STRING)
    private UserAccessRoleEnum role;

    @Column(unique = true)
    private String inviteToken;

    private boolean accepted = false;

    private LocalDateTime createdAt;

    private LocalDateTime expiresAt;
}
