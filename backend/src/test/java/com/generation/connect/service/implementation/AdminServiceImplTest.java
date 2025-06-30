package com.generation.connect.service.implementation;

import com.generation.connect.dto.FamilyTreeDTO;
import com.generation.connect.dto.auth.FamilyTreeAccessLevelEnum;
import com.generation.connect.dto.auth.UserAccessRoleEnum;
import com.generation.connect.entity.FamilyTreeEntity;
import com.generation.connect.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.data.domain.Sort;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;

class AdminServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private FamilyTreeRepository familyTreeRepository;

    @Mock
    private PostRepository postRepository;

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private FamilyTreeInviteRepository familyTreeInviteRepository;

    @Mock
    private ManageUserAccessRepository manageUserAccessRepository;

    @InjectMocks
    private AdminServiceImpl adminService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAdminMetrics() {
        when(familyTreeRepository.count()).thenReturn(5L);
        when(postRepository.count()).thenReturn(100L);
        when(commentRepository.count()).thenReturn(200L);
        when(userRepository.countByIsGenerationConnectAdminFalse()).thenReturn(50L);
        when(userRepository.countByIsGenerationConnectAdminTrue()).thenReturn(5L);
        when(familyTreeRepository.countByFamilyTreeAccessLevel(FamilyTreeAccessLevelEnum.PUBLIC)).thenReturn(3L);
        when(familyTreeRepository.countByFamilyTreeAccessLevel(FamilyTreeAccessLevelEnum.PRIVATE)).thenReturn(2L);
        when(familyTreeInviteRepository.countByAcceptedFalse()).thenReturn(10L);
        when(manageUserAccessRepository.findByUserAccessRole(UserAccessRoleEnum.OWNER)).thenReturn(Collections.emptyList());
        when(userRepository.countByLastSignedInAtAfter(any(LocalDateTime.class))).thenReturn(30L);
        when(familyTreeRepository.countByCreatedDateAfter(any(LocalDateTime.class))).thenReturn(3L);

        Map<String, Object> metrics = adminService.getAdminMetrics();

        assertEquals(5L, metrics.get("totalFamilyTrees"));
        assertEquals(100L, metrics.get("totalPosts"));
        assertEquals(200L, metrics.get("totalComments"));
        assertEquals(50L, metrics.get("totalNonAdminUsers"));
        assertEquals(5L, metrics.get("appAdmins"));
        assertEquals(3L, metrics.get("publicFamilyTrees"));
        assertEquals(2L, metrics.get("privateFamilyTrees"));
        assertEquals(10L, metrics.get("pendingInvites"));
        assertEquals(29L, metrics.get("activeUsersLast30Days"));
        assertEquals(3L, metrics.get("recentFamilyTreesLast30Days"));
        assertEquals(20.0, metrics.get("averagePostsPerTree"));
        assertEquals(40.0, metrics.get("averageCommentsPerTree"));
    }

    @Test
    void testGetAllFamilyTrees() {
        List<FamilyTreeEntity> mockFamilyTrees = new ArrayList<>();
        mockFamilyTrees.add(new FamilyTreeEntity(
                1L,
                "Family Tree 1",
                "Description",
                "johnDoe@example.com",
                LocalDateTime.now(),
                "jane.doe@example.com",
                LocalDateTime.now(),
                5L,
                FamilyTreeAccessLevelEnum.PUBLIC
        ));

        mockFamilyTrees.add(new FamilyTreeEntity(
                2L,
                "Family Tree 2",
                "Description",
                "johnDoe@example.com",
                LocalDateTime.now(),
                "jane.doe@example.com",
                LocalDateTime.now(),
                3L,
                FamilyTreeAccessLevelEnum.PRIVATE
        ));

        when(familyTreeRepository.findAll(Sort.by("familyTreeId"))).thenReturn(mockFamilyTrees);

        List<FamilyTreeDTO> result = adminService.getAllFamilyTrees();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Family Tree 1", result.get(0).getFamilyTreeName());
        assertEquals("Family Tree 2", result.get(1).getFamilyTreeName());
        assertEquals(FamilyTreeAccessLevelEnum.PUBLIC, result.get(0).getFamilyTreeAccessLevel());
        assertEquals(FamilyTreeAccessLevelEnum.PRIVATE, result.get(1).getFamilyTreeAccessLevel());
    }
}
