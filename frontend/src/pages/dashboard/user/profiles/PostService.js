import { API_BASE } from "Constants";
export async function createPost({ personId, familyTreeId, postContent, userProfilePost, createdBy, createdDate }) {
  try {
    const response = await fetch(`${API_BASE}/posts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify({
        personId,
        familyTreeId,
        postContent,
        userProfilePost,
        createdBy,
        createdDate,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export async function getPostsByPerson(personId) {
  try {
    const response = await fetch(`${API_BASE}/posts/person/${personId}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

  export async function getPostsByFamilyTreeId(familyTreeId) {
    try {
      const response = await fetch(`${API_BASE}/posts/family/${familyTreeId}`, {
        method: 'GET',
        credentials: 'include',
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

