import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  overflow-y: auto;

  animation: gradientShift 6s ease infinite;

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

export const Content = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 1300px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: relative;
  color: #4f3d60;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;


export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #dc3545;
  color: white;
  border: none;
  font-size: 16px;
  font-weight: bold;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  cursor: pointer;
  padding: 0;

  &:hover {
    background: #c82333;
  }
`;


export const PostCard = styled.div`
  width: 100%;
  max-width: 1000px;
  background: #ffffff;
  padding: 16px 20px;
  margin-left: 10px;
  margin-bottom: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PostContent = styled.p`
  font-size: 16px;
  color: #343a40;
  line-height: 1.6;
  margin: 0; 
  text-align: left;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-width: 1000px;
  max-width: 1000px;
  min-height: 60px;
  margin-top: 10px;
  font-size: 14px;
`;

export const SubmitButton = styled.button`
  margin-top: 8px;
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;