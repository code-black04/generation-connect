import React, { useState, useEffect } from "react";
import FamilyTreeService from "./FamilyTreeService";
import GenealogyTree from "./GenealogyTree.js";
import {
    GenealogyGrid,
    GenealogyCard,
    GenealogyCircle,
    GenealogyInfo,
    HeaderContainer, HeaderTabs, Tab,
    ConfirmModal,
    ConfirmModalOverlay,
    AccessLevelToggleGroup,
    AccessToggleButton,
    TopRightCloseButton,
    GoBackButton
} from "./FamilyTreeList.styles.js";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { ArrowBigLeft, Trash2 } from "lucide-react";
import ManageUser from "./ManageUser.js";
import  FamliyProfileOverlay  from "../profiles/FamliyProfileOverlay.js";
import Research from "../genealogy_research/Research.js";
import FamilyTreeHistoricalDocument from "../genealogy_research/FamilyTreeHistoricalDocument.js";

function FamilyTreeList() {
    const navigate = useNavigate();

    const [genealogies, setGenealogies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedGenealogy, setSelectedGenealogy] = useState(null);
    const [activeTab, setActiveTab] = useState("familyTree");
    const [activeAccessLevelTab, setActiveAccessLevelTab] = useState("Private");
    const [userRole, setUserRole] = useState(null);

    const [familyTreeToDelete, setFamilyTreeToDelete] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const [showInviteAccepted, setShowInviteAccepted] = useState(false);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    };

    const token = getCookie("accessToken");
    const decodedToken = jwtDecode(token);
    const { sub } = decodedToken;

    useEffect(() => {
        const loadGenealogies = async () => {
            try {
                const userId = sub;
                const data = await FamilyTreeService.fetchGenealogies(userId);
                if (data.length === 0) {
                    setError("No Family trees found");
                } else {
                    setGenealogies(data);
                    setError(null);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
                setError(null);
            }
        };

        loadGenealogies();
    }, []);

    useEffect(() => {
      if (localStorage.getItem("invite_accepted") === "true") {
        setShowInviteAccepted(true);
        localStorage.removeItem("invite_accepted");
      }
    }, []);
    

    useEffect(() => {
      const loadUsersWithRole = async () => {
        if(!selectedGenealogy) return;
        try {
          const users = await FamilyTreeService.getFamilyTreeUsers(selectedGenealogy.familyTreeId);
          const userAccess = users.find(user => user.addedMemberUserId === sub);
          if (userAccess) {
            setUserRole(userAccess.role);
          }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
      };

      loadUsersWithRole();
    }, [selectedGenealogy]);

    if (loading) {
        return <p>Loading genealogies...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const filteredGenealogies = genealogies.filter(g => g.familyTreeAccessLevel === activeAccessLevelTab);

    const renderHeader = (title) => (
      <HeaderContainer>
          <HeaderTabs>
              <h2 style={{ margin: 0 }}>{title}</h2>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingLeft: 0, marginLeft: 0}}>
                  {[
                      { key: 'familyTree', label: 'Family Tree' },
                      { key: 'familyProfile', label: 'Family Profile' },
                      { key: 'familyHistory', label: 'Family Tree Historical Documents Collection' },
                      { key: 'genealogicalResearch', label: 'Genealogical Research' },
                      ...(selectedGenealogy?.memberUserId === sub
                        ? [{ key: 'manageUsers', label: 'Manage Users' }]
                        : [])
                  ].map(tab => (
                      <Tab
                          key={tab.key}
                          isActive={activeTab === tab.key}
                          onClick={() => {
                              setActiveTab(tab.key);
                              if (!selectedGenealogy && genealogies.length > 0) {
                                setSelectedGenealogy(genealogies[0]);
                              }
                          }}>
                          {tab.label}
                      </Tab>
                  ))}
              </div>
          </HeaderTabs>
          {selectedGenealogy && (
            <GoBackButton
              onClick={() => {
                setSelectedGenealogy(null);
                setActiveTab('familyTree');
              }}
            >
              ← Go Back to the list of tree
            </GoBackButton>
          )}

      </HeaderContainer>
  );
  
    return (
      <div style={{
        padding: '1rem',
        width: '100%',
        margin: '0 auto',
      }}>
        
        {activeTab === "familyTree" && !selectedGenealogy && (
                <>
                <AccessLevelToggleGroup>
                  {['Private', 'Public'].map(access => (
                    <AccessToggleButton
                      key={access}
                      isActive={activeAccessLevelTab === access}
                      onClick={() => setActiveAccessLevelTab(access)}
                    >
                      {access} Family Trees
                    </AccessToggleButton>
                  ))}
                </AccessLevelToggleGroup>
                <GenealogyGrid>
                  {filteredGenealogies.length > 0 ? (
                    filteredGenealogies.map((genealogy, index) => (
                      <GenealogyCard
                          key={index}
                          style={{ position: "relative", cursor: "pointer" }}
                          onClick={() => setSelectedGenealogy(genealogy)}
                        >
                          <GenealogyCircle>{genealogy.familyTreeName[0]}</GenealogyCircle>
                          <div
                            style={{
                              position: "absolute",
                              top: "0.5rem",
                              right: "0.5rem",
                              padding: "4px",
                              borderRadius: "50%",
                              zIndex: 1,
                              transition: "background 0.2s ease-in-out",
                              cursor: genealogy.memberUserId === sub ? "pointer" : "not-allowed",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (genealogy.memberUserId === sub) {
                                setFamilyTreeToDelete(genealogy);
                                setShowConfirmModal(true);
                              }
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(255,0,0,0.1)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                            }}
                          >
                            <Trash2
                              size={18}
                              color={genealogy.memberUserId === sub ? "#b00020" : "#b00020"}
                            />
                          </div>

                          <GenealogyInfo>
                            <h4 style={{ margin: 0 }}>{genealogy.familyTreeName}</h4>
                            <p style={{color: "#3f314f"}}><b>Created by:</b> {genealogy.memberUserId}</p>
                            <p style={{color: "#3f314f"}}><b>Description:</b> {genealogy.familyTreeDescription}</p>
                          </GenealogyInfo>
                        </GenealogyCard>
                      ))
                  ) : (
                  <p>No {activeAccessLevelTab} genealogies found.</p>
                )}
              </GenealogyGrid>
          </>
        )}
  
        {activeTab === "familyProfile" && (
          <>
            {renderHeader()}
            <FamliyProfileOverlay
              familyTree={selectedGenealogy}
              userRole={userRole}
            />
          </>
        )}
  
        {activeTab === "familyHistory" && (
          <>
            {renderHeader()}
            <p><FamilyTreeHistoricalDocument
              familyTreeId={selectedGenealogy.familyTreeId}
              userRole={userRole}
            /></p>
          </>
        )}

        {activeTab === "genealogicalResearch" && (
          <>
            {renderHeader()}
            <Research 
            familyTree={selectedGenealogy}
            userRole={userRole}
            />
          </>
        )}

        {activeTab === "manageUsers" && selectedGenealogy && (
          <>
            {renderHeader()}
            <ManageUser
              familyTreeId={selectedGenealogy.familyTreeId}
              memberAddedBy={sub}
              onClose={() => {
                setSelectedGenealogy(null);
                setActiveTab("familyTree");
            }}
            />
          </>
        )}

        {activeTab === "familyTree" && selectedGenealogy && (
          <>
            {renderHeader()}
            <GenealogyTree
              familyTreeId={selectedGenealogy.familyTreeId}
              userId={selectedGenealogy.memberUserId}
              onClose={() => setSelectedGenealogy(null)}
              userRole={userRole}
            />
          </>
        )}

        {showConfirmModal && familyTreeToDelete && (
          <ConfirmModalOverlay>
            <ConfirmModal>
              <p>
                Are you sure you want to delete the family tree <strong>{familyTreeToDelete.familyTreeName}</strong>?
              </p>
              <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                <button onClick={() => setShowConfirmModal(false)}>Cancel</button>
                <button
                  style={{ backgroundColor: "#b00020", color: "white" }}
                  onClick={async () => {
                    try {
                      await FamilyTreeService.deleteFamilyTree(familyTreeToDelete.familyTreeId);
                      setGenealogies((prev) =>
                        prev.filter((tree) => tree.familyTreeId !== familyTreeToDelete.familyTreeId)
                      );
                    } catch (err) {
                      alert("Failed to delete family tree.");
                    } finally {
                      setShowConfirmModal(false);
                      setFamilyTreeToDelete(null);
                    }
                  }}
                >
                  Confirm
                </button>
              </div>
            </ConfirmModal>
          </ConfirmModalOverlay>
        )}

        {showInviteAccepted && (
          <ConfirmModalOverlay>
            <ConfirmModal>
              <p style={{ fontWeight: 500, color: "#2e7d32" }}>
                🎉 You’ve successfully joined the family tree!
              </p>
              <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setShowInviteAccepted(false)}
                  style={{
                    backgroundColor: "#2e7d32",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Got it
                </button>
              </div>
            </ConfirmModal>
          </ConfirmModalOverlay>
        )}
      </div>
    );
  }
    

export default FamilyTreeList;
