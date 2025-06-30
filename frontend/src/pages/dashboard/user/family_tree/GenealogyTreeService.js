import { API_BASE } from "Constants";

class FamilyTreeService {
    static async fetchGenealogies(userId) {
        try {
            const response = await fetch(`${API_BASE}/user/${userId}/genealogies`);
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch genealogies.");
        }
    }

    static async fetchFamilyTree1(familyTreeId) {
        try {
            const response = await fetch(`${API_BASE}/person/${familyTreeId}/members-with-relations`);
            return response.json();
        } catch (error) {
            console.log("fetchFamilyTree in service", error);
            throw new Error("Failed to fetch family tree.");
        }
    }

    static async fetchFamilyTree(familyTreeId) {
        try {
            const response = await fetch(`${API_BASE}/person/${familyTreeId}/hierarchy`);
            return response.json();
        } catch (error) {
            console.log("fetchFamilyTree in service", error);
            throw new Error("Failed to fetch family tree.");
        }
    }

    static async fetchGetFamilyByTreeId(familyTreeId) {
        try {
            const response = await fetch(`${API_BASE}/person/get-family/${familyTreeId}`);
            return response.json();
        } catch (error) {
            console.log("fetchFamilyTree in service", error);
            throw new Error("Failed to fetch family tree.");
        }
    }
}

export default FamilyTreeService;
