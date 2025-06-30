package com.generation.connect.service;

import com.generation.connect.dto.FamilyTreeDTO;

import java.util.List;
import java.util.Map;

public interface AdminService {
    Map<String, Object> getAdminMetrics();

    List<FamilyTreeDTO> getAllFamilyTrees();
}
