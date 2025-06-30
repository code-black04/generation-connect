import { API_BASE } from "Constants";
export async function fetchFamilyTreeEvents(familyTreeId) {
    const response = await fetch(`${API_BASE}/family-tree-events/${familyTreeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch family tree events');
    }

    return await response.json();
  }
