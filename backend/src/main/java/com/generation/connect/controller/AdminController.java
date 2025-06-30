package com.generation.connect.controller;

import com.generation.connect.dto.FamilyTreeDTO;
import com.generation.connect.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/metrics")
    public ResponseEntity<Map<String, Object>> getAdminMetrics() {
        Map<String, Object> metrics = adminService.getAdminMetrics();

        if (metrics == null || metrics.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(metrics);
    }

    @GetMapping("/family-tree-list/all")
    public List<FamilyTreeDTO> getAllFamilyTreeList() {
        return adminService.getAllFamilyTrees();
    }
}
