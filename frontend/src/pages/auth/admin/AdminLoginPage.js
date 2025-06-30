import React, {useState} from "react";
import logo from "../../../logo.png";
import { useNavigate } from 'react-router-dom';
import { GcSigningContainer, LogoImageContainer, FormContainer, InputRow, InputRowGroup, Input, SigningButtonContainer, ButtonGroup, ButtonRow, Button, PageHeader} from "./AdminLoginPage.styles.js"
import ResponseMessage from "../../../component/ResponseMessage.js";
import GcAdminSignInService from "./GcAdminSignInService.js";

function LogInForm () {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSignInForm = async (event) => {
        event.preventDefault();
        console.log('Form data:', { emailId, password});
        let encoded = btoa(password);
        try {
        const username = emailId;
        const isAdmin = true;
            const adminSignInData = {username, password: encoded, isAdmin};
            const signInresponse = await GcAdminSignInService.getUser(adminSignInData);
            
            if (signInresponse.status === 200) {
                setMessageType('success');
                setMessage('Sign-in successful! Redirecting...');
                setTimeout(() => navigate("/generation-connect-app/admin/dashboard"), 2000);
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
                errorMsg = errorData.errorMessageList[0].error;
            } else if (errorData && errorData.message) {
                errorMsg = errorData.message;
            }
        }

        setMessageType('error');
        setMessage(errorMsg);
        setTimeout(() => setMessage(''), 5000);
        }
    };

    const onBackToHomepage = () => {
        navigate("/")
    }

    return (
        <GcSigningContainer>
        <ResponseMessage type={messageType} message={message} />
        <LogoImageContainer src={logo} alt="logo" />
        <PageHeader>Admin Login</PageHeader>
        <FormContainer onSubmit={handleSignInForm}>
    
            <InputRow>
                <InputRowGroup>
                    <label htmlFor="emailId:"></label>
                    <Input type="email"
                    id="emailId"
                    placeholder="Email address"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
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
                    required></Input>
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
                        <label htmlFor="showPassword" style={{ fontSize: '15px', color: '#4f3d60'}}>Show Password</label>
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
    
        </FormContainer>
        </GcSigningContainer>
    );
};

export default LogInForm;