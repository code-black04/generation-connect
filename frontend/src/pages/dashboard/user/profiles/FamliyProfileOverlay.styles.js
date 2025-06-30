import styled, {keyframes} from "styled-components";

export const Overlay = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;

  animation: gradientShift 6s ease infinite;

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @media (max-width: 768px) {
    padding: 1vh 1vw;
    flex-direction: column;
    align-items: center;
  }
`;


export const Content = styled.div`
  width: 75%;
  height: 100%;
  box-shadow: none;
  position: relative;
  color: #4f3d60;
  overflow-y: auto;
  font-weight: 500;
`;

export const ActionContent = styled.div`
  width: 25%;
  top:20px;
  height: 100%;
  box-shadow: none;
  position: relative;
  color: #4f3d60;
  overflow-y: auto;
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
  width: 90%;
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
  color: #4f3d60;
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

export const PostAreaWrapper = styled.div`
  width: 90%;
  margin: 2rem 0;
  padding: 1.5rem;
  background: #ebe2f3;
  border-style: dashed;
  border: 1px solid #eeb549;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const PostHelperText = styled.div`
  font-size: 0.9rem;
  color: #4a4a55;
  margin-bottom: 1rem;
  line-height: 1.6;

  strong {
    color: #4f3d60;
  }

  code {
    background: #f4f4f4;
    border-radius: 4px;
    padding: 2px 6px;
    font-family: monospace;
    font-size: 0.85rem;
  }
`;


export const SubmitButton = styled.button`
  margin-top: 5px;
  background: #336440;
  color: white;
  height: fit-content;
  border: none;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #3f7f4f;
  }

  &:disabled {
    background: #bbaecb;
    cursor: not-allowed;
  }
`;


const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
`;

export const EmptyPostMessage = styled.p`
  font-size: 1rem;
  color: #555;
  text-align: center;
  margin-top: 2rem;
  animation: ${fadeIn} 0.6s ease-out both;

  span.emoji {
    display: inline-block;
    margin-right: 6px;
    animation: ${pulse} 1.5s infinite ease-in-out;
  }
`;