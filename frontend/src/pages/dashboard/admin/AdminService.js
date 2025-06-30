import { API_BASE } from "Constants";
export async function fetchAllFamilyTrees() {

    const response = await fetch(`${API_BASE}/admin/family-tree-list/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch all family trees');
    }

    return await response.json();
  }

