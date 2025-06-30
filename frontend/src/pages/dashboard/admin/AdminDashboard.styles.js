import styled from "styled-components";

export const Logo = styled.img`
  width: 15vw;
  height: 15vw;
  margin: 0;
  padding: 0;
  display: block;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  object-fit: contain;
  border-style: groove;
  box-sizing: border-box;

  @media (min-width: 480px) {
    width: 5vw;
    height: 5vw;
  }

  @media (max-width: 480px) {
    width: 25vw;
    height: 25vw;
  }
`;

export const Section = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 12px;
`;


export const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #333;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const MetricsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  justify-content: center;
`;

export const MetricCard = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 1.2rem;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
  border: 1px solid #f0f0f0;
`;

export const MetricLabel = styled.div`
  font-size: 0.95rem;
  color: #666;
`;

export const MetricValue = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #222;
  margin-top: 0.5rem;
`;

export const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-start;
  min-height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  margin: 1rem;
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

export const ActionContent = styled.div`
  width: 40%;
  height: 100%;
  font-size: 1.2rem;
  box-shadow: none;
  position: relative;
  color: black;
  overflow-y: auto;
`;

export const TreeSelectWrapper = styled.div`
margin-bottom: 1rem;
  margin-bottom: 20px;
  text-align: left;
`;

export const SelectLabel = styled.label`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #333;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
  text-align: left;
  margin-right: 10px;
  @media (max-width: 768px) {
    text-align: center;
  }
  `;

export const StyledSelect = styled.select`
  padding: 5px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  min-width: 250px;
  background-color: #fdfdff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  &:focus {
    outline: none;
    border-color: #8c6eae;
    box-shadow: 0 0 5px rgba(140, 110, 174, 0.3);
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  color: #444;
  text-align: center;
  margin-bottom: 10px;
`;