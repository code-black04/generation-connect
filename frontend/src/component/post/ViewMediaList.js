import React, { useState } from "react";
import styled from "styled-components";
import Lightbox from "react-image-lightbox";


const ResultCard = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s;
  gap: initial;
  &:hover {
    transform: translateY(-4px);
  }
`;

const ResultsContainer = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
`;


const ResultField = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 4px 0;
  border-bottom: 1px dotted #e2e8f0;

  strong {
    font-weight: 600;
    color: #4a5568;
    margin-right: 10px;
  }

  span {
    color: #2d3748;
    word-break: break-word;
    text-align: right;
  }
`;

function ViewMediaList({ uploadFor, allowEdit }) {
  const [lightboxImage, setLightboxImage] = useState(null);
  const getFileUrl = (file) => file.fullUrl || `/generation-connect-api${file.fileUrl}`;
  return (
    <div>
      <ResultsContainer>
        {uploadFor?.files?.map((file, index) => (
          <ResultCard key={file.id || index}>
            {file.fileType?.includes("image") ? (
              <img
                src={getFileUrl(file)}
                alt={file.fileName}
                style={{ maxWidth: "100%", borderRadius: 8, marginTop: 10, cursor: "pointer" }}
                onClick={() => setLightboxImage(getFileUrl(file))}
              />
            ) : file.fileType?.includes("video") ? (
              <video controls width="100%" style={{ borderRadius: 8, marginTop: 10 }}>
                <source src={getFileUrl(file)} type={file.fileType} />
              </video>
            ) : file.fileType?.includes("pdf") ? (
              <div style={{ marginTop: "10px" }}>
                <a href={getFileUrl(file)} target="_blank" rel="noopener noreferrer">📄 View PDF</a>
              </div>
            ) : (
              <div style={{ marginTop: "10px" }}>
                <a href={getFileUrl(file)} target="_blank" rel="noopener noreferrer">📁 Download File</a>
              </div>
            )}
            {file.description && (
              <ResultField>
                <strong>Caption:</strong>
                <span>{file.description}</span>
              </ResultField>
            )}

          </ResultCard>
        ))}

        {lightboxImage && (
          <Lightbox
            mainSrc={lightboxImage}
            onCloseRequest={() => setLightboxImage(null)}
          />
        )}
      </ResultsContainer>
    </div>
  );
}

export default ViewMediaList;