package com.generation.connect.controller;

import com.generation.connect.auth.AuthUtils;
import com.generation.connect.dto.FamilyTreeDTO;
import com.generation.connect.exception.FamilyTreeNotFoundException;
import com.generation.connect.service.FamilyTreeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/family-tree")
public class FamilyTreeController {

    @Autowired
    private FamilyTreeService familyTreeService;

    @Autowired
    private AuthUtils authUtils;

    @RequestMapping(path = "/create",
            method = RequestMethod.POST,
            consumes = {"application/json"},
            produces = {"application/json"}
    )
    public ResponseEntity<FamilyTreeDTO> createFamilyTree(
            @RequestBody @Valid FamilyTreeDTO familyTreeDTO) {
        String userId = authUtils.getCurrentUserId();
        familyTreeDTO.setMemberUserId(userId);
        FamilyTreeDTO savedTree = familyTreeService.createFamilyTree(familyTreeDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTree);
    }

    @RequestMapping(path = "/getAllTrees",
            method = RequestMethod.GET,
            produces = {"application/json"}
    )
    public ResponseEntity<List<FamilyTreeDTO>> getAllFamilyTreeByUserIdIncludingPublic() {
        String userId = authUtils.getCurrentUserId();
        List<FamilyTreeDTO> familyTree = familyTreeService.getAllFamilyTreeByUserIdIncludingPublic(userId);
        if (familyTree == null) {
            throw new FamilyTreeNotFoundException("No Family tree found..");
        }
        return ResponseEntity.status(HttpStatus.OK).body(familyTree);
    }

    @RequestMapping(path = "/delete/{familyTreeId}",
            method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteFamilyTree(
            @PathVariable Long familyTreeId
    ) {
        String userId = authUtils.getCurrentUserId();
        familyTreeService.deleteFamilyTree(userId, familyTreeId);
        return ResponseEntity.status(HttpStatus.OK).body("Family tree deleted successfully.");
    }

    @RequestMapping(path = "getTree/{familyTreeId}",
            method = RequestMethod.GET,
            produces = {"application/json"}
    )
    public ResponseEntity<FamilyTreeDTO> getFamilyTreeById(
            @PathVariable Long familyTreeId
    ) {
        String userId = authUtils.getCurrentUserId();
        FamilyTreeDTO familyTree = familyTreeService.getFamilyTreeByUserIdAndFamilyTreeId(userId, familyTreeId);
        if (familyTree == null) {
            throw new FamilyTreeNotFoundException("No Family tree found..");
        }
        return ResponseEntity.status(HttpStatus.OK).body(familyTree);
    }
}
