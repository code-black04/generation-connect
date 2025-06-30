import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/home/WelcomePage.js';
import AdminLoginPage from './pages/auth/admin/AdminLoginPage.js';
import UserLogInPage from './pages/auth/user/login/UserLogInPage.js';
import UserSignUpPage from './pages/auth/user/signup/UserSignUpPage.js';
import AdminDashboard from './pages/dashboard/admin/AdminDashboard.js';
import AdminFamilyTreeAudit from './pages/dashboard/admin/AdminFamilyTreeAudit.js';
import UserDashboard from './pages/dashboard/user/UserDashboard.js';
import GenealogyTree from './pages/dashboard/user/family_tree/GenealogyTree.js';
import InviteAcceptPage from './pages/dashboard/user/family_tree/InviteAcceptPage.js';
import ResourcesPage from './pages/home/ResourcesPage.js';
import FaqsPage from './pages/home/FaqsPage.js';
import ContactPage from './pages/home/ContactPage.js';
import ProtectedRoute from 'component/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/contact-us/" element={<ContactPage />} />
          <Route path="/faqs/" element={<FaqsPage />} />
          <Route path="/resources/" element={<ResourcesPage />} />

          {/* Auth pages */}
          <Route path="/generation-connect-app/auth/admin/login" element={<AdminLoginPage />} />
          <Route path="/generation-connect-app/auth/user/login" element={<UserLogInPage />} />
          <Route path="/generation-connect-app/auth/user/signup" element={<UserSignUpPage />} />

          {/* Protected Admin routes */}
          <Route
            path="/generation-connect-app/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generation-connect-app/admin/dashboard/family-tree-audit"
            element={
              <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                <AdminFamilyTreeAudit />
              </ProtectedRoute>
            }
          />

          {/* Protected User routes */}
          <Route
            path="/generation-connect-app/user/dashboard"
            element={
              <ProtectedRoute allowedRoles={['ROLE_USER']}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generation-connect-app/genealogy-tree/board/:familyTreeId"
            element={
              <ProtectedRoute allowedRoles={['ROLE_USER']}>
                <GenealogyTree />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generation-connect-app/invite/accept"
            element={
                <InviteAcceptPage />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
