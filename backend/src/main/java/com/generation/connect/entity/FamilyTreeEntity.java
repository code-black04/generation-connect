package com.generation.connect.entity;

import com.generation.connect.dto.auth.FamilyTreeAccessLevelEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "family_trees")
public class FamilyTreeEntity {

    @Column(name = "familyTreeId")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long familyTreeId;

    @NotNull
    @NotEmpty
    @NotBlank
    @Column(name = "familyTreeName")
    private String familyTreeName;

    @Column(name = "familyTreeDescription", length = 5000)
    private String familyTreeDescription;

    @NotNull
    @Column(name = "createdBy")
    @CreatedBy
    private String createdBy;

    @NotNull
    @CreatedDate
    @Column(name = "createdDate")
    private LocalDateTime createdDate;

    @Column(name = "lastModifiedBy")
    @LastModifiedBy
    private String lastModifiedBy;

    @LastModifiedDate
    @Column(name = "lastModifiedDate")
    private LocalDateTime lastModifiedDate;

    @Column(name = "numberOfMembers")
    private Long numberOfMembers;

    @Column(name = "familyTreeAccessLevel")
    private FamilyTreeAccessLevelEnum familyTreeAccessLevel;

    public FamilyTreeEntity() {
    }

    public FamilyTreeEntity(Long familyTreeId, String familyTreeName, String familyTreeDescription, String createdBy, LocalDateTime createdDate, String lastModifiedBy, LocalDateTime lastModifiedDate, Long numberOfMembers, FamilyTreeAccessLevelEnum familyTreeAccessLevel) {
        this.familyTreeId = familyTreeId;
        this.familyTreeName = familyTreeName;
        this.familyTreeDescription = familyTreeDescription;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.lastModifiedBy = lastModifiedBy;
        this.lastModifiedDate = lastModifiedDate;
        this.numberOfMembers = numberOfMembers;
        this.familyTreeAccessLevel = familyTreeAccessLevel;
    }

    public FamilyTreeEntity(@NotNull(message = "Family tree ID is required") Long familyTreeId) {
    }

    @Override
    public String toString() {
        return "FamilyTreeEntity{" +
                "familyTreeId=" + familyTreeId +
                ", familyTreeName='" + familyTreeName + '\'' +
                ", familyTreeDescription='" + familyTreeDescription + '\'' +
                ", createdBy='" + createdBy + '\'' +
                ", createdDate=" + createdDate +
                ", lastModifiedBy='" + lastModifiedBy + '\'' +
                ", lastModifiedDate=" + lastModifiedDate +
                ", numberOfMembers=" + numberOfMembers +
                ", familyTreeAccessLevel=" + familyTreeAccessLevel +
                '}';
    }
}
