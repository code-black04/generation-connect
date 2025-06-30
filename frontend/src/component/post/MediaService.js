import { API_BASE } from "Constants";
export const MediaService = {
  /**
   * Upload files with either postId or commentId
   * @param {Object} params
   * @param {number} [params.postId]
   * @param {number} [params.commentId]
   * @param {File[]} params.files
   */
  async uploadFiles({ postId, mediaTypeId, files, description }) {
    const formData = new FormData();
    if (postId) formData.append("postId", postId);
    if (mediaTypeId) formData.append("mediaTypeId", mediaTypeId);
    if (description) formData.append("description", description);
    files.forEach(file => formData.append("files", file));

    const res = await fetch(`${API_BASE}/media/upload`, {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      throw new Error(`Upload failed: ${await res.text()}`);
    }

    return res.text();
  },


  /**
   * Delete a file by its ID
   * @param {number} fileId
   */
  async deleteFile(fileId) {
    const res = await fetch(`${API_BASE}/media/files/${fileId}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      throw new Error(`Failed to delete file ${fileId}`);
    }

    return res.text();
  },

  /**
   * Fetch all uploaded files for a given mediaTypeId
   * @param {number} mediaTypeId
   */
  async getFilesByMediaTypeId(mediaTypeId) {
    const res = await fetch(`${API_BASE}/media/by-media-type/${mediaTypeId}`);
    if (!res.ok) {
      throw new Error("Failed to fetch mediaTypeId files");
    }
    return res.json(); // returns array of UploadedMediaDTO
  }

};
