import styled from "styled-components";

export const GcSigningContainer = styled.header`
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  padding: 20px;
  box-sizing: border-box;
`;

export const LogoImageContainer = styled.img`
  width: clamp(10vw, 20vw, 25vw);
  height: clamp(10vw, 20vw, 25vw);
  margin-top: 0;
  margin-left: 0;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  object-fit: contain;
  align-self: center;
  border-style: groove;
  box-sizing: border-box;

  @media (min-width: 1024px) {
    width: 10vw;
    height: 10vw;
  }

  @media (max-width: 768px) {
    width: 15vw;
    height: 15vw;
  }

  @media (max-width: 480px) {
    width: 25vw;
    height: 25vw;
  }
`;

export const FormContainer = styled.form`
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    gap: 5px;
    margin-bottom: 10px;
    width: 100%;
`;

export const InputRow = styled.div`
    display: flex;
    gap: 5px;
    margin-bottom: 10px;
    &:input {
    width: 100%;
    height: 30px;
  }
`;

export const InputRowGroup = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    gap: 5px;
    width: 100%;
`;

export const Input = styled.input`
    width: 100%;
    height: 30px;
    padding: 5px;
    box-sizing: border-box;
`;

export const SigningButtonContainer = styled.div`
  margin: 0 auto;
  padding: 40px;
  border-color: aliceblue;
  width: 300px;
  max-width: 400px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
`;

export const ButtonRow = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    gap: 5px;
    flex-wrap: wrap;
`;

export const Button = styled.button`
    width: 100%;
    height: 35px;
    padding: 5px;
    box-sizing: border-box;
    background-color: black;
    transition: background-color 0.3s ease, color 0.3s ease;
    color: white;
    &:hover {
      background-color: white;
      color: black;
      box-sizing: border-box;
    }
`;

export const PageHeader = styled.h1`
  font-size: 30px;
  color: Green;
  margin-bottom: 30px;
`;