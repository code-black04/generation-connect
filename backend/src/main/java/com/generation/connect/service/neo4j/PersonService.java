package com.generation.connect.service.neo4j;

import com.generation.connect.dto.neo4j.PersonResponseDTO;
import com.generation.connect.dto.neo4j.v2.PersonUpdateRequest;
import com.generation.connect.entity.neo4j.Person;

import java.util.List;
import java.util.Optional;

public interface PersonService {

    void deletePersonWithRelationship(String personId, String userId);

    Optional<PersonResponseDTO> findByPersonId(String personId);

    List<Optional<PersonResponseDTO>> findAllPersonsByFamilyTreeId(Long familyTreeId);

    Optional<PersonResponseDTO> getFamilyTreeHierarchy(Long familyTreeId);

    List<PersonResponseDTO> findAllPersonsWithRelationsByFamilyTreeId(Long familyTreeId);

    List<Optional<PersonResponseDTO>> getParents(String id);

    List<Optional<PersonResponseDTO>> getChildren(String id);

    List<Optional<PersonResponseDTO>> getSpouse(String id);

    List<Optional<PersonResponseDTO>> getSiblings(Long id);

    List<Optional<PersonResponseDTO>> getCousins(Long id);

    Person updatePerson(PersonUpdateRequest personUpdateRequest, String userId);
}
