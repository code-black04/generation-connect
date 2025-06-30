package com.generation.connect.entity;

import com.fasterxml.jackson.databind.JsonNode;
import com.generation.connect.converter.JsonNodeConverter;
import com.generation.connect.dto.ResearchSourceNameEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@ToString
@Table(name = "research_record_links_entity", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"external_record_id", "familyTreeId"})
})
public class ResearchRecordLinkEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "external_record_id", nullable = false)
    private String externalRecordId;

    @Column(name = "research_source_name", nullable = false)
    private ResearchSourceNameEnum researchSourceNameEnum;

    @Column(name = "linked_at", nullable = false)
    private LocalDateTime linkedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "familyTreeId", nullable = false)
    private FamilyTreeEntity familyTree;

    @Lob
    @Convert(converter = JsonNodeConverter.class)
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "saved_researched_data", columnDefinition = "jsonb")
    private JsonNode savedResearchedData;

    public ResearchRecordLinkEntity(String externalRecordId, ResearchSourceNameEnum researchSourceNameEnum, LocalDateTime linkedAt, FamilyTreeEntity familyTree, JsonNode savedResearchedData) {
        this.externalRecordId = externalRecordId;
        this.researchSourceNameEnum = researchSourceNameEnum;
        this.linkedAt = linkedAt;
        this.familyTree = familyTree;
        this.savedResearchedData = savedResearchedData;
    }

}
