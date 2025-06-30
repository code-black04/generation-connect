import { API_BASE } from "Constants";

class GcUserSignInService {
    async getUser(userSignInData) {
    try {
        const urlEncodedData = new URLSearchParams(userSignInData).toString();
        console.log("formData : " + urlEncodedData);
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userSignInData),
            credentials: 'include',
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
}

export default new GcUserSignInService();