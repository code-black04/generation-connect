import React, {useEffect, useState} from "react";
import {PageContainer, Logo, MenuContainer, MenuItem, LogoMenuWrapper, ApplicationTitleContainer, SectionTitle, SectionDescription, ContentSection, FeatureItem, ContentDescription, CardTitle, CardDescription, Card, CardSection, FeaturesSection, FeatureTextContainer, FeatureImage, FeatureDescription, FeatureTitle, FooterSection, FooterLinks, FooterButton, FooterText, StartButton} from "./WelcomePage.styles";
import logo from "../../logo.png";
import TypingAnimation from "./TypingAnimation";
import ai from "../images/ai.jpeg";
import familyTreeImage from "../images/family_tree.jpeg";
import manageUser from "../images/manageUser.jpeg";
import postedImage from "../images/post.jpeg";
import researchImage from "../images/research.jpeg";
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import handleLogout from "../auth/Logout";
import useCookie from  "../auth/useCookie"
import { User } from "lucide-react";

const features = [
  {
    title: "Interactive Family Trees",
    description:
      "Build and explore your family tree with ease. Click, zoom, and navigate through generations to discover how everyone is connected.",
    image: familyTreeImage,
    imageAlt: "Interactive Family Trees"
  },
  {
    title: "Collaborative Storytelling – Your Family’s Legacy, Unfolded",
    description:
      "Add memories, share stories, and bring family profiles to life with different multi-media and experiences from your loved ones.",
    image: postedImage,
    imageAlt: "Collaborative Storytelling – Your Family’s Legacy, Unfolded"
  },
  {
    title: "Collaborative Research Tools – Discover Your Ancestry Together",
    description:
      "Search archives, tag records, upload documents and team up with family to uncover your roots—all in one place.",
    image: researchImage,
    imageAlt: "Collaborative Research Tools – Discover Your Ancestry Together"
  },
  {
    title: "Manage Family Tree Access and Permissions",
    description:
      "Control who can view or edit your tree. Easily add members, assign roles, and keep your family data safe.",
    image: manageUser,
    imageAlt: "Manage Family Tree Access and Permissions"
  },
  {
    title: "AI-Powered Knowledge Insights",
    description:
      "Ask AI explain how people are related, upcoming events and other questions which you might have for the family tree.",
    image: ai,
    imageAlt: "AI-Powered Knowledge Insights"
  }
];



function WelcomePage () {
  const { token1, decoded } = useCookie('accessToken');
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const token = getCookie("accessToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const { roles } = decodedToken;
        setIsAuthenticated(true);

        if (roles.includes("ROLE_ADMIN")) {
          setUserRole("admin");
        } else if (roles.includes("ROLE_USER")) {
          setUserRole("user");
          console.error("ROLE", userRole);
        } else {
          setUserRole(null);
        }
      } catch (error) {
        console.error("Invalid Token", error);
        setIsAuthenticated(false);
        setUserRole(null);
      }
    }
  }, [navigate]);

  const onDashboardClick = () => {
    if (userRole === "admin") {
      navigate("/generation-connect-app/admin/dashboard");
    } else if (userRole === "user") {
      navigate("/generation-connect-app/user/dashboard");
    }
  };


  const onBackToHomepage = () => {
    navigate("/");
    window.scrollTo(0, 0);
  }

  const onContactUsPage = () => {
    navigate("/contact-us/");
  }

  const onFAQsPage = () => {
    navigate("/faqs/");
  }

  const onResourcesPage = () => {
    navigate("/resources/");
  }

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const checkAuthentication = () => {
    const token = getCookie("accessToken");

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            const { roles } = decodedToken;

            if (roles.includes("ROLE_ADMIN")) {
                navigate("/generation-connect-app/admin/dashboard");
            } else if (roles.includes("ROLE_USER")) {
                navigate("/generation-connect-app/user/dashboard");
            }
            return true;
        } catch (error) {
            console.error("Invalid Token ", error);
        }
    } else {
        navigate("/");
        return false;
    }
}


  const onAdminSignInPage = () => {
    const token = getCookie("accessToken");

    if(token) {
      checkAuthentication();
    } else {
      navigate("/generation-connect-app/auth/admin/login");
    }
  }

  const onUserLoginPage = () => {
    const token = getCookie("accessToken");

    if(token) {
      checkAuthentication();
    } else {
      navigate("/generation-connect-app/auth/user/login");
    }
  }

  const onUserSignUpPage = () => {
    navigate("/generation-connect-app/auth/user/signup");
  }

  return (
    <PageContainer>
      <LogoMenuWrapper>
        <Logo src={logo} alt="Generations Connect Logo" />
        <MenuContainer>
          <MenuItem onClick={onBackToHomepage}>Homepage</MenuItem>
          <MenuItem onClick={onFAQsPage}>FAQs</MenuItem>
          <MenuItem onClick={onResourcesPage}>Resources</MenuItem>
          
          {isAuthenticated ? (
            <>
              <MenuItem onClick={() => window.open('/generation-connect-api/swagger-ui/index.html', '_blank')}>
                  Developer API Docs
              </MenuItem>
              <MenuItem onClick={onDashboardClick}>Access your Dashboard</MenuItem>
                        <div style={{
                          color: "black",
                          borderRadius: "5px",
                          padding: "10px 20px",
                          marginLeft: "auto",
                          fontWeight: "bold",
                          border: "none",
                          marginRight: "10px"
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: 'auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#4a4a55', fontWeight: 500 }}>
                                <User size={16} style={{ marginRight: '0.3rem' }} />
                                <div>Hello, {decoded.first_name && decoded.last_name ? decoded.first_name + " " + decoded.last_name : decoded.sub}</div>
                            </div>
                            <MenuItem
                              style={{
                                fontWeight: "bold",
                                color: "white",
                                backgroundColor: "#3f314f",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                marginLeft: "auto"
                              }}
                              onClick={handleLogout}
                            >
                              Logout
                            </MenuItem>
                          </div>
                        </div>
            </>
          ) : (
            <>
              <MenuItem onClick={onAdminSignInPage}>Admin Login</MenuItem>
              <MenuItem onClick={onUserLoginPage}>Member LogIn</MenuItem>
              <StartButton onClick={onUserSignUpPage}>Start your Journey</StartButton>
            </>
          )}

        </MenuContainer>
      </LogoMenuWrapper>

      <ApplicationTitleContainer>
        <SectionTitle>JOIN GENERATIONS CONNECT</SectionTitle>
        <SectionDescription>
          THE PLACE TO
        </SectionDescription>
        <TypingAnimation/>
      </ApplicationTitleContainer>


      <ContentSection>
        <ContentDescription>
        Every family has a story—full of memories, traditions, and connections that deserve to be remembered and shared. Generations Connect is more than just a genealogy platform; it’s a place where your family’s history comes to life.<br/><br/>

        Imagine bringing together generations, sharing stories, and uncovering the past in a way that feels personal and meaningful. Whether you’re rediscovering long-lost relatives, preserving cherished moments, or simply celebrating your heritage, this is your space to connect and collaborate.<br/><br/>

        Your family’s journey is unique, and it deserves to be told. Start exploring, sharing, and building your legacy today with Generations Connect.<br/><br/>
        </ContentDescription>
      </ContentSection>

      <CardSection>
        <Card>
          <CardTitle>Privacy Control</CardTitle>
          <CardDescription>
            Control who can view and edit your family tree with flexible access settings.
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>Media Support</CardTitle>
          <CardDescription>
            Upload and preserve photos, audio, videos, and documents in any format.
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>Secure Connection</CardTitle>
          <CardDescription>
            Keep your data safe with encrypted and authenticated access.
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>Interactive Family Tree</CardTitle>
          <CardDescription>
            Explore your family tree with a visual and easy-to-use interface.
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>Collaborative Access</CardTitle>
          <CardDescription>
            Invite family to contribute with roles like Viewer or Contributor.
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>Genealogical Records</CardTitle>
          <CardDescription>
            Search and tag records from national archives to enrich your tree.
          </CardDescription>
        </Card>
      </CardSection>

      <FeaturesSection>
        {features.map((feature, index) => (
          <FeatureItem key={index} index={index}>
            <FeatureImage src={feature.image} alt={feature.title} />
            <FeatureTextContainer>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureTextContainer>
          </FeatureItem>
        ))}
      </FeaturesSection>
      <FooterSection>
        <FooterLinks>
          <FooterButton onClick={onBackToHomepage}>Home</FooterButton>
          <FooterButton onClick={onContactUsPage}>Contact Us</FooterButton>
        </FooterLinks>
        <FooterText>&copy; 2025 Generations Connect. All rights reserved.</FooterText>
      </FooterSection>

    </PageContainer>
  );
}

export default WelcomePage;