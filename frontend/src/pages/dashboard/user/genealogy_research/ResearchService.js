import { API_BASE } from "Constants";
function buildQueryParams(params) {
  return Object.entries(params)
    .filter(([_, value]) => value !== null && value !== "")
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
}

export async function searchLiveRecords(researchSourceName, researchRequestDTO) {
  const queryString = buildQueryParams(researchRequestDTO);
  const url = `${API_BASE}/research/records/live/${researchSourceName}?${queryString}`;

  try {
      const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error("Login failed");
      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function tagRecordToFamilyTree(tagRequestDTO) {
  const url = `${API_BASE}/research/records/tag`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tagRequestDTO),
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

export async function getTaggedRecordToFamilyTree(familyTreeId) {
  const url = `${API_BASE}/research/records/tagged/${familyTreeId}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error("Login failed");
      error.status = response.status;
      error.data = errorData;
      throw error;
    }
    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function uploadGeneralDocument(file, familyTreeId) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("familyTreeId", familyTreeId);

  try {
    const response = await fetch(`${API_BASE}/research/records/upload`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${errorText}`);
    }

    return await response.text();
  } catch (error) {
    console.error("General upload failed:", error);
    throw error;
  }
}
