import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import FamilyTreeService from "./FamilyTreeService";
import {Container, MainMessage, SubMessage, SpinnerWrapper, DotFlashing} from "./FamilyTreeList.styles.js"

const InviteAcceptPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mainMessage, setMainMessage] = useState("Processing invite...");
  const [subMessage, setSubMessage] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setMainMessage("Invalid or missing invitation link.");
      return;
    }

    const handleInvite = async () => {
      try {
        const response = await FamilyTreeService.acceptInvite(token);
        localStorage.setItem("invite_accepted", "true");
        navigate("/generation-connect-app/user/dashboard");
      } catch (error) {
        const status = error.status;
        const backendMessage = error.data;
        const errorCode = backendMessage?.errorCode;
        const rawMessage = backendMessage?.errorMessageList?.[0]?.error || "Invite could not be accepted.";

        setMainMessage(rawMessage);
        setShowSpinner(true);

        if (errorCode === "ERR_USER_NOT_FOUND") {
          setSubMessage("Redirecting to sign up...");
          localStorage.setItem("invite_token", token);
          localStorage.setItem("invited_email", backendMessage?.errorMessageList?.[0]?.fieldName);
          setTimeout(() => {
            navigate("/generation-connect-app/auth/user/signup");
          }, 10000);
        } else if (status === 500) {
          setSubMessage("Redirecting to your Login page...");
          localStorage.setItem("invite_token", token);
          setTimeout(() => {
            navigate("/generation-connect-app/auth/user/login");
          }, 10000);
        } else if (status === 401) {
            setMainMessage("You're not signed in.");
            setSubMessage("Please sign in to accept the invitation. Redirecting to login...");
            localStorage.setItem("invite_token", token);
            localStorage.setItem("invite_accepted", "false");
            setTimeout(() => {
              navigate("/generation-connect-app/auth/user/login");
            }, 10000);
          } else {
          setSubMessage("");
          localStorage.setItem("invite_accepted", "false");
        }
      }
    };

    handleInvite();
  }, [navigate, searchParams]);

  return (
    <Container>
      <MainMessage>{mainMessage}</MainMessage>
      {subMessage && <SubMessage>{subMessage}</SubMessage>}
      {showSpinner && (
        <SpinnerWrapper>
          <DotFlashing />
        </SpinnerWrapper>
      )}
    </Container>
  );
};

export default InviteAcceptPage;
