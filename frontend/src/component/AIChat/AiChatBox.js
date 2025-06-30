import React, { useState } from 'react';
import styled from 'styled-components';
import { API_BASE } from "Constants";

const ToggleButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: #8300ff;
  color: white;
  border: none;
  padding: 0.75rem 1.2rem;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  z-index: 1000;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ChatContainer = styled.div`
  background: #f8f8f8;
  width: 90%;
  max-width: 600px;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.15);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ddd;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  resize: none;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const SendButton = styled.button`
  margin-top: 1rem;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  background: #4f3d60;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const ResponseBox = styled.div`
  margin-top: 1.5rem;
  background: #eaeaea;
  padding: 1rem;
  border-radius: 8px;
  text-align: left;
`;

const AiChatBox = ({ familyTreeData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if(!familyTreeData){
      setAiResponse("Tree has no family memebers. Please add family members");
      return;
    }
    console.log("AI familyTreeData : " + JSON.stringify(familyTreeData));
    if (!userMessage.trim()) return;
    setLoading(true);
    setAiResponse('');

    try {
      const response = await fetch(`${API_BASE}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:  JSON.stringify("current date : "+new Date().toISOString())
          +  "\n" + JSON.stringify(familyTreeData)
          + "\n" +JSON.stringify(userMessage) + " in this family tree without person id."
          + "\n" +JSON.stringify("respond in html markup")

      });

      const data = await response.text();
      setAiResponse(data);
    } catch (error) {
      setAiResponse('⚠️ Error connecting to AI service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToggleButton onClick={() => setIsOpen(true)}>Ask AI</ToggleButton>

      {isOpen && (
        <ModalOverlay>
          <ChatContainer>
            <CloseButton onClick={() => setIsOpen(false)}>Close</CloseButton>
            <h2>Ask the AI</h2>
            <TextArea
              rows={5}
              placeholder="Type your message..."
              value={userMessage}
              style={{
                width: '90%',
              }}
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <SendButton onClick={sendMessage} disabled={loading}>
              {loading ? 'Thinking...' : 'Send'}
            </SendButton>

            {/* {aiResponse && (
              <ResponseBox>
                <strong>AI:</strong> {aiResponse}
              </ResponseBox>
            )} */}

{aiResponse && (
              <ResponseBox
                dangerouslySetInnerHTML={{ __html: aiResponse }}
              />
            )}
          </ChatContainer>
        </ModalOverlay>
      )}
    </>
  );
};

export default AiChatBox;

