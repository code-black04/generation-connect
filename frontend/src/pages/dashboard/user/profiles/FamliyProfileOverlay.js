import React, { useState, useEffect } from 'react';
import { getPostsByFamilyTreeId, createPost } from './PostService.js';
import PostComments from './PostComments.js';
import useCookie from './../../../auth/useCookie';
import avatar from "../../../../default-avatar.png";
import { Content, PostContent, ActionContent, PostCard, Overlay, EmptyPostMessage, PostAreaWrapper, PostHelperText} from "./FamliyProfileOverlay.styles.js";
import { MediaService } from "../../../../component/post/MediaService.js";
import ViewMediaList from "../../../../component/post/ViewMediaList.js";
import AddPost from "../../../../component/post/AddPost.js";
import Notification from "../../../../component/recent-actions/Notification.js";
import { fetchFamilyTreeEvents } from '../../../../component/recent-actions/FamilyTreeEventService';
import ResponseMessage from '../../../../component/ResponseMessage.js';

const FamliyProfileOverlay = ({ onClose, familyTree, userRole }) => {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [error, setError] = useState('');
  const { token, decoded } = useCookie('accessToken');
  const [expandedComments, setExpandedComments] = useState({});
  const [notifications, setNotifications] = useState([]);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  
  useEffect(() => {
    if (familyTree?.familyTreeId) {
      loadPosts(familyTree.familyTreeId);
      loadEvents(familyTree.familyTreeId);
    }
  }, [familyTree]);

  async function loadEvents(familyTreeId) {
    try {
      const events = await fetchFamilyTreeEvents(familyTreeId);
      setNotifications(events);
      console.log('Events:', events);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  }

  const loadPosts = async (familyTreeId) => {
    setLoadingPosts(true);
    setError('');
    try {
      const result = await getPostsByFamilyTreeId(familyTreeId);
      const enriched = await Promise.all(result.map(async post => {
        const files = await MediaService.getFilesByMediaTypeId("family_profile_post_" + post.id);
        return { ...post, files };
      }));
      console.log("loadPosts:", enriched);
      setPosts(enriched);
    } catch (err) {
      console.error(err);
      //setError('Failed to load posts.', err);
    } finally {
      setLoadingPosts(false);
    }
  };

  const reload = async () => {
    loadPosts(familyTree.familyTreeId);
  }

  const handlePostSubmit = async (content) => {
    try {
      const response =  await createPost({
        familyTreeId: familyTree.familyTreeId,
        postContent: content,
        createdBy: decoded.sub,
        createdDate: new Date().toISOString().slice(0, 19),
      });
      setMessageType("success");
      setMessage("Post created successfully");
      return response;
    } catch (err) {
      console.error(err);
      setMessageType('error');
      setMessage("Failed to submit post.");
      throw err;
    }
  };

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  }


  if (!familyTree) return null;
  console.log("profileData : " + JSON.stringify(familyTree));
  return (
    <Overlay>
    <ResponseMessage type={messageType} message={message} />
      <Content>

      {(userRole === 'Owner' || userRole === 'Contributor') && (
          <>
            <div style={{
              display: 'flex-root',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '8px',
              width: '100%',
              margin: '0 auto'
            }}>
              <PostAreaWrapper>
                <PostHelperText>
                  New Post for <strong>{familyTree.familyTreeName || 'this family'}</strong>.<br />
                </PostHelperText>
                <AddPost
                  handlePostSubmit={handlePostSubmit}
                  reload={reload}
                  mediaType={"family_profile_post_"}
                  postAlias={`Share a family story, update, or memory..`}
                />
                <p style={{ fontSize: '0.85rem', color: '#4f3d60', marginTop: '2px', fontWeight: '0.50' , fontStyle: 'italic'}}>
                    Supported file formats: PDF, audio, video, JPG, JPEG, PNG, csv and text.
                </p>
              </PostAreaWrapper>
            </div>
          </>
        )}

        {loadingPosts && <p>Loading posts...</p>}
        <ResponseMessage type={messageType} message={message} />
        {!loadingPosts ? (
          posts.length === 0 ? (
            <EmptyPostMessage>
              <span className="emoji">📝</span> Nothing has been shared yet. Why not make the first post?
            </EmptyPostMessage>
          ) : (
            <EmptyPostMessage>
              <span className="emoji">📬</span> Here's what people have shared so far.
            </EmptyPostMessage>
          )
        ) : null}


        {posts.map((post, index) => (
          <PostCard
            key={index}
            style={
              {
                marginLeft: '0px',
                display: 'flex',
                flexDirection: 'column'
              }
            }>


            <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: '#555' }}>
              By &nbsp;&nbsp;
              <img
                src={avatar}
                alt="avatar"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  marginRight: '10px',
                  objectFit: 'cover',
                }}
              /> <strong style={{ color:'#407cac' }}>{post.createdBy}</strong>&nbsp; on {post.createdDate}
            </div>
            <PostContent>{post.postContent}</PostContent>
            <div>
              <ViewMediaList uploadFor={post} allowEdit={false} />
            </div>
            <button
              onClick={() => toggleComments(post.id)}
              style={{
                alignSelf: 'flex-end',
                background: 'transparent',
                border: 'none',
                color: '#407cac',
                cursor: 'pointer',
                marginTop: '1px',
                fontSize: '13px',
                padding: '2px',
              }}
            >
              {expandedComments[post.id] ? 'Hide Comments' : 'View Comments'}
            </button>

            {expandedComments[post.id] && <PostComments postId={post.id} familyTreeId={familyTree.familyTreeId} userRole={userRole} />}

          </PostCard>
        ))}
      </Content>
      <ActionContent>
        <p style={{textAlign: 'left', marginLeft: '40px', fontSize: '1rem'}}>Recent actions..</p>
        <Notification notifications={notifications} familyTree={familyTree} />
      </ActionContent>
    </Overlay>

  );
};

export default FamliyProfileOverlay;
