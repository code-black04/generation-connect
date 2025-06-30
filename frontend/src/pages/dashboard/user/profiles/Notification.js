import React from 'react';
import styled, { keyframes } from 'styled-components';

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
  top: 10px;
  left: -30px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ type }) =>
    type === 'add' ? '#4CAF50' :
      type === 'update' ? '#FF9800' :
        type === 'delete' ? '#F44336' :
          '#888'};
  color: white;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const NotificationContainer = styled.div`
  position: relative;
  max-width: 100%;
  margin: 20px auto;
  padding-left: 40px; /* smaller left padding */
`;

const TimelineLine = styled.div`
  position: absolute;
  top: 20px; /* align with first dot */
  bottom: 20px; /* stops above last dot */
  left: 20px;
  width: 2px;
  background-color: #555;
  z-index: 1;
`;

const NotificationItem = styled.div`
  position: relative;
  background: #333;
  border-radius: 8px;
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
    background: #f9f9f9;
    z-index: 2;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between; /* << this aligns user left, date right */
  align-items: center;
  margin-bottom: 6px;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: #4FC3F7; /* light blue */
`;

const Timestamp = styled.div`
&& {
  font-size: 10px;
  color: #999;
  font-style: italic;
}
`;

const Message = styled.div`
  font-size: 14px;
  line-height: 1.4;
  color: #eee;
`;

const Separator = styled.div`
  margin: 8px 0;
  height: 1px;
  background-color: #555;
  width: 100%;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #aaa;
  font-size: 14px;
  font-style: italic;
`;


const Timeline = ({ notifications, familyTree }) => {
  const formatDate = (iso) => {
    const d = new Date(iso);
    return `${d.toLocaleDateString('en-GB')}, ${d.toLocaleTimeString('en-GB', { hour12: true })}`;
  };

  const getMessage = (n) => {
    const tree = familyTree?.familyTreeName || 'Unknown Tree';
    const name = n.recordName || 'Unknown';
    
    switch (n.tableName) {
      case 'Person':
        if (n.actionType === 'ADD') return `person ${name} was added to tree '${tree}'.`;
        if (n.actionType === 'UPDATE') return `person ${name} was updated for tree '${tree}'.`;
        if (n.actionType === 'DELETE') return `person ${name} was deleted from tree '${tree}'.`;
        break;
      case 'UserProfilePost':
        if (n.actionType === 'ADD') return `A new user profile post was added for tree '${tree}'.`;
        if (n.actionType === 'UPDATE') return `user profile post ${name} was updated for tree '${tree}'.`;
        if (n.actionType === 'DELETE') return `user profile post ${name} was deleted for tree '${tree}'.`;
        break;
      case 'FamilyProfilePost':
        if (n.actionType === 'ADD') return `A new family profile post was added for tree '${tree}'.`;
        if (n.actionType === 'UPDATE') return `family profile post ${name} was updated for tree '${tree}'.`;
        if (n.actionType === 'DELETE') return `family profile post ${name} was deleted for tree '${tree}'.`;
        break;
      case 'FamilyTree':
        if (n.actionType === 'ADD') return `A new family tree '${name}' was created.`;
        if (n.actionType === 'UPDATE') return `family tree '${name}' was updated.`;
        if (n.actionType === 'DELETE') return `family tree '${name}' was deleted.`;
        break;
      default:
        return `${n.actionType} on ${n.tableName}.`;
    }
  };

  return (
    <NotificationContainer>
      <TimelineLine />

      {notifications.length === 0 ? (
        <EmptyState>No recent actions</EmptyState>
      ) : (
        notifications.map(n => (
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
      )}
    </NotificationContainer>
  );
};

export default Timeline;
