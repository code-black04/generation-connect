package com.generation.connect.service;

import com.generation.connect.dto.FamilyTreeDTO;

import java.util.List;

public interface FamilyTreeService {

    FamilyTreeDTO createFamilyTree(FamilyTreeDTO familyTreeDTO);

    List<FamilyTreeDTO> getAllFamilyTreeByUserIdIncludingPublic(String userId);

    void deleteFamilyTree(String userId, Long familyTreeId);

    FamilyTreeDTO getFamilyTreeByUserIdAndFamilyTreeId(String userId, Long familyTreeId);
}
