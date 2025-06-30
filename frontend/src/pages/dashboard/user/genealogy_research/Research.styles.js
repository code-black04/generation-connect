import styled from "styled-components";

// Main container
export const FormContainer = styled.div`
  max-width: 100vw;
  backdrop-filter: blur(4px);
  margin: -0.5rem auto 2rem;
`;

// Group each form input and label
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

// Label for inputs
export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #4f3d60;
  margin-bottom: 6px;
`;

// Input field
export const Input = styled.input`
  padding: 10px;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f9fafb;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #4f3d60;
    box-shadow: 0 0 0 2px rgb(140, 110, 174, 0.2);
    background-color: white;
  }
`;

// Submit button
export const SubmitButton = styled.button`
  padding: 10px 20px;
  background: #336440;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #3f7f4f;
  }
`;

export const FlexRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FlexItem = styled.div`
  flex: 1;
  min-width: 220px;
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #4f3d60;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
  margin-bottom: 1rem;

  &:hover {
    color: rgb(140, 110, 174);
  }
`;

// Collapsible advanced section
export const CollapsibleSection = styled.div`
  max-height: ${({ expanded }) => (expanded ? "1000px" : "0px")};
  opacity: ${({ expanded }) => (expanded ? 1 : 0)};
  overflow: hidden;
  transition: max-height 0.4s ease, opacity 0.4s ease;
`;

// Container for result cards
export const ResultsContainer = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
`;

// Card for each result
export const ResultCard = styled.div`
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

// Title for result cards
export const ResultTitle = styled.h4`
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: 600;
  color: #4f3d60;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 4px;
`;

// Display key-value pairs
export const ResultField = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 4px 0;
  border-bottom: 1px dotted #e2e8f0;

  strong {
    font-weight: 600;
    color: #4f3d60;
    margin-right: 10px;
  }

  span {
    color: #4f3d60;
    word-break: break-word;
    text-align: right;
  }
`;

export const Select = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

export const UploadContainer = styled.div`
margin-top: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  border: 2px dashed #cbd5e0;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  color: #4a5568;
  font-size: 14px;
  margin: -1rem auto 2rem;
  padding: 2rem;
`;

export const FormatHint = styled.div`
  position: absolute;
  top: 8px;
  left: 12px;
  font-size: 20px;
  color: #666;
  font-style: italic;
`;



export const UploadLabel = styled.label`
  font-weight: 600;
  color: #4f3d60;
  display: inline-block;
  font-size: large;
  padding-bottom: 1rem;
  padding-top: 1rem;
`;

export const UploadInput = styled.input`
  display: block;
  margin: 0.5rem auto 0;
  padding: 0.4rem;
  font-size: 14px;
  border: 1px solid #4f3d60;
  border-radius: 6px;
  background: #fff;
  width: 100%;
  max-width: 300px;

  &:focus {
    outline: none;
    border-color:rgb(140, 110, 174);
    box-shadow: 0 0 0 2px rgb(186, 159, 216);
  }
`;