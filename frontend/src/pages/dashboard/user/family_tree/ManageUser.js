import React, { useState, useEffect } from "react";
import {
    ManageUserFormContainer,
    ManageUserStyledForm,
    ManageUserStyledInput,
    ManageUserStyledButton,
    ManageUserToggleButtonGroup,
    ManageUserToggleButton,
    UserList,
    UserRow,
    UserIdText,
    RoleActionsRow,
    UpdateRoleButton,
    ConfirmModalOverlay,
    ConfirmModal,
    DeleteRoleButton
} from "./FamilyTreeList.styles.js";
import { Trash2 } from "lucide-react";
import FamilyTreeService from "./FamilyTreeService";
import ResponseMessage from "../../../../component/ResponseMessage.js";

const ManageUser = ({ familyTreeId, memberAddedBy, onClose}) => {
    const [addedMemberUserId, setAddedMemberUserId] = useState('');
    const [role, setRole] = useState('Owner');  // Default role
    const [userList, setUserList] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState({});
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const fetchUsers = async (e) => {
        if (!familyTreeId) return;
        try {
            const response = await FamilyTreeService.getFamilyTreeUsers(familyTreeId);
            setUserList(response || []);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [familyTreeId]);

    useEffect(() => {
}, []);


    const handleAddUser = async (e) => {
        e.preventDefault();

        const action = e.nativeEvent.submitter.value;

        if (!familyTreeId || !memberAddedBy) {
            setMessageType("error");
            setTimeout(() => {
                setMessage('');
                setMessageType('');
            }, 6000);
            return;
        }
    
        if (!addedMemberUserId || !role) {
            setMessage("Please provide user ID and role.");
            setMessageType("error");
            setTimeout(() => {
                setMessage('');
                setMessageType('');
            }, 6000);
            return;
        }

        try {
            if (action === "add") {
                await FamilyTreeService.addUserToFamilyTree(
                    familyTreeId,
                    addedMemberUserId,
                    role,
                    memberAddedBy
                );
                setMessage("User added successfully.");
                setMessageType("success");
                setTimeout(() => {
                    setMessage('');
                    setMessageType('');
                }, 6000);
            } else if (action === "invite") {
                await FamilyTreeService.sendInviteLink(
                    familyTreeId,
                    addedMemberUserId,
                    role,
                    memberAddedBy
                );
                setMessage("Invite link sent successfully.");
                setMessageType("success");
                setTimeout(() => {
                    setMessage('');
                    setMessageType('');
                }, 6000);                
            }

            setAddedMemberUserId('');
            setRole('Owner');
            fetchUsers();
        } catch (error) {
            console.error("ERROR", error);

            let errorMsg = 'Something went wrong.. Please try again.';

            if (error instanceof Error && error.message) {
                errorMsg = error.message;
            } else if (
                error.data &&
                Array.isArray(error.data.errorMessageList) &&
                error.data.errorMessageList.length > 0
            ) {
                errorMsg = error.data.errorMessageList[0]?.error;
            } else if (error.data && error.data.message) {
                errorMsg = error.data.message;
            }

            setMessageType('error');
            setMessage(errorMsg);
            setTimeout(() => setMessage(''), 6000);
        }
    };

    const handleDeleteUser = async (addedMemberUserId, role) => {
        if (!familyTreeId || !memberAddedBy) return;

        try {
            const message = await FamilyTreeService.deleteUserFromFamilyTree(
                familyTreeId,
                addedMemberUserId,
                memberAddedBy
            );
            setMessage("User removed successfully.");
            setMessageType("success");
            setTimeout(() => {
                setMessage('');
                setMessageType('');
            }, 6000);
            fetchUsers();
        } catch (error) {
            console.error("ERROR", error);

            let errorMsg = 'Something went wrong.. Please try again.';

            if (error instanceof Error && error.message) {
                errorMsg = error.message;
            } else if (
                error.data &&
                Array.isArray(error.data.errorMessageList) &&
                error.data.errorMessageList.length > 0
            ) {
                errorMsg = error.data.errorMessageList[0]?.error;
            } else if (error.data && error.data.message) {
                errorMsg = error.data.message;
            }

            setMessageType('error');
            setMessage(errorMsg);
            setTimeout(() => setMessage(''), 6000);
        }
    };


    return (
        <ManageUserFormContainer>
            <ResponseMessage type={messageType} message={message} />
            <div 
                style={{
                    background: "rgba(255, 255, 255, 0.6)",
                    padding: '16px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                    backdropFilter: 'blur(3px)',
                    WebkitBackdropFilter: 'blur(3px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
            >
                <h3 style={{fontWeight: '600', color: '#4f3d60', textAlign: 'left' }}>  Add or Invite a Family Member to This Tree – Pick Their Role </h3>
                <ManageUserStyledForm onSubmit={handleAddUser}>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                    <ManageUserStyledInput
                    type="text"
                    value={addedMemberUserId}
                    onChange={e => setAddedMemberUserId(e.target.value)}
                    placeholder="Enter email ID"
                    required
                    />
                    <ManageUserToggleButtonGroup>
                    <ManageUserToggleButton
                        type="button"
                        onClick={() => setRole('Owner')}
                        isActive={role === 'Owner'}
                    >
                        Owner
                    </ManageUserToggleButton>
                    <ManageUserToggleButton
                        type="button"
                        onClick={() => setRole('Contributor')}
                        isActive={role === 'Contributor'}
                    >
                        Contributor
                    </ManageUserToggleButton>
                    <ManageUserToggleButton
                        type="button"
                        onClick={() => setRole('Viewer')}
                        isActive={role === 'Viewer'}
                    >
                        Viewer
                    </ManageUserToggleButton>
                    </ManageUserToggleButtonGroup>
                </div>

                {/* Second row: Action buttons */}
                <div style={{ display: "flex", gap: "10px" }}>
                    <ManageUserStyledButton type="submit" name="action" value="add">
                    Add to Tree
                    </ManageUserStyledButton>
                    <ManageUserStyledButton type="submit" name="action" value="invite">
                    Send Email Invite
                    </ManageUserStyledButton>
                </div>
                </div>

                </ManageUserStyledForm>
            </div>

            <h3 style={{ fontWeight: '600', color: '#444', textAlign: 'left' }}> Current Members of the tree </h3>

            <UserList>
                {userList.map((user, index) => {
                    const role = selectedRoles[user.addedMemberUserId] || user.role;

                    const handleUpdate = async () => {
                        try {
                            const message = await FamilyTreeService.updateUserRole(familyTreeId, user.addedMemberUserId, role, memberAddedBy);
                            setMessage("User role updated successfully");
                            setMessageType("success");
                            setTimeout(() => {
                                setMessage('');
                                setMessageType('');
                            }, 6000);
                            fetchUsers(); // Refresh after update
                        } catch (error) {
                            let errorMsg = 'Something went wrong.. Please try again.';

                            if (error instanceof Error && error.message) {
                                errorMsg = error.message;
                            } else if (
                                error.data &&
                                Array.isArray(error.data.errorMessageList) &&
                                error.data.errorMessageList.length > 0
                            ) {
                                errorMsg = error.data.errorMessageList[0]?.error;
                            } else if (error.data && error.data.message) {
                                errorMsg = error.data.message;
                            }

                            setMessageType('error');
                            setMessage(errorMsg);
                            setTimeout(() => setMessage(''), 6000);
                        }
                    };

                    return (
                        <UserRow key={user.addedMemberUserId} index={index}>
                            <UserIdText>{user.addedMemberUserId}</UserIdText>
                            <RoleActionsRow>
                                <ManageUserToggleButton
                                    type="button"
                                    onClick={() => setSelectedRoles(prev => ({
                                        ...prev,
                                        [user.addedMemberUserId]: 'Owner'
                                    }))}
                                    isActive={role === 'Owner'}
                                >
                                    Owner
                                </ManageUserToggleButton>
                                <ManageUserToggleButton
                                    type="button"
                                    onClick={() => setSelectedRoles(prev => ({
                                        ...prev,
                                        [user.addedMemberUserId]: 'Contributor'
                                    }))}
                                    isActive={role === 'Contributor'}
                                >
                                    Contributor
                                </ManageUserToggleButton>
                                <ManageUserToggleButton
                                    type="button"
                                    onClick={() => setSelectedRoles(prev => ({
                                        ...prev,
                                        [user.addedMemberUserId]: 'Viewer'
                                    }))}
                                    isActive={role === 'Viewer'}
                                >
                                    Viewer
                                </ManageUserToggleButton>
                                <UpdateRoleButton
                                onClick={handleUpdate}
                                disabled={role === user.role}
                                title={role === user.role ? "No changes to update" : "Save changes"}>
                                    Update
                                </UpdateRoleButton>

                                <DeleteRoleButton
                                style={{ backgroundColor: "#ffdddd", color: "#b00020", marginLeft: "0.5rem" }}
                                onClick={() => {
                                    setUserToDelete({ addedMemberUserId: user.addedMemberUserId, role: user.role });
                                    setShowConfirmModal(true);
                                }}
                                >
                                <Trash2 
                                size={20} 
                                style={{ color: "#d62828", cursor: "pointer" }}
                                />
                                </DeleteRoleButton>
                            </RoleActionsRow>
                        </UserRow>
                    );
                })}
            </UserList>

        {showConfirmModal && userToDelete && (
            <ConfirmModalOverlay>
                <ConfirmModal>
                    <p>Are you sure you want to remove <strong>{userToDelete.addedMemberUserId}</strong> from this tree?</p>
                    <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                        <button onClick={() => setShowConfirmModal(false)}>Cancel</button>
                        <button
                            style={{ backgroundColor: "#d62828", color: "white" }}
                            onClick={async () => {
                                await handleDeleteUser(userToDelete.addedMemberUserId, userToDelete.role);
                                setShowConfirmModal(false);
                                setUserToDelete(null);
                            }}
                        >
                            Confirm
                        </button>
                    </div>
                </ConfirmModal>
            </ConfirmModalOverlay>
        )}


        </ManageUserFormContainer>
    );
};

export default ManageUser;
