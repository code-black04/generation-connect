import React, {useState, useEffect, useRef} from "react";
import { DashboardContainer, DropdownList, MenuItemWithDropdown, DropdownItem, HoverMenuWrapper} from "./UserDashboard.styles.js";
import {PageContainer, Logo, MenuContainer, MenuItem, LogoMenuWrapper, StartButton} from "../../home/WelcomePage.styles.js";
import logo from "../../../logo.png";
import { useNavigate } from 'react-router-dom';
import handleLogout from "../../auth/Logout";
import FamilyTreeList from "./family_tree/FamilyTreeList.js";
import CreateFamilyTree from "./family_tree/CreateFamilyTree.js";
import { ChevronDown, ChevronUp, User } from "lucide-react";
import ResponseMessage from "../../../component/ResponseMessage.js";
import useCookie from  "../../auth/useCookie";

function UserDashboard () {
  const { token, decoded } = useCookie('accessToken');
    const navigate = useNavigate();

    const onBackToHomepage = () => {
    navigate("/");
        window.scrollTo(0, 0);
    }

    const onFAQsPage = () => {
        navigate("/faqs/");
    }

    const onResourcesPage = () => {
        navigate("/resources/");
    }

    const [activeTab, setActiveTab] = useState("allGenealogy");
    const [refreshKey, setRefreshKey] = useState(0);
    const [dashboardMessage, setDashboardMessage] = useState('');
    const [dashboardMessageType, setDashboardMessageType] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
      };

    const showDashboardMessage = (type, msg) => {
        setDashboardMessageType(type);
        setDashboardMessage(msg);
        setTimeout(() => {
            setDashboardMessage('');
            setDashboardMessageType('');
        }, 5000);
    };


    const handleFamilyTreeCreated = () => {
        setRefreshKey((prevKey) => prevKey + 1); // Refresh the genealogy list
        setActiveTab("allGenealogy"); // Redirect to the list after creation
    };

    const handleTabClick = (tab) => {
        if (tab === activeTab && tab === "allGenealogy") {
          setRefreshKey((prevKey) => prevKey + 1);
        }
        setActiveTab(tab);
      };

    const renderContent = () => {
        switch (activeTab) {
        case "allGenealogy":
            return <FamilyTreeList key={refreshKey}/>;
        case "createNewGenealogy":
            return <CreateFamilyTree onSuccess={handleFamilyTreeCreated} showMessage={showDashboardMessage} />;
        case "research":
            return <p>Research feature coming soon...</p>;
        default:
            return null;
        }
    };

    return (
        <PageContainer>
              <LogoMenuWrapper>
                <Logo src={logo} alt="Generations Connect Logo" />
                <MenuContainer>
                  <MenuItem onClick={onBackToHomepage}>Home</MenuItem>
                  {/* <MenuItem>About</MenuItem> */}
                  <HoverMenuWrapper ref={dropdownRef}>
                    <MenuItemWithDropdown onClick={toggleDropdown}>
                        Your Genealogy
                        {isDropdownOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </MenuItemWithDropdown>

                    <DropdownList isOpen={isDropdownOpen}>
                    <DropdownItem
                        onClick={() => {
                            handleTabClick("allGenealogy");
                            setIsDropdownOpen(false);
                        }}
                        >
                        Your Active Genealogies
                        </DropdownItem>

                        <DropdownItem
                        onClick={() => {
                            handleTabClick("createNewGenealogy");
                            setIsDropdownOpen(false);
                        }}
                        >
                        Create New Genealogy
                    </DropdownItem>

                    </DropdownList>
                </HoverMenuWrapper>

                  <MenuItem onClick={onFAQsPage}>FAQs</MenuItem>
                  <MenuItem onClick={onResourcesPage}>Resources</MenuItem>
                    <MenuItem onClick={() => window.open('/generation-connect-api/swagger-ui/index.html', '_blank')}>
                        Developer API Docs
                    </MenuItem>
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
                                <div>Hello, {decoded.first_name + ' ' + decoded.last_name}</div>
                            </div>
                            <StartButton onClick={handleLogout}>Logout</StartButton>
                        </div>
                    </div>
                </MenuContainer>
              </LogoMenuWrapper>
            
              <DashboardContainer>
                {renderContent()}
                {dashboardMessage && (
                    <ResponseMessage type={dashboardMessageType} message={dashboardMessage} />
                )}
            </DashboardContainer>
        </PageContainer>
    );
}

export default UserDashboard;