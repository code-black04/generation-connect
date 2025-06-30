import styled, {keyframes} from "styled-components";

// Container for the entire page
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1vh 1vh;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc,rgb(179, 161, 201));
  width: 100vw;
  overflow-x: hidden;
  overflow-y: hidden;
  flex-wrap: wrap;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 2vh 2vw;
  }
`;

// Logo at the top of the page
export const Logo = styled.img`
  width: 6vw;
  height: 6vw;
  margin-top: 0;
  margin-left: 0;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  object-fit: contain;
  align-self: flex-start;
  box-sizing: border-box;
  border-radius: 50%;
  border-style: dotted;
  box-sizing: border-box;
  border-color: aliceblue;

  @media (min-width: 480px) {
    width: 4vw;
    height: 4vw;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 0rem;
  margin-left: 2rem;
  gap: 10px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 2rem;
    width: 100%;
  }

  @media (max-width: 480px) {
    margin-left: 0rem;
    gap: 1rem;
    align-items: center;
    width: 100%;
  }
`;

// Styled menu item as button
export const MenuItem = styled.button`
  font-size: 1.2rem;
  font-weight: 1000;
  color: #4f3d60;
  cursor: pointer;
  padding: 1rem 1rem;
  background: none;
  border: none;
  transition: 0.3s ease-in-out, transform 0.2s;

  &:hover {
    background: rgba(100, 100, 111, 0.1);
    transform: scale(1.05);
    font-weight: 600;
  }

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.8rem 1rem;
  }
`;

export const StartButton = styled(MenuItem)`
  background-color: #3f314f;
  color: white;
  border-radius: 5px;
  padding: 10px 20px;
  margin-left: auto;
  font-weight: bold;
  border: none;
  margin-right: 10px;
  &:hover {
    background-color:rgb(140, 110, 174);
    color: white;
  }
`;



export const LogoMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(79, 61, 96, 0.2);
  padding-bottom: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px;
  }
`;

export const ApplicationTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 600px;
  min-height: 15rem;
  color: black;
  padding-left: 2rem;
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

// Section title
export const SectionTitle = styled.h3`
  font-size: 2rem;
  color: black;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

// Section description
export const SectionDescription = styled.h1`
  font-size: 4rem;
  color: black;
  margin-bottom: 1.5rem;
  font-family: monospace;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const AnimatedText = styled.div`
  font-size: 4rem;
  font-family: monospace;
  font-weight: bold;
  color:rgb(179, 134, 222);
  white-space: nowrap;
  display: block;
  min-height: 7vw;
`;

// Typing pipe (blinking cursor)
export const TypingPipe = styled.span`
font-weight: bolder;
  animation: ${blink} 1s infinite;
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ContentDescription = styled.p`
  font-size: 1.2rem;
  color: #4a4a55;
  text-align: justify;
  line-height: 1.6;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;


export const CardSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 98vw;
  padding: 1rem 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

export const Card = styled.div`
  background: linear-gradient(145deg, #f9fafa, #e5e6ec);
  box-shadow: 0 4px 8px rgba(60, 60, 60, 0.06);
  border-radius: 16px;
  padding: 1.5rem;
  margin: 1rem;
  width: 130px;
  height: 200px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: all 0.5s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 480px) {
    width: 90%;
    height: auto;
  }
`;

export const CardTitle = styled.h4`
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #3f314f;
`;

export const CardDescription = styled.p`
  font-size: 0.95rem;
  color: #4a4a55;
  line-height: 1.5;
  margin: 0;
`;


export const FeaturesSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 98vw;

  margin: 0 auto;
  padding: 4vh 2vw;
  box-sizing: border-box;
  @media (max-width: 1024px) {
    padding: 4vh 3vw;
  }

  @media (max-width: 768px) {
    padding: 3vh 2vw;
  }

  @media (max-width: 480px) {
    padding: 3vh 1.5vw;
  }
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4vw;
  width: 100%;
  padding: 4vh 5vw;
  flex-wrap: wrap;
  background-color: ${({ index }) => (index % 2 === 0 ?"rgb(241, 243, 247)" :"rgb(230, 233, 237)")};
  box-sizing: border-box;
  flex-direction: row;
  &:nth-child(even) {
    flex-direction: row-reverse;
  }

  @media (max-width: 1024px) {
    gap: 3vw;
    padding: 3vh 4vw;
  }

  @media (max-width: 768px) {
    flex-direction: column !important;
    align-items: center;
    text-align: center;
    gap: 2vw;
    padding: 3vh 2vw;
  }

  @media (max-width: 480px) { 
    padding: 2vh 1.5vw;
    gap: 1.5vw;
  }
`;

export const FeatureImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 12px;
  object-fit: contain;
  @media (max-width: 1024px) {
    max-width: 45vw;
  }

  @media (max-width: 768px) {
    max-width: 50vw;
  }

  @media (max-width: 480px) {
    max-width: 70vw;
  }
`;

export const FeatureTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 60vw;
  text-align: left;
  @media (max-width: 768px) {
    flex-basis: 60vw;
    text-align: center;
  }

  @media (max-width: 480px) {
    flex-basis: 80vw;
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: #3f314f;
  margin-bottom: 0.8vh;
  letter-spacing: 0.5px;

  @media (max-width: 1024px) {
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

export const FeatureDescription = styled.p`
  font-size: 1.2rem;
  color: #445c66;
  line-height: 1.8;
  max-width: 90%;
  
  @media (max-width: 1024px) {
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;



// Footer section styling
export const FooterSection = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  width: 100%;
  box-sizing: border-box;
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

export const FooterButton = styled.button`
  font-size: 1rem;
  font-weight: 1000;
  color: #4f3d60;
  border: none;
  background: none;
  text-decoration: none;

  &:hover {
    font-weight: bolder;
    color: #2d2d2d;
  }
`;

export const FooterText = styled.p`
  font-size: 1rem;
  color:rgb(226, 232, 240);
  margin-top: 1rem;
  text-align: center;
`;

const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(20px); }
`;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 280px;
  max-width: 90%;
  background-color: ${({ type }) => type === 'success' ? '#4caf50' : '#f44336'};
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  z-index: 1000;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.2);
  animation: ${fadeInOut} 3s ease-in-out forwards;
  text-align: center;
`;

export const ToastMessage = ({ message, type }) => {
  if (!message) return null;
  return <ToastContainer type={type}>{message}</ToastContainer>;
};