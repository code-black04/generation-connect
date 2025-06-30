import React, { useState } from "react";
import FamilyTreeService from "./FamilyTreeService.js";
import {
    FormContainer,
    FormGroup,
    Label,
    Input,
    TextArea,
    SubmitButton,
    RadioButtonContainer
} from "./FamilyTreeList.styles.js";
import { jwtDecode } from "jwt-decode";

function CreateFamilyTree({ onSuccess, showMessage}) {
    const [familyTreeName, setFamilyTreeName] = useState("");
    const [familyTreeDescription, setFamilyTreeDescription] = useState("");
    const [familyTreeAccessLevel, setFamilyTreeAccessLevel] = useState("PRIVATE");
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    };

    const token = getCookie("accessToken");
    const decodedToken = jwtDecode(token);
    const memberUserId = decodedToken.sub; // Extract user ID

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const familyTreeDTO = {
            familyTreeName,
            familyTreeDescription,
            familyTreeAccessLevel,
            memberUserId
        };

        try {
            const response = await FamilyTreeService.createFamilyTree(familyTreeDTO);
            onSuccess();
            if (response.status === 200) {
                showMessage('success', message);
                setTimeout(() => setMessage(''), 2000);
            }
        } catch (error) {
            setError('');
            let errorMsg = 'Failed to create family tree. Please try again.';

            if (error.status === 400) {
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
            showMessage('error', errorMsg);
            setTimeout(() => setMessage(''), 5000);
        }
    };
    return (
        <FormContainer>
            <h2>Create New Family Tree</h2>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Family Tree Name:</Label>
                    <Input
                        type="text"
                        placeholder="What's your family name?"
                        value={familyTreeName}
                        onChange={(e) => setFamilyTreeName(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                <Label>Description:</Label>
                <TextArea
                    placeholder="Anything you would like to add about your family?"
                    value={familyTreeDescription}
                    onChange={(e) => {
                    if (e.target.value.length <= 100) {
                        setFamilyTreeDescription(e.target.value);
                    }
                    }}
                    onPaste={(e) => {
                    const pastedText = e.clipboardData.getData('text');
                    const combined = familyTreeDescription + pastedText;
                    if (combined.length > 100) {
                        e.preventDefault();
                        const allowed = 100 - familyTreeDescription.length;
                        setFamilyTreeDescription(prev => prev + pastedText.slice(0, allowed));
                    }
                    }}
                />
                <p style={{ fontSize: '12px', color: '#666' }}>
                    {familyTreeDescription.length} / 100 characters
                </p>
                </FormGroup>
                <FormGroup>
                    <Label>Access Level:</Label>
                    <RadioButtonContainer>
                        <label>
                            <input
                                type="radio"
                                value="PRIVATE"
                                checked={familyTreeAccessLevel === "PRIVATE"}
                                onChange={() => setFamilyTreeAccessLevel("PRIVATE")}
                            />
                            Private
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="PUBLIC"
                                checked={familyTreeAccessLevel === "PUBLIC"}
                                onChange={() => setFamilyTreeAccessLevel("PUBLIC")}
                            />
                            Public
                        </label>
                    </RadioButtonContainer>
                </FormGroup>
                <SubmitButton type="submit">Create Family Tree</SubmitButton>
            </form>
        </FormContainer>
    );
}

export default CreateFamilyTree;
