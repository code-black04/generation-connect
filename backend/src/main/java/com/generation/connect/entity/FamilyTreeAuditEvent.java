package com.generation.connect.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "family_tree_audit_events")
public class FamilyTreeAuditEvent {
    @Id
    @GeneratedValue(generator = "family_tree_audit_events_seq")
    @SequenceGenerator(name = "family_tree_audit_events_gen", initialValue = 1, sequenceName = "family_tree_audit_events_seq")
    private Long id;
    @Column(name = "family_tree_id")
    private Long familyTreeId;
    @Column(name = "table_name")
    private String tableName;
    @Enumerated(EnumType.STRING)
    @Column(name = "action_type")
    private ActionType actionType;
    @Column(name = "record_id")
    private String recordId;
    @Column(name = "record_name")
    private String recordName;
    @Column(name = "created_by")
    @CreatedBy
    private String createdBy;
    @CreatedDate
    @Column(name = "created_date")
    private LocalDateTime createdDate;
}
