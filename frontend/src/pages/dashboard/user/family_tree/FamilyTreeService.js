import { deletePerson } from "../../../../component/family-chart/handlers";
import { API_BASE } from "Constants";

class FamilyTreeService {

    // Method to fetch genealogies
    async fetchGenealogies(userId) {
        try {
            const response = await fetch(`${API_BASE}/family-tree/getAllTrees`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error("Failed to fetch genealogies");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createFamilyTree(familyTreeDTO) {
        try {
            const response = await fetch(`${API_BASE}/family-tree/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(familyTreeDTO),
            });
            if (!response.ok) {
                const errorData = await response.json();
                const error = new Error("Login failed");
                error.status = response.status;
                error.data = errorData;
                throw error;
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    async updatePerson(userId, familiyTreeId, person) {
        try {
            const response = await fetch(`${API_BASE}/person/update2/${userId}/${familiyTreeId}/person`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(person),
            });
            if (!response.ok) throw new Error("Failed to update person");
            return await response.json();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deletePerson(userId, familiyTreeId, personId) {
        try {
            const response = await fetch(`${API_BASE}/person/delete/${userId}/${familiyTreeId}/${personId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            if (!response.ok) throw new Error("Failed to delete person");
        } catch (error) {
            throw new Error(error.message);
        }
    }

    //Used
    async addUserToFamilyTree(familyTreeId, addedMemberUserId, role, memberAddedBy) {
        try {
          // Create the DTO to be sent in the request body
          const manageUserDTO = {
            familyTreeId, 
            addedMemberUserId, 
            role,
            memberAddedBy
          };
      
          const response = await fetch(`${API_BASE}/family-tree/manage-users/${familyTreeId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(manageUserDTO)
          });
      
          if (!response.ok) {
            const errorData = await response.text() || "Failed to send invite";
            const error = new Error(errorData);
            error.status = response.status;
            error.data = errorData;
            throw error;
          }
          
          return response.text;
        } catch (error) {
          throw error;
        }
      }

      async sendInviteLink(familyTreeId, invitedEmail, role, inviterUserId) {
        try {
          // Create the DTO to be sent in the request body
          const manageUserDTO = {
            familyTreeId, 
            invitedEmail, 
            role,
            inviterUserId
          };
      
          const response = await fetch(`${API_BASE}/family-tree/manage-users/send`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(manageUserDTO)
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            const backendMsg = errorData?.errorMessageList?.[0]?.error || errorData.message || "Failed to send invite";
            const error = new Error(backendMsg);
            error.status = response.status;
            error.data = errorData;
            throw error;
          }
          
          return response.text();
        } catch (error) {
          throw error;
        }
      }
    
      async acceptInvite(token) {
        try {
          const response = await fetch(`${API_BASE}/family-tree/manage-users/accept`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include", // ensures cookies like accessToken are sent
            body: JSON.stringify(token)
          });
      
          if (!response.ok) {
                const errorData = await response.json();

                const error = new Error("Failed to accept invite");
                error.status = response.status;
                error.data = errorData;
                throw error;
              }
      
          return await response.text();
        } catch (error) {
          throw  error;
        }
      }
      

    //USED..
    // Get users associated with a family tree
    async getFamilyTreeUsers(familyTreeId) {
        try {
            const response = await fetch(`${API_BASE}/family-tree/manage-users/${familyTreeId}/users`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            if (!response.ok) throw new Error("Failed to fetch family tree users");
            return await response.json();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    //USED..
    // Update user role in family tree
    async updateUserRole(familyTreeId, addedMemberUserId, role, memberAddedBy) {
        try {
            const response = await fetch(`${API_BASE}/family-tree/manage-users/${familyTreeId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    role: role,
                    familyTreeId : familyTreeId,
                    addedMemberUserId: addedMemberUserId,
                    memberAddedBy: memberAddedBy}),
            });

            const message = await response.text();
            console.log("MESSAGE", message)

            if (!response.ok) throw new Error(message?.trim() ? message : "Failed to update user role");
            return message;
        } catch (error) {
            throw error;
        }
    }

    //USED..
    async deleteUserFromFamilyTree(familyTreeId, addedMemberUserId, memberAddedBy) {
        try {
            const response = await fetch(`${API_BASE}/family-tree/manage-users/${familyTreeId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    familyTreeId,
                    addedMemberUserId,
                    memberAddedBy
                }),
            });

            const message = await response.text();
            console.log("MESSAGE", message);
            if (!response.ok) throw new Error(message?.trim() || "Failed to delete user");
            return message;
        } catch (error) {
            throw error;
        }
    }

    // USED..
    async deleteFamilyTree(familyTreeId) {
        try {
            const response = await fetch(`${API_BASE}/family-tree/delete/${familyTreeId}`, {
                method: "DELETE",
                credentials: "include"
            });

            const message = await response.text();

            if (!response.ok) throw new Error(message?.trim() || "Failed to delete family tree");
            return message;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new FamilyTreeService();
