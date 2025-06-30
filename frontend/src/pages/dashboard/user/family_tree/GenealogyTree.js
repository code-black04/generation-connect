import React, { useState, useEffect } from "react";
import FamilyTreeService from "./GenealogyTreeService.js";
import FamilyTreeGraph from "./FamilyTreeGraph.js";
import { generateUUID } from "../../../../component/family-chart/CreateTree/newPerson.js";

const GenealogyTree = ({familyTreeId, userId, onClose, userRole}) => {
    const [familyTree, setFamilyTree] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  
    const convertToF3Format = (input) => {
        return input.map((person) => {
          const { id, data: personData, relationship, firstNode } = person;
          return {
            id: id.toString(),
            data: {
              firstName: personData.firstName || "",
              lastName: personData.lastName || "",
              birthdate : personData.birthdate || "",
              demiseDate : personData.demiseDate  || "",
              desc: personData.desc || "",
              label: personData.label || "", 
              gender: personData.gender?.[0].toUpperCase() === "M" ? "M" : "F",
              avatar : personData.avatar || "",
              countryOfCitizenship: personData.countryOfCitizenship || "",
              awardReceived: personData.awardReceived || "",
              placeOfBirth: personData.placeOfBirth || "",
              educatedAt: personData.educatedAt || "",
              occupation: personData.occupation || "",
              positionHeld: personData.positionHeld || "",
              employer: personData.employer || "",
              residence: personData.residence || "",
              languagesSpokenWritten: personData.languagesSpokenWritten || "",
              significantEvent: personData.significantEvent || "",
              ownerOf: personData.ownerOf || ""
            },
            rels: {
              father: relationship?.father?.toString() || null,
              mother: relationship?.mother?.toString() || null,
              spouses: (relationship?.spouses || []).map((spouseId) => spouseId.toString()),
              children: (relationship?.children || []).map((childId) => childId.toString())
            }
          };
        });
      };

    useEffect(() => {
      if (!familyTreeId) return;
      console.log("addNewPerson" , generateUUID())
        const loadFamilyTree = async () => {
            try {
                const data = await FamilyTreeService.fetchGetFamilyByTreeId(familyTreeId);
                console.log("Raw API data:", data);
                let formattedData = convertToF3Format(data);
                console.log("Converted data for F3:", formattedData);
                if(formattedData.length == 0){
                  formattedData =  [
                    {
                      "id": generateUUID(),
                      "rels": {},
                      "data": {
                        "firstName": "Firstname",
                        "lastName": "Lastname",
                        "gender": "M"
                      }
                    }
                  ]
                }
                setFamilyTree(formattedData);

            } catch (error) {
                console.error("Error loading family tree:", error);
                setError("Error loading family tree");
            } finally {
                setLoading(false);
            }
        };
        loadFamilyTree();
    }, [familyTreeId]);

    if (loading) return <p>Loading family tree...</p>;
    if (error) return <p>{error}</p>;

    return (
        <FamilyTreeGraph data={familyTree} familyTreeId={familyTreeId} userId={userId} userRole={userRole}/>
    );
};

export default GenealogyTree;
