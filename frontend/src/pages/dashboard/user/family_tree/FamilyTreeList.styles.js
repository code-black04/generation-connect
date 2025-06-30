import styled, { keyframes } from "styled-components";

export const GenealogyGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;
    max-width: 100%;
    margin: 2rem auto;
`;

export const GenealogyCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 250px;
  height: 250px;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 4px 12px rgba(100, 100, 111, 0.12);
  }
`;

export const GenealogyCircle = styled.div`
  width: 80px;
  height: 80px;
  background: #ffd37e;
  color: white;
  font-size: 22px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 0 auto 12px;
  transition: background-color 0.3s ease;

  ${GenealogyCard}:hover & {
    background: #eeb549;
  }
`;

export const GenealogyInfo = styled.div`
  h4 {
    margin: 12px 0 6px;
    font-size: 17px;
    color: #3f314f;
    font-weight: 600;
  }

  p {
    font-size: 14px;
    color: #6b7280;
  }
`;


// Overlay when a genealogy is selected
export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

// Overlay content
export const OverlayContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 300px;
    position: relative;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

export const FormContainer = styled.div`
    width: 100%;
    margin: 1.5rem 0;
    padding: 25px;
    backdrop-filter: blur(8px);
    transition: all 0.3s ease-in-out;

    @media (max-width: 768px) {
        max-width: 100%;
        padding: 20px;
    }
`;

export const FormGroup = styled.div`
    margin-bottom: 18px;
`;

export const Label = styled.label`
    display: block;
    font-weight: 600;
    margin-bottom: 5px;
    font-size: 14px;
    color: #333;
    text-align: left;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.6);
    transition: all 0.2s ease-in-out;

    &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 6px rgba(0, 123, 255, 0.3);
        background: white;
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.8);
    transition: all 0.2s ease-in-out;
    min-height: 100px;
    resize: vertical;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 6px rgba(0, 123, 255, 0.3);
        background: white;
    }
`;

export const SubmitButton = styled.button`
    background: #336440;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.3s ease-in-out;

    &:hover {
        background: #3f7f4f;
        box-shadow: 0 4px 10px rgba(0, 91, 187, 0.2);
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
    }
`;

export const RadioButtonContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    label {
        margin-right: 20px;
        font-size: 14px;
        color: #333;
        font-weight: 500;

        input {
            margin-right: 5px;
        }
    }
`;

// Inside Family tree tabs

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
    margin-top: 1.5rem;
    padding-bottom: 1.5rem;
    position: relative;
    top: 0;
    z-index: 1000;
`;


export const HeaderTabs = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0;
  margin-left: 0;
`;

export const TopRightCloseButton = styled.button`
    position: sticky;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    border-radius: 50%;
    padding: 6px;
    color: red;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    
    &:hover {
        background: rgba(0, 0, 0, 0.1);
    }
`;

export const GoBackButton = styled.button`
  background:#ffd37e;
  border: none;
  color: #4f3d60;
  font-weight: 500;
  font-size: 14px;
  padding: 8px 12px;
  margin-left: auto;
  cursor: pointer;
  border-radius: 15%;
  transition: background 0.2s ease-in-out;

  &:hover {
    background-color: #eeb549;
  }
`;



export const Tab = styled.div`
  padding: 10px 18px;
  cursor: pointer;
  border-radius: 15%;
  border: 2px solid ${({ isActive }) => (isActive ? 'rgb(179, 161, 201)' : '#999')};
  background-color: ${({ isActive }) => (isActive ? '#4f3d60' : '#fff')};
  color: ${({ isActive }) => (isActive ? '#fff' : '#4f3d60')};
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#4f3d60' : '#f0f0f0')};
  }
`;

export const CloseButton = styled.button`
    background: rgba(0,0,0,0);
    border: none;
    border-radius: 50%;
    padding: 6px;
    cursor: pointer;
    color: red;
    transition: background 0.2s ease-in-out;
    top: 10px;
    right: 10px;
    z-index: 1000;
    position: absolute;
    &:hover {
        background: rgba(0,0,0,0.1);
    }
`;

// Manage User form

export const ManageUserFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const ManageUserStyledForm = styled.form`
    display: flex;
    flex-direction: row;  
    align-items: center;  // Align items vertically in the center
    gap: 10px;
`;

export const ManageUserStyledInput = styled.input`
    width: 250px;
    padding: 10px;
    border: 1px solid #ccc;
    font-size: 16px;

    &:focus {
        border-color: #4f3d60;
        box-shadow: 0 0 0 0.2rem rgb(140, 110, 174);
    }
`;


export const ManageUserStyledButton = styled.button`
    padding: 10px 10px;
    color: white;
    background-color: #336440;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;
    &:hover {
      background-color: ${({ value }) =>
      value === "invite" ? '#3f7f4f' : '#3f7f4f'};
  }
`;

export const ManageUserInfoText = styled.p`
    text-align: center;
    color: #666;
`;

export const ManageUserToggleButtonGroup = styled.div`
    display: flex;
    border-radius: 5px;
    overflow: hidden;
    
`;

export const ManageUserToggleButton = styled.button`
  flex: none;
  min-width: 80px;
  padding: 8px 12px;
  background-color: ${({ isActive }) => isActive ? '#8c6eae' : '#ececf3'}; 
  color: ${({ isActive }) => isActive ? 'white' : '#4f3d60'};             
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s, color 0.3s;
  margin-right: 8px;

  &:hover {
    background-color: #8c6eae;  // Same for all roles
    color: white;
  }

  &:focus {
    outline: none;
  }

  &:last-child {
    margin-right: 0;
  }
`;



export const UserList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const UserRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    background-color: ${({ index }) => index % 2 === 0 ? '#faf7fc' : '#f1ebf8'};

    padding: 12px 16px;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
`;

export const UserIdText = styled.div`
    max-width: 60%; 
    font-size: 15px;
    font-weight: 600;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;


export const RoleActionsRow = styled.div`
    display: flex;
    gap: 6px;
    flex-shrink: 0;
`;

export const UpdateRoleButton = styled.button`
    padding: 8px 14px;
    background-color: ${({ disabled }) => (disabled ? '#d6d6d6' : '#336440')};    color: white;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    transition: background 0.2s ease-in-out;
    white-space: nowrap;

    &:hover {
      background-color: ${({ disabled }) => (disabled ? '#d6d6d6' : '#3f7f4f')};    }
`;

export const DeleteRoleButton = styled(UpdateRoleButton)`
  background-color: #ffecec;
  color: #d62828;
  margin-left: 0.5rem;

  &:hover {
    background-color: #fbd0d0;
  }
`;


export const ConfirmModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
`;

export const ConfirmModal = styled.div`
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    font-size: 0.95rem;
`;

export const Container = styled.div`
  padding: 2rem;
  text-align: center;
`;

export const MainMessage = styled.h2`
  color: #222;
  margin-bottom: 0.5rem;
`;

export const SubMessage = styled.p`
  color: #666;
  font-style: italic;
  font-size: 1rem;
`;

export const SpinnerWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

const flash = keyframes`
  0%   { background-color: #555; }
  50%  { background-color: #bbb; }
  100% { background-color: #555; }
`;

export const DotFlashing = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #555;
  animation: ${flash} 1s infinite ease-in-out;
`;


export const AccessLevelToggleGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 1.5rem 0;
  gap: 12px;
`;

export const AccessToggleButton = styled.button`
  padding: 10px 18px;
  border: 1px solid ${({ isActive }) => (isActive ? 'rgb(179, 161, 201)' : '#999')};
  background-color: ${({ isActive }) => (isActive ? '#4f3d60' : '#fff')};
  color: ${({ isActive }) => (isActive ? '#fff' : '#4f3d60')};
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  border-radius: 15%;
  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#4f3d60' : '#f0f0f0')};
  }
`;

