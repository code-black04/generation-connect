import { API_BASE } from "Constants";
class GcUserSignUpService {
    async createUser (userSignUpData) {
        const response = await fetch(`${API_BASE}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(userSignUpData),
            credentials: 'include',
        });

        console.log("RESPONSE: ", response);
      
        return response;
    }
}

export default new GcUserSignUpService();