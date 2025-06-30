import React, { useState, useRef} from 'react';
import { MediaService } from "./MediaService.js";
import { SubmitButton } from '../../pages/dashboard/user/profiles/FamliyProfileOverlay.styles.js';
import ResponseMessage from '../ResponseMessage.js';

function AddPost({ handlePostSubmit, reload, postAlias, mediaType }) {
  const [postContent, setPostContent] = useState('');
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const filesWithDescriptions = selectedFiles.map(file => ({
      file,
      description: ''
    }));
    setFiles(prev => [...prev, ...filesWithDescriptions]);
  };

  const handleDescriptionChange = (index, value) => {
    const updatedFiles = [...files];
    updatedFiles[index].description = value;
    setFiles(updatedFiles);
  };

  const onSubmit = async () => {
    if (!postContent.trim() && files.length === 0) {
      setMessageType('error');
      setMessage("To create a post, please include either some text or at least one file");
      return;
    }

    setSubmitting(true);
    try {
      const response = await handlePostSubmit(postContent);
      console.log("Post created:", response);

      if (files.length > 0) {
        await Promise.all(files.map(fileObj => handleUpload(fileObj, response)));
      }
      if (reload) {
        reload();
      }
      setPostContent('');
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      setMessageType('success');
      setMessage("Post created successfully");
    } catch (error) {
      console.error("Submit error:", error);
      setMessageType('error');
      setMessage("Unable to create post.");
      
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpload = async (fileObj, uploadFor) => {
    try {
      const response = await MediaService.uploadFiles({
        mediaTypeId: mediaType + uploadFor.id,
        files: [fileObj.file],
        description: fileObj.description
      });
      console.log("Uploaded file:", response);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div>
      <ResponseMessage type={messageType} message={message} />
      
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder={postAlias}
        rows={4}
        required
        style={{ width: '100%', marginBottom: '5px' }}
      />

      <div style={{alignContent: 'center', gap: '1px'}}>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ marginBottom: '10px'}}
        />

        {files.length > 0 && (
          <div style={{ marginBottom: '10px' }}>
            <strong>Files to upload:</strong>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {files.map((fileObj, index) => (
                <li key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{fileObj.file.name}</span>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }}
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter file description..."
                    value={fileObj.description}
                    onChange={(e) => handleDescriptionChange(index, e.target.value)}
                    style={{ width: '100%', marginTop: '5px' }}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}


        <SubmitButton onClick={onSubmit} style={{ marginTop: "0.5rem", width: "fit-content" }}>
          {submitting ? 'Posting...' : 'Post'}
        </SubmitButton>
      </div>
    </div>
  );
}

export default AddPost;
