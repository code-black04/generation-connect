import React, { useState, useEffect } from 'react';
import Notification from "../../../component/recent-actions/Notification"
import { fetchFamilyTreeEvents } from '../../../component/recent-actions/FamilyTreeEventService';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from "styled-components";
import { fetchAllFamilyTrees } from "./AdminService";
import logo from "../../../logo.png";
import handleLogout from "../../auth/Logout";
import { PageContainer, Logo, LogoMenuWrapper, MenuContainer, MenuItem } from "../../home/WelcomePage.styles";
import { Overlay, ActionContent, TreeSelectWrapper, SelectLabel, StyledSelect, Title } from './AdminDashboard.styles';
import {EmptyPostMessage} from "../user/profiles/FamliyProfileOverlay.styles.js"

const AdminFamilyTreeAudit = (familyTree) => {
  const [notifications, setNotifications] = useState([]);
  const [trees, setTrees] = useState([]);
  const [currentTree, setCurrentTree] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllFamilyTrees()
      .then(setTrees)
      .catch(setError);
      console.log(trees);
    if (currentTree?.familyTreeId) {
      loadEvents(currentTree?.familyTreeId);
    }
  }, [currentTree]);

  const navigateTo = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  async function loadEvents(familyTreeId) {
    try {
      const events = await fetchFamilyTreeEvents(familyTreeId);
      setNotifications(events);
      console.log('Events:', events);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  }

  async function loadTree(familyTreeId){
    const selectedTree = trees.find(tree => String(tree.familyTreeId) === String(familyTreeId));
    setCurrentTree(selectedTree);
    if (selectedTree) {
      await loadEvents(selectedTree.familyTreeId);
  }
  }


  if (error) return <div>Error: {error.message}</div>;
  return (


    <PageContainer>
      <LogoMenuWrapper>
        <Logo src={logo} alt="Generations Connect Logo" />
        <MenuContainer>
          <MenuItem onClick={() => navigateTo("/")}>Home</MenuItem>
          <MenuItem onClick={() => navigateTo("/generation-connect-app/admin/dashboard")}>
            User Metrics
          </MenuItem>
          {/* <MenuItem onClick={() => navigateTo("/devloper-portal/")}>Developer Portal</MenuItem> */}
          <MenuItem onClick={() => navigateTo("/faqs/")}>FAQs</MenuItem>
          <MenuItem onClick={() => navigateTo("/resources/")}>Resources</MenuItem>
          <MenuItem
            style={{
              fontWeight: "bold",
              color: "white",
              backgroundColor: "black",
              padding: "10px 20px",
              borderRadius: "5px",
              marginLeft: "auto"
            }}
            onClick={handleLogout}
          >
            Logout
          </MenuItem>
        </MenuContainer>
      </LogoMenuWrapper>

      <Overlay>
      {trees.length === 0 ? (
  <EmptyPostMessage>
    No audit logs available. Family trees have not been created yet.
  </EmptyPostMessage>
) : (
  <TreeSelectWrapper>
    <SelectLabel htmlFor="tree-select">
      Select a Family Tree to View Its Audit History :
    </SelectLabel>
    <StyledSelect
      id="tree-select"
      value={currentTree?.familyTreeId || ""}
      onChange={(e) => loadTree(e.target.value)}
    >
      <option value="">-- Select a Tree --</option>
      {trees.map(tree => (
        <option key={tree.familyTreeId} value={tree.familyTreeId}>
          {tree.familyTreeName}
        </option>
      ))}
    </StyledSelect>
  </TreeSelectWrapper>
)}


  <ActionContent>
    {currentTree && (
      <>
        <Notification notifications={notifications} familyTree={currentTree} />
      </>
    )}
  </ActionContent>
</Overlay>

    </PageContainer>
  );
};

export default AdminFamilyTreeAudit;
