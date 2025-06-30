import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const DropZone = styled.div`
  border: 2px dashed #ced4da;
  padding: 16px;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 10px;
  cursor: pointer;
  &:hover { border-color: #868e96; }
`;

const HiddenInput = styled.input` display: none; `;

const FileList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const FileItem = styled.li`
  font-size: 13px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Thumbnail = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 5px;
`;

const FilePreview = ({ file }) => {
  const fileUrl = "/generation-connect-api" + file.fileUrl;
  const isImage = file.fileType?.startsWith("image");
  const isVideo = file.fileType?.startsWith("video");
  const isPdf = file.fileType?.includes("pdf");

  const [naturalWidth, setNaturalWidth] = useState(100); // default fallback

  const handleImageLoad = (e) => {
    const img = e.target;
    const width = img.naturalWidth;
    setNaturalWidth(Math.min(width, 500)); // max width cap
  };

  if (isImage) {
    return (
      <a href={fileUrl} target="_blank" rel="noreferrer">
        <img
          src={fileUrl}
          alt={file.fileName}
          onLoad={handleImageLoad}
          style={{
            width: `${naturalWidth}px`,
            height: "auto",
            objectFit: "contain",
            borderRadius: 4,
            border: "1px solid #ccc"
          }}
        />
      </a>
    );
  }

  if (isVideo) {
    return (
      <video
        width="300"
        height="180"
        controls
        style={{ borderRadius: 4, border: "1px solid #ccc", background: "#000" }}
      >
        <source src={fileUrl} type={file.fileType} />
        Your browser does not support the video tag.
      </video>
    );
  }

  if (isPdf) {
    return (
      <a href={fileUrl} target="_blank" rel="noreferrer">
        <img
          src="/static/media/pdf-icon.png"
          alt={file.fileName.split("_")[1]}
          width={60}
          height={60}
          style={{ borderRadius: 4 }}
        />
      </a>
    );
  }

  return (
    <a href={fileUrl} target="_blank" rel="noreferrer">
      <img
        src="/file-icon.png"
        alt="File"
        width={60}
        height={60}
        style={{ borderRadius: 4 }}
      />
    </a>
  );
};


function MultiFileUploader({ onUpload, uploadFor }) {
  const inputRef = useRef();
  const [dragOver, setDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Upload files whenever selectedFiles changes
  useEffect(() => {
    if (selectedFiles.length > 0) {
      onUpload(selectedFiles, uploadFor);
      setSelectedFiles([]);
    }
  }, [selectedFiles, onUpload, uploadFor]);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    onUpload(files, uploadFor);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    onUpload(files, uploadFor);
  };

  return (
    <div>
      <FileList>
        {uploadFor && uploadFor.files && uploadFor.files.map((file, idx) => (
          <FileItem key={idx}>
            <FilePreview file={file} />
            <button onClick={() => onUpload([], uploadFor, file.id)}>❌</button>
          </FileItem>
        ))}
      </FileList>

      <DropZone
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{ borderColor: dragOver ? "#339af0" : "#ced4da" }}
      >
        Drag & drop or click to upload
        <HiddenInput
          ref={inputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
        />
      </DropZone>
    </div>
  );
}

export default MultiFileUploader;