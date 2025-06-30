import React, { useEffect, useState, useRef } from "react";
import {
  FormContainer,
  ResultCard,
  ResultTitle,
  ResultField,
  ResultsContainer,
  SubmitButton,
  ToggleButton,
  UploadContainer,
  UploadLabel,
  UploadInput,
  FormatHint,
  
} from "./Research.styles.js";
import { getTaggedRecordToFamilyTree } from "./ResearchService.js";
import ResponseMessage from "../../../../component/ResponseMessage.js";
import { MediaService } from "../../../../component/post/MediaService.js";
import { Trash2 } from "lucide-react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { EmptyPostMessage } from "../profiles/FamliyProfileOverlay.styles.js";
import {ConfirmModalOverlay, ConfirmModal} from "../family_tree/FamilyTreeList.styles.js";

const FamilyTreeHistoricalDocument = ({ familyTreeId, userRole }) => {
  const [records, setRecords] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [uploadingId, setUploadingId] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [pendingFiles, setPendingFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [fileToDelete, setFileToDelete] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const allowEdit = userRole === "Owner" || userRole === "Contributor";
  const inputRef = useRef();
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [tagged, files] = await Promise.all([
          getTaggedRecordToFamilyTree(familyTreeId),
          MediaService.getFilesByMediaTypeId("famliy_tree_document_" + familyTreeId)
        ]);
        setRecords(tagged);
        setDocuments({ id: familyTreeId, files });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (familyTreeId) {
      fetchData();
    }
  }, [familyTreeId, uploadingId]);

  const handleUpload = async (newFiles, uploadFor, removeFileId = null) => {
    try {
      if (removeFileId) {
        await MediaService.deleteFile(removeFileId);
      } else {
        await MediaService.uploadFiles({
          mediaTypeId: "famliy_tree_document_" + familyTreeId,
          files: newFiles
        });
      }
      const updatedFiles = await MediaService.getFilesByMediaTypeId("famliy_tree_document_" + familyTreeId);
      setDocuments({ id: familyTreeId, files: updatedFiles });
    } catch (error) {
      console.error("Upload/delete error:", error);
    }
  };

  const handleSubmitPendingFiles = () => {
    if (pendingFiles.length > 0) {
      handleUpload(pendingFiles, documents);
      setPendingFiles([]);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    setPendingFiles(files);
    inputRef.current.files = e.dataTransfer.files;
  };

  const getFileUrl = (file) => file.fullUrl || `/generation-connect-api${file.fileUrl}`;

  const formatLabel = (key) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  const formatValue = (val) =>
    val == null
      ? "—"
      : Array.isArray(val)
      ? val.join(", ")
      : typeof val === "object"
      ? JSON.stringify(val, null, 2)
      : String(val);

  return (
    <FormContainer>
      {allowEdit && (
        <UploadContainer
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          style={{ borderColor: dragOver ? "#4299e1" : undefined }}
        >
          <FormatHint>
          Drag & drop your files here.
          </FormatHint>
          <UploadLabel htmlFor="uploadInput">Got something to share? Upload it here!</UploadLabel>
          <UploadInput
            ref={inputRef}
            id="uploadInput"
            type="file"
            accept="video/*,application/pdf,image/*"
            multiple
            onChange={(e) => setPendingFiles(Array.from(e.target.files))}
          />
          <p style={{ fontSize: '0.85rem', color: '#4f3d60', marginTop: '4px', fontWeight: '0.50' , fontStyle: 'italic'}}>
          Supported file formats: PDF, audio, video, JPG, JPEG, PNG, csv, zip and text.
          </p>
          <SubmitButton onClick={handleSubmitPendingFiles} style={{ marginTop: "0.5rem", width: "fit-content" }}>
            Upload
          </SubmitButton>
        </UploadContainer>
      )}

        <>
          {!loading && (
            <EmptyPostMessage>
              {documents?.files?.length === 0 && records.length === 0 ? (
                allowEdit ? (
                  <>
                    <span className="emoji" style={{color: "#4f3d60"}}>📭</span> No historical records yet. Upload or tag something to get started!
                  </>
                ) : (
                  <>
                    <span className="emoji" style={{color: "#4f3d60"}}>📭</span> No historical records available yet.
                  </>
                )
              ) : (
                <>
                  <span className="emoji" style={{color: "#4f3d60"}}>📚</span> Here's what's been added so far.
                </>
              )}
            </EmptyPostMessage>
          )}
        </>


      <ResultsContainer>
        {documents?.files?.map((file, index) => (
          <ResultCard key={file.id || index} style={{ position: 'relative' }}>
            {allowEdit && (
              <div
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  padding: '4px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease-in-out'
                }}
                onClick={() => setFileToDelete(file)}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,0,0,0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <Trash2 size={18} color="#b00020" />
              </div>
            )}
        
            <ResultTitle>Uploaded Document #{index + 1}</ResultTitle>

            <ResultField>
              <strong>Uploaded at:</strong>
              <span>{new Date(file.uploadedAt || file.createdAt || Date.now()).toLocaleString()}</span>
            </ResultField>

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
                <a
                  href={getFileUrl(file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#336440",
                    fontWeight: "500",
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#3f7f4f")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#336440")}
                >📄 View PDF</a>
              </div>
            ) : (
              <div style={{ marginTop: "10px"}}>
                <a
                  href={getFileUrl(file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#336440",
                    fontWeight: "500",
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#3f7f4f")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#336440")}
                >📁 Download File</a>
              </div>
            )}
          </ResultCard>
        ))}

        {records.map((record, index) => {
          const isExpanded = expanded[record.externalRecordId];
          return (
            <ResultCard key={record.externalRecordId || index}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <ResultTitle>Tagged Record #{index + 1}</ResultTitle>
                <span style={{ fontSize: "12px", color: "#718096" }}>{record.researchSourceNameEnum}</span>
              </div>

              {Object.entries(record.savedResearchedData || {})
                .filter(([_, value]) => value !== null && value !== "")
                .slice(0, isExpanded ? undefined : 4)
                .map(([key, value]) => (
                  <ResultField key={key}>
                    <strong>{formatLabel(key)}:</strong>
                    <span>{formatValue(value)}</span>
                  </ResultField>
                ))}

              {Object.entries(record.savedResearchedData || {}).length > 4 && (
                <ToggleButton
                  type="button"
                  onClick={() =>
                    setExpanded((prev) => ({
                      ...prev,
                      [record.externalRecordId]: !prev[record.externalRecordId],
                    }))
                  }
                >
                  {isExpanded ? "Hide Details" : "View More"}
                </ToggleButton>
              )}

              <div style={{ fontSize: "12px", marginTop: "10px", color:"#4a4a55" }}>
                Linked At: {record.linkedAt}
              </div>

              {record.mediaUrl && (
                <div style={{ marginTop: "10px" }}>
                  <strong>Media:</strong>
                  {record.mediaType?.includes("video") && (
                    <video controls width="100%">
                      <source src={record.mediaUrl} type={record.mediaType} />
                    </video>
                  )}
                  {record.mediaType?.includes("image") && (
                    <img src={record.mediaUrl} alt="Record Media" style={{ maxWidth: "100%" }} />
                  )}
                  {record.mediaType?.includes("pdf") && (
                    <a href={record.mediaUrl} target="_blank" rel="noopener noreferrer">
                      📄 View PDF
                    </a>
                  )}
                </div>
              )}
            </ResultCard>
          );
        })}
      </ResultsContainer>

      {fileToDelete && (
        <ConfirmModalOverlay>
          <ConfirmModal>
            <p>Are you sure you want to delete this file?</p>
            <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
              <button onClick={() => setFileToDelete(null)}>Cancel</button>
              <button
                style={{ backgroundColor: "#d62828", color: "white" }}
                onClick={async () => {
                  await handleUpload([], documents, fileToDelete.id);
                  setFileToDelete(null);
                }}
              >
                Confirm
              </button>
            </div>
          </ConfirmModal>
        </ConfirmModalOverlay>
      )}

      {lightboxImage && (
        <Lightbox
          mainSrc={lightboxImage}
          onCloseRequest={() => setLightboxImage(null)}
        />
      )}

      <ResponseMessage type={messageType} message={message} />
    </FormContainer>
  );
};

export default FamilyTreeHistoricalDocument;
