import React, {useState, useEffect} from "react";
import logo from "../../../../logo.png";
import { GcSigningContainer, LogoImageContainer, FormContainer, InputRow, InputRowGroup, Input, SigningButtonContainer, ButtonGroup, ButtonRow, Button, PageHeader} from "./UserLogInPage.styles.js";
import { useNavigate } from 'react-router-dom';
import GcUserSignInService from "./GcUserSignInService.js";
import ResponseMessage from "../../../../component/ResponseMessage.js";

function UserLogInPage () {
const [emailId, setEmailId] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);

const navigate = useNavigate();

const [message, setMessage] = useState('');
const [messageType, setMessageType] = useState('');

const toggleShowPassword = () => {
    setShowPassword(!showPassword);
}

    useEffect(() => {
        // Function to get a cookie by its name
        const getCookie = (name) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(';').shift();
          return null;
        };

        // Check if the accessToken cookie exists
        const token = getCookie('accessToken');

        if (token) {
          // If token exists, navigate to the dashboard
          navigate("/generation-connect-app/user/dashboard");
        }
      }, [navigate]);

const handleSignInForm = async (event) => {
    event.preventDefault();
    console.log('Form data:', { emailId, password});

    try {
        const username = emailId;
        let encoded = btoa(password);
        const userSignInData = {username, password : encoded};
        const signInresponse = await GcUserSignInService.getUser(userSignInData);
        
        if (signInresponse.status === 200) {
            setMessageType('success');
            setMessage('Sign-in successful! Redirecting...');
            setTimeout(() => navigate("/generation-connect-app/user/dashboard"), 2000);
        }
    } catch (error) {
        let errorMsg = 'Sign-in failed. Please try again.';
        
        if (error.status === 403 || error.status === 401 || error.status === 404) {
            const errorData = error.data;
            console.error("ERROR", errorData);
            if (
                errorData &&
                Array.isArray(errorData.errorMessageList) &&
                errorData.errorMessageList.length > 0
            ) {
                errorMsg = errorData.errorMessageList[0]?.error;
            } else if (errorData && errorData.message) {
                errorMsg = errorData.message;
            }
        }

        setMessageType('error');
        setMessage(errorMsg);
        setTimeout(() => setMessage(''), 5000);
    }
};

const onNewMemberSignUp = () => {
    navigate("/generation-connect-app/auth/user/signup");
};

const onBackToHomepage = () => {
    navigate("/")
}

return (
    <GcSigningContainer>
    <ResponseMessage type={messageType} message={message} />
    <LogoImageContainer src={logo} alt="logo" />

    <PageHeader>User Login</PageHeader>

    <FormContainer onSubmit={handleSignInForm}>

        <InputRow>
            <InputRowGroup>
                <label htmlFor="emailId:"></label>
                <Input type="email" id="emailId" placeholder="Email address" value={emailId} onChange={(e) => setEmailId(e.target.value)}
                required></Input>
            </InputRowGroup>
        </InputRow>

        <InputRow>
            <InputRowGroup>
                <label htmlFor="password:"></label>
                <Input type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                ></Input>
            </InputRowGroup>
        </InputRow>

        <InputRow>
            <InputRowGroup>
                    <Input
                    type="checkbox"
                    id="showPassword"
                    style={{width: "20px", display: "flex"}}
                    checked={showPassword}
                    onChange={toggleShowPassword}></Input>
                    <label htmlFor="showPassword" style={{ fontSize: '15px', color: '#4f3d60' }}>Show Password</label>
            </InputRowGroup>
        </InputRow>

        <SigningButtonContainer>
            <ButtonRow>
                <ButtonGroup>
                        <Button type="submit">Login</Button>
                        <Button onClick={onBackToHomepage}>Back to Homepage</Button>
                </ButtonGroup>
            </ButtonRow>
        </SigningButtonContainer>

        <InputRow>
          <label style={{ fontSize: '15px', color: '#4f3d60', marginTop: "14px"}}>
            Not a member?  <a href="#signup" style={{ color: '#007bff', textDecoration: 'underline' }} onClick={onNewMemberSignUp}> Sign Up for free</a>
          </label>
        </InputRow>

    </FormContainer>
    </GcSigningContainer>
);
};

export default UserLogInPage;