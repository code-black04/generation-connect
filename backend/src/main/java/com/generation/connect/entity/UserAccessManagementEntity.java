package com.generation.connect.entity;

import com.generation.connect.dto.auth.UserAccessRoleEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;

@Entity
@Table(name = "user_access_management")
@Getter
@Setter
public class UserAccessManagementEntity {

    @EmbeddedId
    private UserAccessManagementEmbeddedId id;

    @ManyToOne
    @JoinColumn(name = "familyTreeId", insertable = false, updatable = false)
    private FamilyTreeEntity familyTree;

    @ManyToOne
    @JoinColumn(name = "memberUserId", insertable = false, updatable = false)
    private UserEntity user;

    @NotNull
    @Column(name = "createdBy")
    @CreatedBy
    private String userAddedBy;

    @Column(name = "user_access_role", nullable = false)
    private UserAccessRoleEnum userAccessRole;
}
