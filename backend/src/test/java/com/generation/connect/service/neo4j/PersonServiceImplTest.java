package com.generation.connect.service.neo4j;

import com.generation.connect.dto.auth.UserAccessRoleEnum;
import com.generation.connect.dto.neo4j.PersonResponseDTO;
import com.generation.connect.entity.UserAccessManagementEmbeddedId;
import com.generation.connect.entity.UserAccessManagementEntity;
import com.generation.connect.entity.neo4j.Person;
import com.generation.connect.exception.PersonNotFoundException;
import com.generation.connect.exception.UnauthorizedAccessException;
import com.generation.connect.repository.ManageUserAccessRepository;
import com.generation.connect.repository.neo4j.PersonRepository;
import com.generation.connect.service.FamilyTreeAuditEventService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.util.Optional;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class PersonServiceImplTest {

    @Mock
    private PersonRepository personRepository;

    @Mock
    private ManageUserAccessRepository manageUserAccessRepository;

    @Mock
    private FamilyTreeAuditEventService familyTreeAuditEventService;

    @InjectMocks
    private PersonServiceImpl personService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testDeletePersonWithRelationship_Success() {
        String personId = "1";
        String userId = "user@example.com";
        Long familyTreeId = 123L;

        Person person = new Person();
        person.setPersonId(personId);
        person.setFamilyTreeId(familyTreeId);

        when(personRepository.findPersonByPersonId(personId)).thenReturn(Optional.of(person));

        UserAccessManagementEntity userAccessEntity = new UserAccessManagementEntity();
        userAccessEntity.setUserAccessRole(UserAccessRoleEnum.OWNER);
        UserAccessManagementEmbeddedId accessId = new UserAccessManagementEmbeddedId();
        accessId.setFamilyTreeId(familyTreeId);
        accessId.setMemberUserId(userId);
        userAccessEntity.setId(accessId);

        when(manageUserAccessRepository.findById(accessId)).thenReturn(Optional.of(userAccessEntity));

        doNothing().when(personRepository).deleteRelationships(anyString());
        doNothing().when(personRepository).deleteById(anyString());

        personService.deletePersonWithRelationship(personId, userId);

        verify(personRepository, times(1)).deleteRelationships(personId);
        verify(personRepository, times(1)).deleteById(personId);
    }

    @Test
    void testFindByPersonId_Success() {
        String personId = "1";
        Person person = new Person();
        person.setPersonId(personId);

        when(personRepository.findPersonByPersonId(personId)).thenReturn(Optional.of(person));

        Optional<PersonResponseDTO> result = personService.findByPersonId(personId);

        assertTrue(result.isPresent());
        assertEquals(personId, result.get().getPersonId());
    }

    @Test
    void testDeletePersonWithRelationship_PersonNotFound() {
        String personId = "1";
        String userId = "user@example.com";

        when(personRepository.findPersonByPersonId(personId)).thenReturn(Optional.empty());

        assertThrows(PersonNotFoundException.class, () -> {
            personService.deletePersonWithRelationship(personId, userId);
        });
    }

    @Test
    void testFindByPersonId_PersonNotFound() {
        String personId = "1";

        when(personRepository.findPersonByPersonId(personId)).thenReturn(Optional.empty());

        Optional<PersonResponseDTO> result = personService.findByPersonId(personId);
        assertTrue(result.isEmpty());
    }

    @Test
    void testGetFamilyTreeHierarchy_NoRootPerson() {
        Long familyTreeId = 1L;

        when(personRepository.findRootPerson(familyTreeId)).thenReturn(null);

        Optional<PersonResponseDTO> result = personService.getFamilyTreeHierarchy(familyTreeId);
        assertTrue(result.isEmpty());
    }

    @Test
    void testValidateContributorOrOwnerAccess_Success() {
        Long familyTreeId = 1L;
        String userId = "user@example.com";
        UserAccessManagementEntity accessEntity = new UserAccessManagementEntity();
        accessEntity.setUserAccessRole(UserAccessRoleEnum.OWNER);
        UserAccessManagementEmbeddedId accessId = new UserAccessManagementEmbeddedId(familyTreeId, userId);
        when(manageUserAccessRepository.findById(accessId)).thenReturn(Optional.of(accessEntity));

        personService.validateContributorOrOwnerAccess(familyTreeId, userId);

    }

    @Test
    void testValidateContributorOrOwnerAccess_Unauthorized() {
        Long familyTreeId = 1L;
        String userId = "user@example.com";
        UserAccessManagementEntity accessEntity = new UserAccessManagementEntity();
        accessEntity.setUserAccessRole(UserAccessRoleEnum.VIEWER);
        UserAccessManagementEmbeddedId accessId = new UserAccessManagementEmbeddedId(familyTreeId, userId);
        when(manageUserAccessRepository.findById(accessId)).thenReturn(Optional.of(accessEntity));

        assertThrows(UnauthorizedAccessException.class, () -> {
            personService.validateContributorOrOwnerAccess(familyTreeId, userId);
        });
    }
}
