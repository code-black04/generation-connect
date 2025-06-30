import styled from "styled-components";
import { MenuItem  } from "../../home/WelcomePage.styles";

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  z-index: 1;
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

export const MainContent = styled.div`
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    padding: 20px;
  }
`;

export const ContentTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: #e2e8f0;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
    text-align: center;
  }
`;


export const HoverMenuWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const MenuItemWithDropdown = styled(MenuItem)`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const DropdownList = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  min-width: 220px;
  z-index: 2;
  padding: 0.3rem 0;
`;

export const DropdownItem = styled.div`
  padding: 10px 16px;
  font-size: 0.95rem;
  color: #333;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;
