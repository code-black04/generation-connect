import React, {useState} from "react";
import logo from '../../../../logo.png';
import { GcSigningContainer, LogoImageContainer, FormContainer, InputRow, InputRowGroup, Input, SigningButtonContainer, ButtonGroup, ButtonRow, Button, PageHeader} from "../login/UserLogInPage.styles.js";
import GcUserSignUpService from "./GcUserSignUpService.js";
import { useNavigate } from 'react-router-dom';
import ResponseMessage from "../../../../component/ResponseMessage.js";

function UserSignUpPage (){

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');


    const navigate = useNavigate();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSignupForm = async (event) => {
        event.preventDefault();

        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d)(?=.*[^a-zA-Z0-9]).{8,30}$/;

        if (!passwordPattern.test(password)) {
            setMessageType('error');
            setMessage(
                "Password must be 8-30 characters long and include at least:\n• 1 uppercase letter\n• 1 lowercase letter\n• 2 digits\n• 1 special character"
            );
            setTimeout(() => setMessage(''), 4000);
            return;
        }
        const userSignUpData = {emailId, firstName, lastName, dateOfBirth, password};

        try {
            const newUserResponse = await GcUserSignUpService.createUser(userSignUpData);
            const responseBody = await newUserResponse.json();
            console.info(responseBody);
            console.info(newUserResponse);

            if (newUserResponse.ok) {
                setMessageType('success');
                setMessage('Signup successful! Redirecting...');
                setTimeout(() => navigate("/generation-connect-app/auth/user/login"), 2000);
            }
            else {
                setMessageType('error');
                if (responseBody.errorMessageList && responseBody.errorMessageList.length > 0) {
                    setMessage(responseBody.errorMessageList[0].error);
                    setTimeout(() => {
                        setMessage('');
                      }, 5000);
                  } else {
                    setMessage(responseBody.responseMessage);
                    setTimeout(() => {
                        setMessage('');
                      }, 5000);
                  }
            }
        } catch (error) {
            setMessageType('error');
            setMessage('An unexpected error occurred. Please try again.');
            console.error('Error adding user: ', error);
        }
    }

    const onBackToHomepage = () => {
        navigate("/")
    }

    return (
        <GcSigningContainer>
            <ResponseMessage type={messageType} message={message} />
            <LogoImageContainer src={logo} alt="logo" />

            <PageHeader>New Member Signup</PageHeader>

            <FormContainer onSubmit={handleSignupForm}>
                <InputRow>
                    <InputRowGroup>
                        <label htmlFor="emailId:"></label>
                        <Input
                        type="email"
                        id="emailId"
                        placeholder="Email address"
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                        required></Input>
                    </InputRowGroup>
                </InputRow>

                <InputRow>
                    <InputRowGroup>
                        <label htmlFor="firstName:"></label>
                        <Input
                        type="text"
                        id="firstName"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required></Input>
                    </InputRowGroup>

                    <InputRowGroup>
                        <label htmlFor="lastName:"></label>
                        <Input
                        type="text"
                        id="lastName"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required></Input>
                    </InputRowGroup>
                </InputRow>


                <InputRow>
                    <InputRowGroup>
                        <label htmlFor="dateOfBirth:"></label>
                        <Input
                        type="date"
                        id="dateOfBirth"
                        placeholder="Date of Birth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        max={new Date().toISOString().split("T")[0]}
                        required></Input>
                    </InputRowGroup>
                </InputRow>
        
                <InputRow>
                    <InputRowGroup>
                        <label htmlFor="password:"></label>
                        <Input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        style={{width: "100%", display: "flex", flexWrap: "wrap"}}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required></Input>
                    </InputRowGroup>

                    <InputRowGroup>
                            <Input
                            type="checkbox"
                            id="showPassword"
                            style={{width: "10%", display: "flex"}}
                            checked={showPassword}
                            onChange={toggleShowPassword}></Input>
                            <label htmlFor="showPassword" style={{ fontSize: '15px', color: "black"}}>Show Password</label>
                    </InputRowGroup>
                </InputRow>
                <SigningButtonContainer>
                <ButtonGroup>
                    <ButtonRow>
                        <Button type="submit">Create Account</Button>
                        <Button onClick={onBackToHomepage}>Back to Homepage</Button>
                    </ButtonRow>
                </ButtonGroup>
                </SigningButtonContainer>
            </FormContainer>
        </GcSigningContainer>
    );
}
export default UserSignUpPage;