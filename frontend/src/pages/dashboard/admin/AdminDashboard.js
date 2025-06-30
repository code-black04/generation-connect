import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from "../../../logo.png";
import handleLogout from "../../auth/Logout";
import AdminDashboardService from "../admin/AdminDashboardService.js";
import {
  Section,
  SectionTitle,
  MetricsGrid,
  MetricCard,
  MetricLabel,
  MetricValue
} from "./AdminDashboard.styles";
import { PageContainer, Logo, LogoMenuWrapper, MenuContainer, MenuItem } from "../../home/WelcomePage.styles";
import useCookie from  "../../auth/useCookie";
import { User } from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({});
  const { token, decoded } = useCookie('accessToken');

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await AdminDashboardService.fetchMetrics();
        setMetrics(data);
      } catch (error) {
        console.error("Failed to load metrics:", error);
      }
    };
    loadMetrics();
  }, []);

  const navigateTo = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <PageContainer>
      <LogoMenuWrapper>
        <Logo src={logo} alt="Generations Connect Logo" />
        <MenuContainer>
          <MenuItem onClick={() => navigateTo("/")}>Home</MenuItem>
          <MenuItem onClick={() => navigateTo("/generation-connect-app/admin/dashboard/family-tree-audit")}>Family Tree Audit</MenuItem>
          <MenuItem onClick={() => navigateTo("/faqs/")}>FAQs</MenuItem>
          <MenuItem onClick={() => navigateTo("/resources/")}>Resources</MenuItem>
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
        </MenuContainer>
      </LogoMenuWrapper>

        <Section>
          <SectionTitle>Users Stats</SectionTitle>
          <MetricsGrid>
            <MetricCard>
              <MetricLabel>Total Non Admin Users</MetricLabel>
              <MetricValue>{metrics.totalNonAdminUsers}</MetricValue>
            </MetricCard>
            <MetricCard>
              <MetricLabel>App Admins</MetricLabel>
              <MetricValue>{metrics.appAdmins}</MetricValue>
            </MetricCard>
            <MetricCard>
              <MetricLabel>Active Users (Last 30 Days)</MetricLabel>
              <MetricValue>{metrics.activeUsersLast30Days}</MetricValue>
            </MetricCard>
          </MetricsGrid>
        </Section>

        <Section>
          <SectionTitle>Family Trees Stats</SectionTitle>
          <MetricsGrid>
            <MetricCard>
              <MetricLabel>Total Family Trees</MetricLabel>
              <MetricValue>{metrics.totalFamilyTrees}</MetricValue>
            </MetricCard>
            <MetricCard>
              <MetricLabel>Public Trees</MetricLabel>
              <MetricValue>{metrics.publicFamilyTrees}</MetricValue>
            </MetricCard>
            <MetricCard>
              <MetricLabel>Private Trees</MetricLabel>
              <MetricValue>{metrics.privateFamilyTrees}</MetricValue>
            </MetricCard>
            <MetricCard>
              <MetricLabel>Family Tree Owners</MetricLabel>
              <MetricValue>{metrics.familyTreeOwners}</MetricValue>
            </MetricCard>
            <MetricCard>
              <MetricLabel>Recently Created Trees (Last 30 Days)</MetricLabel>
              <MetricValue>{metrics.recentFamilyTreesLast30Days}</MetricValue>
            </MetricCard>
          </MetricsGrid>
        </Section>

        <Section>
          <SectionTitle>Content Stats</SectionTitle>
          <MetricsGrid>
            <MetricCard>
              <MetricLabel>Total Posts</MetricLabel>
              <MetricValue>{metrics.totalPosts}</MetricValue>
            </MetricCard>
            <MetricCard>
              <MetricLabel>Average Posts Per Tree</MetricLabel>
              <MetricValue>{Number(metrics.averagePostsPerTree).toFixed(1)}</MetricValue>
            </MetricCard>
            <MetricCard>
              <MetricLabel>Total Comments</MetricLabel>
              <MetricValue>{metrics.totalComments}</MetricValue>
            </MetricCard>
            <MetricCard>
              <MetricLabel>Average Comments Per Tree</MetricLabel>
              <MetricValue>{Number(metrics.averageCommentsPerTree).toFixed(1)}</MetricValue>
            </MetricCard>
            <MetricCard>
              <MetricLabel>Pending Invites</MetricLabel>
              <MetricValue>{metrics.pendingInvites}</MetricValue>
            </MetricCard>
          </MetricsGrid>
        </Section>
    </PageContainer>
  );
}

export default AdminDashboard;
