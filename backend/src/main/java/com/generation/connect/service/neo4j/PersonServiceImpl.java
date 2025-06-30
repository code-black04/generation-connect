package com.generation.connect.service.neo4j;

import com.generation.connect.dto.auth.UserAccessRoleEnum;
import com.generation.connect.dto.neo4j.GenderEnum;
import com.generation.connect.dto.neo4j.PersonDetailsDTO;
import com.generation.connect.dto.neo4j.PersonRelationshipDTO;
import com.generation.connect.dto.neo4j.PersonResponseDTO;
import com.generation.connect.dto.neo4j.v2.PersonUpdateRelationshipDTO;
import com.generation.connect.dto.neo4j.v2.PersonUpdateRequest;
import com.generation.connect.entity.ActionType;
import com.generation.connect.entity.UserAccessManagementEmbeddedId;
import com.generation.connect.entity.UserAccessManagementEntity;
import com.generation.connect.entity.neo4j.Person;
import com.generation.connect.exception.PersonNotFoundException;
import com.generation.connect.exception.UnauthorizedAccessException;
import com.generation.connect.repository.ManageUserAccessRepository;
import com.generation.connect.repository.neo4j.PersonRepository;
import com.generation.connect.service.FamilyTreeAuditEventService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.*;
import java.util.concurrent.atomic.AtomicReference;

@Slf4j
@Service
public class PersonServiceImpl implements PersonService {

    private final PersonRepository personRepository;

    private final ManageUserAccessRepository manageUserAccessRepository;

    private final FamilyTreeAuditEventService familyTreeAuditEventService;

    public PersonServiceImpl(PersonRepository personRepository,
                             ManageUserAccessRepository manageUserAccessRepository, FamilyTreeAuditEventService familyTreeAuditEventService) {
        this.personRepository = personRepository;
        this.manageUserAccessRepository = manageUserAccessRepository;
        this.familyTreeAuditEventService = familyTreeAuditEventService;
    }

    @Override
    @Transactional
    public void deletePersonWithRelationship(String personId, String userId) {

        Optional<Person> personOpt = personRepository.findPersonByPersonId(personId);

        if (personOpt.isEmpty()) {
            throw new PersonNotFoundException("Person with ID " + personId + " not found.");
        }

        Person person = personOpt.get();
        validateContributorOrOwnerAccess(person.getFamilyTreeId(), userId);

        log.info("Deleting person with ID {} by user {} with", personId, userId);
        // Delete all relationships before deleting the person
        personRepository.deleteRelationships(personId);
        personRepository.deleteById(personId);
        familyTreeAuditEventService.addEvent(person.getFamilyTreeId(), "Person", ActionType.DELETE,
                person.getPersonId(), person.getFirstName() + " " + person.getLastName());
    }

    @Override
    public Optional<PersonResponseDTO> findByPersonId(String personId) {
        Optional<Person> personOptional = personRepository.findPersonByPersonId(personId);
        if (personOptional.isPresent()) {
            Person person = personOptional.get();
            PersonResponseDTO personDTO = createResponseFromEntity(Optional.of(person)).get();
            addRelationshipsToPersonDTO(person, personDTO);
            return Optional.of(personDTO);
        }

        return Optional.empty();
    }

    private void addRelationshipsToPersonDTO(Person person, PersonResponseDTO personDTO) {
        PersonRelationshipDTO relationshipDTO = new PersonRelationshipDTO();

        String personId = person.getPersonId();

        // Set father (expecting at most one)
        List<Person> fathers = personRepository.findParentsByGender(personId, GenderEnum.MALE.toString());
        if (!fathers.isEmpty()) {
            relationshipDTO.setFather(fathers.get(0).getPersonId());
        }

        // Set mother (expecting at most one)
        List<Person> mothers = personRepository.findParentsByGender(personId, GenderEnum.FEMALE.toString());
        if (!mothers.isEmpty()) {
            relationshipDTO.setMother(mothers.get(0).getPersonId());
        }

        // Set children
        List<Person> children = personRepository.findChildren(personId);
        if (!children.isEmpty()) {
            List<String> childrenIds = children.stream()
                    .map(Person::getPersonId)
                    .toList();
            relationshipDTO.setChildren(childrenIds);
        }

        // Set spouse(s) — assuming one for now, but supports multiple
        List<Person> spouses = personRepository.findSpouses(personId);
        if (spouses != null) {
            List<String> spouseIds = spouses.stream()
                    .map(Person::getPersonId)
                    .toList();
            relationshipDTO.setSpouses(spouseIds);
        }

        personDTO.setPersonRelationshipDTO(relationshipDTO);


    }

    @Override
    @Transactional
    public List<Optional<PersonResponseDTO>> findAllPersonsByFamilyTreeId(Long familyTreeId) {
        Set<String> visited = new HashSet<>();
        List<Optional<PersonResponseDTO>> familyMembers = new ArrayList<>();

        // Find the root person of the family tree
        Person rootPerson = personRepository.findRootPerson(familyTreeId);
        if (rootPerson == null || !rootPerson.getFamilyTreeId().equals(familyTreeId)) {
            return familyMembers; // Return empty if no root found or familyTreeId mismatch
        }

        // Recursive DFS to fetch all family members
        fetchFamilyMembers(rootPerson, visited, familyMembers);

        return familyMembers;
    }

    private void fetchFamilyMembers(Person person, Set<String> visited, List<Optional<PersonResponseDTO>> familyMembers) {
        if (person == null || visited.contains(person.getPersonId())) {
            return;
        }

        visited.add(person.getPersonId());

        Optional<PersonResponseDTO> dtoOpt = createResponseFromEntity(Optional.of(person));
        if (dtoOpt.isEmpty()) return;

        PersonResponseDTO dto = dtoOpt.get();

        addRelationshipsToPersonDTO(person, dto);

        familyMembers.add(Optional.of(dto));

        // Recursively fetch all related persons
        personRepository.findParents(person.getPersonId()).forEach(parent -> fetchFamilyMembers(parent, visited, familyMembers));
        personRepository.findChildren(person.getPersonId()).forEach(child -> fetchFamilyMembers(child, visited, familyMembers));
        personRepository.findSpouses(person.getPersonId()).forEach(spouse -> fetchFamilyMembers(spouse, visited, familyMembers));

    }

    @Override
    @Transactional
    public Optional<PersonResponseDTO> getFamilyTreeHierarchy(Long familyTreeId) {
        Set<String> visited = new HashSet<>();

        Person rootPerson = personRepository.findRootPerson(familyTreeId);
        if (rootPerson == null || !rootPerson.getFamilyTreeId().equals(familyTreeId)) {
            return Optional.empty();
        }

        // Build the hierarchical structure with only IDs
        return Optional.of(buildHierarchyWithIds(rootPerson, visited));
    }

    PersonResponseDTO buildHierarchyWithIds(Person person, Set<String> visited) {
        if (person == null || visited.contains(person.getPersonId())) {
            return null;
        }

        visited.add(person.getPersonId());

        Optional<PersonResponseDTO> dtoOpt = createResponseFromEntity(Optional.of(person));
        if (dtoOpt.isEmpty()) return null;

        PersonResponseDTO dto = dtoOpt.get();

        // Initialize relationship DTO
        PersonRelationshipDTO relationshipDTO = new PersonRelationshipDTO();

        // Set father (by ID)
        List<Person> fathers = personRepository.findParentsByGender(person.getPersonId(), GenderEnum.MALE.toValue());
        if (!fathers.isEmpty()) {
            relationshipDTO.setFather(fathers.get(0).getPersonId());
        }

        // Set mother (by ID)
        List<Person> mothers = personRepository.findParentsByGender(person.getPersonId(), GenderEnum.FEMALE.toString());
        if (!mothers.isEmpty()) {
            relationshipDTO.setMother(mothers.get(0).getPersonId());
        }

        // Set children (IDs)
        List<Person> children = personRepository.findChildren(person.getPersonId());
        if (!children.isEmpty()) {
            List<String> childrenIds = children.stream()
                    .map(Person::getPersonId)
                    .toList();
            relationshipDTO.setChildren(childrenIds);
        }

        // Set spouse(s) — assuming one for now, but supports multiple
        List<Person> spouses = personRepository.findSpouses(person.getPersonId());
        if (spouses != null) {
            List<String> spouseIds = children.stream()
                    .map(Person::getPersonId)
                    .toList();
            relationshipDTO.setSpouses(spouseIds);
        }

        dto.setPersonRelationshipDTO(relationshipDTO);
        return dto;
    }

    @Override
    @Transactional
    public List<PersonResponseDTO> findAllPersonsWithRelationsByFamilyTreeId(Long familyTreeId) {
        Set<String> visited = new HashSet<>();
        List<PersonResponseDTO> personsWithRelations = new ArrayList<>();

        Person rootPerson = personRepository.findRootPerson(familyTreeId);
        if (rootPerson == null || !rootPerson.getFamilyTreeId().equals(familyTreeId)) {
            return personsWithRelations;
        }

        collectPersonsWithRelationIds(rootPerson, visited, personsWithRelations);

        return personsWithRelations;
    }

    private void collectPersonsWithRelationIds(Person person, Set<String> visited, List<PersonResponseDTO> result) {
        if (person == null || visited.contains(person.getPersonId())) {
            return;
        }

        visited.add(person.getPersonId());

        Optional<PersonResponseDTO> dtoOpt = createResponseFromEntity(Optional.of(person));
        if (dtoOpt.isEmpty()) return;

        PersonResponseDTO dto = dtoOpt.get();
        PersonRelationshipDTO relationshipDTO = new PersonRelationshipDTO();

        String personId = person.getPersonId();

        // Set mother ID
        List<Person> mothers = personRepository.findParentsByGender(personId, GenderEnum.FEMALE.toString());
        if (!mothers.isEmpty()) {
            relationshipDTO.setMother(mothers.get(0).getPersonId());
        }

        // Set father ID
        List<Person> fathers = personRepository.findParentsByGender(personId, GenderEnum.MALE.toString());
        if (!fathers.isEmpty()) {
            relationshipDTO.setFather(fathers.get(0).getPersonId());
        }

        // Set children IDs
        List<Person> children = personRepository.findChildren(personId);
        if (!children.isEmpty()) {
            List<String> childIds = children.stream()
                    .map(Person::getPersonId)
                    .toList();
            relationshipDTO.setChildren(childIds);
        }

        // Set spouse(s) — assuming one for now, but supports multiple
        List<Person> spouses = personRepository.findSpouses(personId);
        if (!spouses.isEmpty()) {
            List<String> spouseIds = children.stream()
                    .map(Person::getPersonId)
                    .toList();
            relationshipDTO.setSpouses(spouseIds);
        }

        dto.setPersonRelationshipDTO(relationshipDTO);
        result.add(dto);

        personRepository.findParentsByGender(personId, GenderEnum.FEMALE.toString()).forEach(p -> collectPersonsWithRelationIds(p, visited, result));
        personRepository.findParentsByGender(personId, GenderEnum.MALE.toString()).forEach(p -> collectPersonsWithRelationIds(p, visited, result));

        children.forEach(c -> collectPersonsWithRelationIds(c, visited, result));
        spouses.forEach(s -> collectPersonsWithRelationIds(s, visited, result));

    }

    @Override
    @Transactional
    public List<Optional<PersonResponseDTO>> getParents(String id) {
        List<Person> parents = personRepository.findParents(id);
        return mapPersonsToResponseDTO(parents);
    }

    @Override
    @Transactional
    public List<Optional<PersonResponseDTO>> getChildren(String id) {
        List<Person> children = personRepository.findChildren(id);
        return mapPersonsToResponseDTO(children);
    }

    @Override
    @Transactional
    public List<Optional<PersonResponseDTO>> getSpouse(String id) {
        List<Person> spouses = personRepository.findSpouses(id);
        return mapPersonsToResponseDTO(spouses);
    }

    @Override
    @Transactional
    public List<Optional<PersonResponseDTO>> getSiblings(Long id) {
        List<Person> siblings = personRepository.findSiblings(id);
        return mapPersonsToResponseDTO(siblings);
    }

    @Override
    @Transactional
    public List<Optional<PersonResponseDTO>> getCousins(Long id) {
        List<Person> cousins = personRepository.findCousins(id);
        return mapPersonsToResponseDTO(cousins);
    }

    @Override
    public Person updatePerson(PersonUpdateRequest personUpdateRequest, String userId) {

        validateContributorOrOwnerAccess(personUpdateRequest.getFamilyTreeId(), userId);

        Optional<Person> personForUpdate = personRepository.findPersonByPersonId(personUpdateRequest.getPersonId());
        Person person = personForUpdate.orElseGet(Person::new);
        person.setPersonId(personUpdateRequest.getPersonId());
        person.setFamilyTreeId(personUpdateRequest.getFamilyTreeId());
        person.setFirstName(personUpdateRequest.getDetail().getFirstName());
        person.setLastName(personUpdateRequest.getDetail().getLastName());
        person.setBirthdate(personUpdateRequest.getDetail().getBirthdate());
        person.setDemiseDate(personUpdateRequest.getDetail().getDemiseDate());
        person.setGender(personUpdateRequest.getDetail().getGender());
        person.setAvatar(personUpdateRequest.getDetail().getAvatar());
        person.setLabel(personUpdateRequest.getDetail().getLabel());
        person.setDesc(personUpdateRequest.getDetail().getDesc());
        person.setCountryOfCitizenship(personUpdateRequest.getDetail().getCountryOfCitizenship());
        person.setAwardReceived(personUpdateRequest.getDetail().getAwardReceived());
        person.setPlaceOfBirth(personUpdateRequest.getDetail().getPlaceOfBirth());
        person.setEducatedAt(personUpdateRequest.getDetail().getEducatedAt());
        person.setOccupation(personUpdateRequest.getDetail().getOccupation());
        person.setPositionHeld(personUpdateRequest.getDetail().getPositionHeld());
        person.setEmployer(personUpdateRequest.getDetail().getEmployer());
        person.setResidence(personUpdateRequest.getDetail().getResidence());
        person.setLanguagesSpokenWritten(personUpdateRequest.getDetail().getLanguagesSpokenWritten());
        person.setSignificantEvent(personUpdateRequest.getDetail().getSignificantEvent());
        person.setOwnerOf(personUpdateRequest.getDetail().getOwnerOf());
        Person saved = getSaved(person);

        PersonUpdateRelationshipDTO updateRelationship = personUpdateRequest.getPersonRelationshipDTO();
        if (updateRelationship != null) {
            if (updateRelationship.getFather() != null) {
                Optional<Person> relatedPersonOpt = personRepository.findPersonByPersonId(updateRelationship.getFather());
                if (relatedPersonOpt.isEmpty()) {
                    log.info("The related person with ID {} is not part of the family tree.", updateRelationship.getFather());
                } else {
                    personRepository.createParentChildRelationship(updateRelationship.getFather(), saved.getPersonId());
                }
            }
            if (updateRelationship.getMother() != null) {
                Optional<Person> relatedPersonOpt = personRepository.findPersonByPersonId(updateRelationship.getMother());
                if (relatedPersonOpt.isEmpty()) {
                    log.info("The related person with ID {} is not part of the family tree.", updateRelationship.getMother());
                } else {
                    personRepository.createParentChildRelationship(updateRelationship.getMother(), saved.getPersonId());
                }
            }
            if (!CollectionUtils.isEmpty(updateRelationship.getSpouses())) {
                for (String spouseId : updateRelationship.getSpouses()) {
                    Optional<Person> relatedPersonOpt = personRepository.findPersonByPersonId(spouseId);
                    if (relatedPersonOpt.isEmpty()) {
                        log.info("The related person with ID {} is not part of the family tree.", spouseId);
                    } else {
                        personRepository.createMarriageRelationship(saved.getPersonId(), spouseId);
                    }
                }
            }
            if (!CollectionUtils.isEmpty(updateRelationship.getChildren())) {
                for (String childId : updateRelationship.getChildren()) {
                    Optional<Person> relatedPersonOpt = personRepository.findPersonByPersonId(childId);
                    if (relatedPersonOpt.isEmpty()) {
                        log.info("The related person with ID {} is not part of the family tree.", childId);
                    } else {
                        personRepository.createParentChildRelationship(saved.getPersonId(), childId);
                    }
                }
            }
        }

        log.info("Updating person with ID {} by user {} with", person.getPersonId(), userId);
        familyTreeAuditEventService.addEvent(person.getFamilyTreeId(), "Person", ActionType.UPDATE,
                person.getPersonId(), person.getFirstName() + " " + person.getLastName());
        return person;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    private Person getSaved(Person person) {
        AtomicReference<Person> saved = new AtomicReference<>(personRepository.save(person));
        return saved.get();
    }

    private List<Optional<PersonResponseDTO>> mapPersonsToResponseDTO(List<Person> persons) {
        List<Optional<PersonResponseDTO>> responseDTOs = new ArrayList<>();
        for (Person person : persons) {
            responseDTOs.add(createResponseFromEntity(Optional.of(person)));
        }
        return responseDTOs;
    }

    public Optional<PersonResponseDTO> createResponseFromEntity(Optional<Person> person) {
        if (person.isEmpty()) {
            return Optional.empty();
        }

        PersonResponseDTO dto = new PersonResponseDTO();


        PersonDetailsDTO detailsDTO = new PersonDetailsDTO();
        dto.setPersonDetailsDTO(detailsDTO);

        dto.setPersonId(person.get().getPersonId());
        dto.setFamilyTreeId(person.get().getFamilyTreeId());

        detailsDTO.setFirstName(person.get().getFirstName());
        detailsDTO.setLastName(person.get().getLastName());
        detailsDTO.setBirthdate(person.get().getBirthdate());
        detailsDTO.setDemiseDate(person.get().getDemiseDate());
        detailsDTO.setGender(person.get().getGender());
        detailsDTO.setUserId(person.get().getUserId());
        detailsDTO.setCreatedBy(person.get().getCreatedBy());
        detailsDTO.setLastModifiedBy(person.get().getLastModifiedBy());
        detailsDTO.setAvatar(person.get().getAvatar());
        detailsDTO.setDesc(person.get().getDesc());
        detailsDTO.setLabel(person.get().getLabel());
        detailsDTO.setCountryOfCitizenship(person.get().getCountryOfCitizenship());
        detailsDTO.setAwardReceived(person.get().getAwardReceived());
        detailsDTO.setPlaceOfBirth(person.get().getPlaceOfBirth());
        detailsDTO.setEducatedAt(person.get().getEducatedAt());
        detailsDTO.setOccupation(person.get().getOccupation());
        detailsDTO.setPositionHeld(person.get().getPositionHeld());
        detailsDTO.setEmployer(person.get().getEmployer());
        detailsDTO.setResidence(person.get().getResidence());
        detailsDTO.setLanguagesSpokenWritten(person.get().getLanguagesSpokenWritten());
        detailsDTO.setSignificantEvent(person.get().getSignificantEvent());
        detailsDTO.setOwnerOf(person.get().getOwnerOf());
        dto.setFirstNode(person.get().getFirstNode());

        return Optional.of(dto);
    }

    void validateContributorOrOwnerAccess(Long familyTreeId, String userId) {
        UserAccessManagementEmbeddedId accessId = new UserAccessManagementEmbeddedId();
        accessId.setFamilyTreeId(familyTreeId);
        accessId.setMemberUserId(userId);

        UserAccessManagementEntity access = manageUserAccessRepository.findById(accessId)
                .orElseThrow(() -> new UnauthorizedAccessException("User does not have access to this family tree."));

        UserAccessRoleEnum role = access.getUserAccessRole();
        if (role != UserAccessRoleEnum.OWNER && role != UserAccessRoleEnum.CONTRIBUTOR) {
            throw new UnauthorizedAccessException("Only OWNER or CONTRIBUTOR can perform this action.");
        }
    }


}
