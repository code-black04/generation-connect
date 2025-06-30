package com.generation.connect.repository;

import com.generation.connect.entity.FamilyTreeAuditEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FamilyTreeAuditEventRepository extends JpaRepository<FamilyTreeAuditEvent, Long> {
    List<FamilyTreeAuditEvent> findByFamilyTreeIdOrderByIdDesc(Long familyTreeId);
}
