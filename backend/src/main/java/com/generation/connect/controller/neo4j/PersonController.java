package com.generation.connect.controller.neo4j;

import com.generation.connect.dto.neo4j.PersonResponseDTO;
import com.generation.connect.dto.neo4j.v2.PersonUpdateRequest;
import com.generation.connect.entity.neo4j.Person;
import com.generation.connect.exception.FamilyTreeNotFoundException;
import com.generation.connect.service.FamilyTreeService;
import com.generation.connect.service.neo4j.PersonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/person")
public class PersonController {

    private final PersonService personService;

    private final FamilyTreeService familyTreeService;

    public PersonController(PersonService personService, FamilyTreeService familyTreeService) {
        this.personService = personService;
        this.familyTreeService = familyTreeService;
    }

    @DeleteMapping("/delete/{userId}/{familyTreeId}/{personId}")
    public ResponseEntity<String> deletePersonWithRelationship(
            @PathVariable Long familyTreeId,
            @PathVariable String userId,
            @PathVariable String personId
    ) {
        if (familyTreeService.getAllFamilyTreeByUserIdIncludingPublic(userId) == null) {
            throw new FamilyTreeNotFoundException("No family tree found connected to userId " + userId + " and " + " in public tree list");
        }

        personService.deletePersonWithRelationship(personId, userId);
        return ResponseEntity.ok("Person with ID " + personId + " deleted successfully.");
    }


    @GetMapping("/get/{personId}")
    public Optional<PersonResponseDTO> findByPersonId(@PathVariable String personId) {
        return personService.findByPersonId(personId);
    }

    @GetMapping("get-family/{familyTreeId}")
    public List<Optional<PersonResponseDTO>> findAllPersonsByFamilyTreeId(@PathVariable Long familyTreeId) {
        return personService.findAllPersonsByFamilyTreeId(familyTreeId);
    }

    @GetMapping("/{familyTreeId}/hierarchy")
    public ResponseEntity<PersonResponseDTO> getFamilyTreeHierarchy(@PathVariable Long familyTreeId) {
        Optional<PersonResponseDTO> hierarchy = personService.getFamilyTreeHierarchy(familyTreeId);

        return hierarchy.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{familyTreeId}/members-with-relations")
    public ResponseEntity<List<PersonResponseDTO>> getAllPersonsWithRelations(@PathVariable Long familyTreeId) {
        List<PersonResponseDTO> personsWithRelations = personService.findAllPersonsWithRelationsByFamilyTreeId(familyTreeId);

        if (personsWithRelations.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(personsWithRelations);
    }


    @GetMapping("/{id}/parents")
    public ResponseEntity<List<Optional<PersonResponseDTO>>> getParents(@PathVariable String id) {
        List<Optional<PersonResponseDTO>> parents = personService.getParents(id);
        return ResponseEntity.ok(parents);
    }

    @GetMapping("/{id}/children")
    public ResponseEntity<List<Optional<PersonResponseDTO>>> getChildren(@PathVariable String id) {
        List<Optional<PersonResponseDTO>> children = personService.getChildren(id);
        return ResponseEntity.ok(children);
    }

    @GetMapping("/{id}/spouse")
    public ResponseEntity<List<Optional<PersonResponseDTO>>>  getSpouse(@PathVariable String id) {
        List<Optional<PersonResponseDTO>> spouse = personService.getSpouse(id);
        return ResponseEntity.ok(spouse);
    }

    @GetMapping("/{id}/siblings")
    public ResponseEntity<List<Optional<PersonResponseDTO>>> getSiblings(@PathVariable Long id) {
        List<Optional<PersonResponseDTO>> siblings = personService.getSiblings(id);
        return ResponseEntity.ok(siblings);
    }

    @GetMapping("/{id}/cousins")
    public ResponseEntity<List<Optional<PersonResponseDTO>>> getCousins(@PathVariable Long id) {
        List<Optional<PersonResponseDTO>> cousins = personService.getCousins(id);
        return ResponseEntity.ok(cousins);
    }

    @PostMapping("/update2/{userId}/{familyTreeId}/person")
    public ResponseEntity<Person> updatePerson(
            @RequestBody PersonUpdateRequest personUpdateRequest,
            @PathVariable Long familyTreeId,
            @PathVariable String userId
    ) {
        if (familyTreeService.getAllFamilyTreeByUserIdIncludingPublic(userId) == null) {
            throw new FamilyTreeNotFoundException("No family tree found connected to userId " + userId + " and " + familyTreeId + " familyTreeId.");
        }
        personUpdateRequest.setFamilyTreeId(familyTreeId);
        Person updatedPerson = personService.updatePerson(personUpdateRequest, userId);
        return ResponseEntity.ok(updatedPerson);
    }
}
