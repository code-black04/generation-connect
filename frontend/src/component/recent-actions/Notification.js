import React, {useState} from 'react';
import styled, { keyframes } from 'styled-components';

const Timeline = ({ notifications, familyTree }) => {

  const [showAll, setShowAll] = useState(false);

  const visibleNotifications = showAll ? notifications : notifications.slice(0, 5);

  const formatDate = (iso) => {
    const d = new Date(iso);
    return `${d.toLocaleDateString('en-GB')}, ${d.toLocaleTimeString('en-GB', { hour12: true })}`;
  };

  const getMessage = (n) => {
    const treeName = familyTree?.familyTreeName || 'Unnamed Tree';
    const recordName = n.recordName || 'Unnamed';
  
    switch (n.tableName) {
      case 'Person':
        switch (n.actionType) {
          case 'ADD':
            return `The person "${recordName}" was added to the family tree "${treeName}".`;
          case 'UPDATE':
            return `The details of the person "${recordName}" were updated in the family tree "${treeName}".`;
          case 'DELETE':
            return `The person "${recordName}" was removed from the family tree "${treeName}".`;
        }
        break;
  
      case 'UserProfilePost':
        switch (n.actionType) {
          case 'ADD':
            return `A new user profile post was created in the family tree "${treeName}".`;
          case 'UPDATE':
            return `The user profile post "${recordName}" was updated in the family tree "${treeName}".`;
          case 'DELETE':
            return `The user profile post "${recordName}" was deleted from the family tree "${treeName}".`;
        }
        break;
  
      case 'FamilyProfilePost':
        switch (n.actionType) {
          case 'ADD':
            return `A new family profile post was created in the family tree "${treeName}".`;
          case 'UPDATE':
            return `The family profile post "${recordName}" was updated in the family tree "${treeName}".`;
          case 'DELETE':
            return `The family profile post "${recordName}" was deleted from the family tree "${treeName}".`;
        }
        break;
  
      case 'FamilyTree':
        switch (n.actionType) {
          case 'ADD':
            return `The family tree "${recordName}" was created.`;
          case 'UPDATE':
            return `The family tree "${recordName}" was updated.`;
          case 'DELETE':
            return `The family tree "${recordName}" was deleted.`;
        }
        break;
  
      case 'FamilyTreeUserAccess':
          return `Added a new member to the "${treeName}" family tree.`;

      case 'FamilyTreeInvite':
          return `Sent an invitation to join the "${treeName}" family tree.`;

      default:
          return `An update was made to the "${treeName}" family tree.`;
    }
  };
  
  

  return (
    <NotificationContainer>
      <TimelineLine />
      <TimelineStartLabel>Start</TimelineStartLabel>

      {notifications.length === 0 ? (
        <EmptyState>No recent actions</EmptyState>
      ) : (
        <> {visibleNotifications.map(n => (
          <NotificationItem key={n.id}>
            <Dot type={n.actionType.toLowerCase()}>
              {n.actionType === 'ADD' && '+'}
              {n.actionType === 'UPDATE' && '✎'}
              {n.actionType === 'DELETE' && '×'}
            </Dot>
            <Content>
              <TopRow>
                <UserName>From {n.createdBy}</UserName>
                <Timestamp>{formatDate(n.createdDate)}</Timestamp>
              </TopRow>
              <Separator />
              <Message>{getMessage(n)}</Message>
            </Content>
          </NotificationItem>
        ))
        }
        {notifications.length > 5 && (
          <ShowMoreButton onClick={() => setShowAll(prev => !prev)}>
            {showAll ? "Show less" : `Show ${notifications.length - 5} more...`}
          </ShowMoreButton>
        )}
        </>
        
        
      )}
    </NotificationContainer>
  );
};

const popIn = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  60% {
    transform: scale(1.3);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
  }
`;
const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const Dot = styled.div`
  position: absolute;
  top: 18px;
  left: -25px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${({ type }) =>
    type === 'add' ? '#3f7f4f' :
  type === 'update' ? '#eeb549' :
  type === 'delete' ? '#F44336' :
          '#888'};
  color: white;
  font-size: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  z-index: 3;
`;

const ShowMoreButton = styled.button`
  background: none;
  border: none;
  color: #8c6eae;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  margin: 10px 0 20px 10px;
  padding: 0;

  &:hover {
    color: #4f3d60;
    text-decoration: underline;
  }
`;


const NotificationContainer = styled.div`
  position: relative;
  max-width: 100%;
  margin: 20px auto;
  padding-left: 40px;
`;

const TimelineLine = styled.div`
  position: absolute;
  top: 20px;
  bottom: 20px;
  left: 20px;
  width: 2px;
  background-color: #8c6eae;
  z-index: 1;
`;

const NotificationItem = styled.div`
  position: relative;
  background: #f3eff9;
  border: 1px solid #e2dbe9;
  /* border-left: 4px solid #4f3d60;  // Dark Indigo */
  color: #4a4a55;
  box-shadow: 0 4px 10px rgba(79, 61, 96, 0.08);
  border-radius: 12px;
  padding: 16px 16px 16px 24px;
  margin-bottom: 16px;
  z-index: 2;

  &:first-child::before {
    content: '';
    position: absolute;
    top: 0;
    left: -28px; /* same as line - radius */
    height: 20px;
    width: 2px;
    background: #f9f9f9; /* match your background */
    z-index: 2;
  }

  &:last-child::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -28px;
    height: 20px;
    width: 2px;
    z-index: 2;
  }

  &:hover {
    background: #f1edf6;
    box-shadow: 0 6px 16px rgba(79, 61, 96, 0.12);
    transform: translateY(-1px);
    transition: all 0.2s ease;
  }
`;

const TimelineStartLabel = styled.div`
  position: absolute;
  bottom: 0;
  left: 8px;
  font-size: 25px;
  color:rgb(250, 249, 247);
  background-color: #4f3d60;
  padding: 2px 6px;
  border-radius: 6px;
  font-weight: bold;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  z-index: 5;
`;


const Content = styled.div`
  display: flex;
  flex-direction: column;
  color: #4a4a55;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 13px;
  color: #3f7f4f; 
`;

const Timestamp = styled.div`
&& {
  font-size: 11px;
  color: #999;
  font-style: italic;
}
`;

const Message = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #4a4a55;
  margin-top: 6px;
  padding-left: 4px;
`;

const Separator = styled.div`
  margin: 8px 0;
  height: 1px;
  background-color: #dcd5e7;
  width: 100%;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #999;
  font-size: 14px;
  font-style: italic;
`;

export default Timeline;
