import styled from "styled-components";

export const GcSigningContainer = styled.header`
  background: linear-gradient(135deg, #f8fafc,rgb(179, 161, 201));
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
  width: clamp(5vw, 6vw, 7vw);
  height: clamp(5vw, 6vw, 7vw);
  margin-top: 0;
  margin-left: 0;
  border-radius: 50%;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  object-fit: contain;
  align-self: center;
  border-style: dotted;
  box-sizing: border-box;
  border-color: aliceblue;
`;

export const FormContainer = styled.form`
    max-width: 400px;
    margin: 0 auto;
    gap: 5px;
    margin-bottom: 10px;
    width: 100%;
`;

export const InputRow = styled.div`
    display: flex;
    gap: 5px;
    margin-bottom: 10px;
    &:input {
    width: 100vw;
    height: 30vw;
  }
`;

export const InputRowGroup = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    gap: 5px;
`;

export const Input = styled.input`
  width: 100%;
  height: 35px;
  padding: 5px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #4a4a55;
    outline: none;
    box-shadow: 0 0 5px rgba(140, 110, 174, 0.5);
  }
`;


export const SigningButtonContainer = styled.div`
  margin: 0 auto;
  border-color: rgb(140, 110, 174);
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
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
    background-color: rgb(140, 110, 174);
    color: white;
    transition: background-color 0.3s ease, color 0.3s ease;
    &:hover {
      background-color: #4f3d60;
      box-sizing: border-box;
    }
`;

export const PageHeader = styled.h1`
  font-size: 28px;
  color: #4f3d60;
  font-weight: bolder;
  margin-bottom: 30px;
  text-align: center;
  width: 100%;
  max-width: 100%;
`;