package com.generation.connect.repository.neo4j;

import com.generation.connect.entity.neo4j.Person;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonRepository extends Neo4jRepository<Person, String> {

    List<Person> findAllPersonsByFamilyTreeId(Long personId);

    Optional<Person> findPersonByPersonId(String personId);

    @Query("MATCH (p1:Person), (p2:Person) " +
            "WHERE p1.personId = $parentId AND p2.personId = $childId " +
            "MERGE (p1)-[:PARENT_OF]->(p2)")
    void createParentChildRelationship(@Param("parentId") String parentId, @Param("childId") String childId);

    @Query("MATCH (p1:Person), (p2:Person) " +
            "WHERE p1.personId = $person1Id AND p2.personId = $person2Id " +
            "MERGE (p1)-[:MARRIED_TO]-(p2)")
    void createMarriageRelationship(@Param("person1Id") String person1Id, @Param("person2Id") String person2Id);

    @Query("MATCH (p1:Person), (p2:Person) " +
            "WHERE p1.personId = $sibling1Id AND p2.personId = $sibling2Id " +
            "MERGE (p1)-[:SIBLING_OF]-(p2)")
    void createSiblingRelationship(@Param("sibling1Id") String sibling1Id, @Param("sibling2Id") String sibling2Id);

    @Query("MATCH (p:Person)-[r]-() WHERE p.personId = $personId DELETE r")
    void deleteRelationships(@Param("personId") String personId);

    @Query("MATCH (p:Person) WHERE p.familyTreeId = $familyTreeId DETACH DELETE p")
    void deleteAllByFamilyTreeId(@Param("familyTreeId") Long familyTreeId);

    @Query("MATCH (p:Person) WHERE p.familyTreeId = $familyTreeId RETURN p LIMIT 1")
    Person findRootPerson(@Param("familyTreeId") Long familyTreeId);

    @Query("MATCH (p:Person)-[:PARENT_OF]->(child:Person) " +
            "WHERE child.personId = $personId " +
            "RETURN p")
    List<Person> findParents(@Param("personId") String personId);

    @Query("MATCH (p:Person)-[:PARENT_OF]->(child:Person) " +
            "WHERE child.personId = $personId AND p.gender = $gender " +
            "RETURN p")
    List<Person> findParentsByGender(@Param("personId") String personId, @Param("gender") String gender);

    @Query("MATCH (p:Person)-[:PARENT_OF]->(child:Person) " +
            "WHERE p.personId = $personId " +
            "RETURN child")
    List<Person> findChildren(@Param("personId") String personId);

    @Query("MATCH (p:Person)-[:MARRIED_TO]-(spouse:Person) " +
            "WHERE p.personId = $personId " +
            "RETURN spouse")
    Person findSpouse(@Param("personId") String personId);

    @Query("MATCH (p:Person)-[:MARRIED_TO]-(spouse:Person) " +
            "WHERE p.personId = $personId " +
            "RETURN spouse")
    List<Person> findSpouses(@Param("personId") String personId);

    @Query("MATCH (p:Person)-[:PARENT_OF]-(commonParent:Person)-[:PARENT_OF]-(sibling:Person) " +
            "WHERE p.personId = $personId AND sibling.personId <> p.personId " +
            "RETURN sibling")
    List<Person> findSiblings(@Param("personId") Long personId);

    @Query("MATCH (grandparent:Person)-[:PARENT_OF]->(parent1:Person)-[:PARENT_OF]->(child1:Person), " +
            "(grandparent)-[:PARENT_OF]->(parent2:Person)-[:PARENT_OF]->(child2:Person) " +
            "WHERE child1.personId = $personId AND parent1 <> parent2" +
            "RETURN child2")
    List<Person> findCousins(@Param("personId") Long personId);

    @Query("MATCH (root:Person {firstNode: true})-[:PARENT_OF|SPOUSE_OF*0..]-(relative:Person) " +
            "WHERE root.familyTreeId = $familyTreeId " +
            "RETURN DISTINCT relative")
    List<Person> findAllConnectedPersonsByFamilyTreeId(@Param("familyTreeId") Long familyTreeId);


}
