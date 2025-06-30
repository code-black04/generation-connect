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

@Setter
@Getter
@Table(name = "comments",
        indexes = {
                @Index(name = "idx_post_id", columnList = "post_id")
        })
@Entity
public class CommentEntity {
    @Id
    @GeneratedValue(generator = "commentIdGenerator")
    @SequenceGenerator(name = "commentIdGenerator", initialValue = 1, sequenceName = "commentIdGenerator")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    private PostEntity postEntity;

    @Column(name = "comment_content", length = 5000)
    private String commentContent;

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
