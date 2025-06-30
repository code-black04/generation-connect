import React, { useState } from "react";
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  ResultsContainer,
  ResultCard,
  ResultTitle,
  ResultField,
  FlexRow,
  FlexItem,
  ToggleButton,
  CollapsibleSection,
  Select
} from "./Research.styles.js";
import { searchLiveRecords, tagRecordToFamilyTree } from "./ResearchService";
import ResponseMessage from "../../../../component/ResponseMessage.js";

const Research = ({familyTree, userRole}) => {
  const [formData, setFormData] = useState({
    titleName: "",
    firstName: "",
    lastName: "",
    dateOfBirthFrom: "",
    dateOfBirthTo: "",
    searchQuery: "",
    dateFrom: "",
    dateTo: "",
  });

  const [researchSourceName, setResearchSourceName] = useState("THE_NATIONAL_ARCHIVE_UK");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [tagged, setTagged] = useState({});
  const recordsPerPage = 5;
  const allowEdit = userRole === "Owner" || userRole === "Contributor";
  const [exactMatch, setExactMatch] = useState(false);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setExpanded({});
    setCurrentPage(1);

    try {
      const payload = {
        ...formData,
        searchQuery: exactMatch ? `"${formData.searchQuery.trim()}"` : formData.searchQuery.trim()
      };
      const response = await searchLiveRecords(researchSourceName, payload);
      setResult(response);
      if (response.status === 200) {
        setMessageType('success');
        setMessage('');
      }
    } catch (error) {
      const errorMsg = "Something went wrong, please try again.."
      const errorData = error.data;
      console.error("ERROR", errorData);
      if (
          errorData &&
          Array.isArray(errorData.errorMessageList) &&
          errorData.errorMessageList.length > 0
      ) {
          errorMsg = errorData.errorMessageList[0].error;
      } else if (errorData && errorData.message) {
          errorMsg = errorData.message;
      }

      setMessageType('error');
      setMessage(errorMsg);
      setTimeout(() => setMessage(''), 5000);
    }
  };

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

  const paginatedRecords = result?.records?.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const totalPages = Math.ceil((result?.records?.length || 0) / recordsPerPage);

  const handleTagToggle = async (entry) => {
    const id = entry.id;

    const isEmpty = (val) =>
      val === null ||
      val === undefined ||
      (typeof val === "string" && val.trim() === "") ||
      (Array.isArray(val) && val.length === 0) ||
      (typeof val === "object" && !Array.isArray(val) && Object.keys(val).length === 0);
  
    const cleanedEntry = Object.fromEntries(
      Object.entries(entry).filter(([_, value]) => !isEmpty(value))
    );
    
    const tagRequestDTO = {
      externalRecordId: id,
      familyTreeId: familyTree?.familyTreeId,
      researchSourceName: researchSourceName,
      savedResearchedData: cleanedEntry,
    };
  
    try {
      const response = await tagRecordToFamilyTree(tagRequestDTO);
      setTagged((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    } catch (err) {
      const errorMsg = "Something went wrong, please try again.."
      const errorData = error.data;
      console.error("ERROR", errorData);
      if (
          errorData &&
          Array.isArray(errorData.errorMessageList) &&
          errorData.errorMessageList.length > 0
      ) {
        errorMsg = errorData.errorMessageList[0].error;
      } else if (errorData && errorData.message) {
        errorMsg = errorData.message;
      }

      setMessageType('error');
      setMessage(errorMsg);
      setTimeout(() => setMessage(''), 5000);
    }
  };
  
  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        {/* Search Query & Submit */}
        <FlexRow style={{ alignItems: "center" }}>
  <FlexItem style={{ flexGrow: 1 }}>
    <FormGroup style={{ marginBottom: 0 }}>
      <Label htmlFor="searchQuery"></Label>
      <Input
        type="text"
        name="searchQuery"
        placeholder="Search Query"
        value={formData.searchQuery}
        onChange={handleChange}
        required
      />
    </FormGroup>
  </FlexItem>

  <FlexItem style={{ flex: "unset", display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
    <input
      type="checkbox"
      id="exactMatch"
      checked={exactMatch}
      onChange={() => setExactMatch(prev => !prev)}
      style={{ transform: "scale(1.2)" }}
    />
    <label htmlFor="exactMatch" style={{ fontSize: "17px", color: "#4f3d60", userSelect: "none", fontWeight: '2000'}}>
      Exact Match
    </label>
  </FlexItem>
</FlexRow>


        <FlexRow>
          <FlexItem>
            <FormGroup>
              <Label htmlFor="dateFrom">Record Date From</Label>
              <Input
                type="date"
                max={new Date().toISOString().split("T")[0]}
                name="dateFrom"
                value={formData.dateFrom}
                onChange={handleChange}
              />
            </FormGroup>
          </FlexItem>
          <FlexItem>
            <FormGroup>
              <Label htmlFor="dateTo">Record Date To</Label>
              <Input
                type="date"
                max={new Date().toISOString().split("T")[0]}
                name="dateTo"
                value={formData.dateTo}
                onChange={handleChange}
              />
            </FormGroup>
          </FlexItem>
        </FlexRow>

        {/* Country Code */}
        <FlexRow>
        <FlexItem>
          <FormGroup>
            <Label htmlFor="researchSourceName">Research Source</Label>
            <Select
              id="researchSourceName"
              name="researchSourceName"
              value={researchSourceName}
              onChange={(e) => setResearchSourceName(e.target.value)}
            >
              <option value="The National Archive UK">The National Archive - UK</option>
              <option value="National Archive US" disabled> National Archive - US(Coming Soon..)</option>
            </Select>
          </FormGroup>
        </FlexItem>
      </FlexRow>


        {/* Advanced Toggle */}
        <div style={{ textAlign: "right" }}>
          <ToggleButton
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? "Hide Advanced Search" : "Show Advanced Search"}
          </ToggleButton>
        </div>

        <CollapsibleSection expanded={showAdvanced}>
          <FlexRow>
            <FlexItem>
              <FormGroup>
                <Label htmlFor="titleName"></Label>
                <Input
                  type="text"
                  name="titleName"
                  placeholder="Title Name"
                  value={formData.titleName}
                  onChange={handleChange}
                />
              </FormGroup>
            </FlexItem>
            <FlexItem>
              <FormGroup>
                <Label htmlFor="firstName"></Label>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </FormGroup>
            </FlexItem>
            <FlexItem>
              <FormGroup>
                <Label htmlFor="lastName"></Label>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </FormGroup>
            </FlexItem>
          </FlexRow>

          <FlexRow>
            <FlexItem>
              <FormGroup>
                <Label htmlFor="dateOfBirthFrom">Date of Birth From</Label>
                <Input
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  name="dateOfBirthFrom"
                  value={formData.dateOfBirthFrom}
                  onChange={handleChange}
                />
              </FormGroup>
            </FlexItem>
            <FlexItem>
              <FormGroup>
                <Label htmlFor="dateOfBirthTo">Date of Birth To</Label>
                <Input
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  name="dateOfBirthTo"
                  value={formData.dateOfBirthTo}
                  onChange={handleChange}
                />
              </FormGroup>
            </FlexItem>
          </FlexRow>
        </CollapsibleSection>

        <SubmitButton type="submit">Search</SubmitButton>

      </form>

      {paginatedRecords && (
        <ResultsContainer>
          {paginatedRecords.map((entry, index) => {
            const isExpanded = expanded[entry.id];

            return (
              <ResultCard key={entry.id || index}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <ResultTitle>
                Result #{(currentPage - 1) * recordsPerPage + index + 1}
              </ResultTitle>

              <button
                onClick={() => handleTagToggle(entry)}
                disabled={!allowEdit}
                style={{
                  fontSize: "13px",
                  background: tagged[entry.id] ? "#38a169" : "none",
                  border: tagged[entry.id] ? "1px solid #38a169" : "1px solid #ccc",
                  color: tagged[entry.id] ? "#fff" : "#3182ce",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  cursor: allowEdit ? "pointer" : "not-allowed",
                  opacity: allowEdit ? 1 : 0.6,
                  transition: "all 0.2s ease",
                }}
              >
                {tagged[entry.id] ? "Tagged ✔" : "Tag Record"}
              </button>
            </div>

                {["title", "reference", "heldBy", "coveringDates"]
                  .filter((key) => entry[key])
                  .map((key) => (
                    <ResultField key={key}>
                      <strong>{formatLabel(key)}:</strong>
                      <span>{formatValue(entry[key])}</span>
                    </ResultField>
                  ))}

                <button
                  onClick={() =>
                    setExpanded((prev) => ({
                      ...prev,
                      [entry.id]: !prev[entry.id],
                    }))
                  }
                  style={{
                    marginTop: "10px",
                    fontSize: "13px",
                    background: "none",
                    border: "none",
                    color: "#3182ce",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  {isExpanded ? "Hide Details" : "View More"}
                </button>

                {isExpanded && (
                  <div style={{ marginTop: "10px" }}>
                    {Object.entries(entry)
                      .filter(
                        ([key, value]) =>
                          value !== null &&
                          value !== "" &&
                          value !== undefined &&
                          !["title", "reference", "heldBy", "coveringDates"].includes(key)
                      )
                      .map(([key, value]) => (
                        <ResultField key={key}>
                          <strong>{formatLabel(key)}:</strong>
                          <span>{formatValue(value)}</span>
                        </ResultField>
                      ))}
                  </div>
                )}
              </ResultCard>
            );
          })}
        </ResultsContainer>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              style={{
                margin: "0 5px",
                padding: "6px 12px",
                background: currentPage === index + 1 ? "#3182ce" : "#e2e8f0",
                color: currentPage === index + 1 ? "#fff" : "#333",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

    <ResponseMessage type={messageType} message={message} />
    </FormContainer>
    
  );
};

export default Research;
