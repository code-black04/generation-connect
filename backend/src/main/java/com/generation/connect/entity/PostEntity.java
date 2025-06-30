package com.generation.connect.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@Table(
        name = "posts",
        indexes = {
                @Index(name = "idx_person_id", columnList = "person_id"),
                @Index(name = "idx_family_tree_id", columnList = "family_tree_id")
        }
)
@Entity
public class PostEntity {

    @Id
    @GeneratedValue(generator = "postIdGenerator")
    @SequenceGenerator(name = "postIdGenerator", initialValue = 1, sequenceName = "postIdGenerator")
    private Long id;

    @Column(name = "person_id")
    private String personId;

    @Column(name = "family_tree_id")
    private Long familyTreeId;

    @Column(name = "post_content", length = 25000)
    private String postContent;

    @OneToMany(mappedBy = "postEntity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CommentEntity> comments;

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
}
