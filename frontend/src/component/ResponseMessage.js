import React from 'react';
import styled, {keyframes} from 'styled-components';

const fadeInOut = keyframes`
  0% { opacity: 0; transform: translate(-50%, 20px); }
  10% { opacity: 1; transform: translate(-50%, 0); }
  90% { opacity: 1; transform: translate(-50%, 0); }
  100% { opacity: 0; transform: translate(-50%, 20px); }
`;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 280px;
  max-width: 90%;
  background-color: ${({ type }) => (type === "success" ? "rgb(30, 158, 107)" :"rgb(157, 64, 81)")};
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 15px;
  z-index: 9999;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  animation: ${fadeInOut} 3s ease-in-out forwards;
  text-align: center;
`;

const ResponseMessage = ({ message, type }) => {
  if (!message) return null;
  return <ToastContainer type={type}>{message}</ToastContainer>;
};

export default ResponseMessage;
