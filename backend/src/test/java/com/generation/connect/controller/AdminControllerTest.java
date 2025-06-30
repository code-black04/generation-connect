package com.generation.connect.controller;

import com.generation.connect.dto.FamilyTreeDTO;
import com.generation.connect.dto.auth.FamilyTreeAccessLevelEnum;
import com.generation.connect.service.AdminService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static com.generation.connect.dto.auth.FamilyTreeAccessLevelEnum.PRIVATE;
import static com.generation.connect.dto.auth.FamilyTreeAccessLevelEnum.PUBLIC;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class AdminControllerTest {

    private MockMvc mockMvc;

    @Mock
    private AdminService adminService;

    @InjectMocks
    private AdminController adminController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        mockMvc = MockMvcBuilders.standaloneSetup(adminController).build();
    }

    @Test
    void testGetAdminMetrics() throws Exception {
        Map<String, Object> mockMetrics = new HashMap<>();
        mockMetrics.put("totalFamilyTrees", 5);
        mockMetrics.put("totalPosts", 100);

        when(adminService.getAdminMetrics()).thenReturn(mockMetrics);

        mockMvc.perform(get("/admin/metrics"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalFamilyTrees").value(5))
                .andExpect(jsonPath("$.totalPosts").value(100));
    }

    @Test
    void testGetAllFamilyTreeList() throws Exception {
        List<FamilyTreeDTO> familyTreeList = Arrays.asList(
                new FamilyTreeDTO(1L, "Family Tree 1", "johnDoe@example.com", "Description", PUBLIC),
                new FamilyTreeDTO(2L, "Family Tree 2", "johnDoe@example.com", "Description", PRIVATE)
        );

        when(adminService.getAllFamilyTrees()).thenReturn(familyTreeList);

        mockMvc.perform(get("/admin/family-tree-list/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].familyTreeId").value(1))
                .andExpect(jsonPath("$[1].familyTreeName").value("Family Tree 2"))
                .andExpect(jsonPath("$[0].memberUserId").value("johnDoe@example.com"))  // Check memberUserId
                .andExpect(jsonPath("$[1].familyTreeAccessLevel").value(PRIVATE.toValue()));  // Check enum as String value
    }

    @Test
    void testGetAdminMetrics_NoContent() throws Exception {
        Map<String, Object> mockMetrics = new HashMap<>();
        mockMetrics.put("totalFamilyTrees", 0);
        mockMetrics.put("totalPosts", 0);

        when(adminService.getAdminMetrics()).thenReturn(mockMetrics);

        mockMvc.perform(get("/admin/metrics"))
                .andExpect(status().isOk()) // Expecting 200 OK, since the body will not be empty in this case
                .andExpect(jsonPath("$.totalFamilyTrees").value(0)) // Ensure the empty data is returned as JSON
                .andExpect(jsonPath("$.totalPosts").value(0)); // Ensure the empty data is returned as JSON
    }

}
