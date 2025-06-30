import React, { useState, useEffect } from 'react';
import { getPostsByPerson, createPost } from './PostService.js';
import PostComments from './PostComments.js';
import useCookie from './../../../auth/useCookie';
import avatar from "../../../../default-avatar.png";
import { CloseButton, PostContent, Content, TextArea, SubmitButton, PostCard, Overlay } from "./ProfileOverlay.styles.js";
import { EmptyPostMessage, PostAreaWrapper, PostHelperText } from './FamliyProfileOverlay.styles.js';
import AddPost from "../../../../component/post/AddPost.js";
import { MediaService } from "../../../../component/post/MediaService.js";
import ViewMediaList from "../../../../component/post/ViewMediaList.js";
import ResponseMessage from '../../../../component/ResponseMessage.js';

const ProfileOverlay = ({ onClose, profileData, userRole, familyTreeId }) => {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [error, setError] = useState('');
  const { token, decoded } = useCookie('accessToken');
  const [expandedComments, setExpandedComments] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');


  useEffect(() => {
    if (profileData?.id) {
      loadPosts(profileData.id);
    }
  }, [profileData]);

  console.log("PROFILE", profileData);

  const loadPosts = async (personId) => {
    setLoadingPosts(true);
    setError('');
    try {
      const result = await getPostsByPerson(personId);
      const enriched = await Promise.all(result.map(async post => {
        const files = await MediaService.getFilesByMediaTypeId("post_" + post.id);
        return { ...post, files };
      }));
      console.log("loadPosts:", enriched);
      setPosts(enriched);
    } catch (err) {
      console.error(err);
      //setError('Failed to load posts.');
    } finally {
      setLoadingPosts(false);
    }
  };

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  }

  const handlePostSubmit = async (postContent) => {
    if (!postContent.trim()) return;

    setSubmitting(true);
    try {
      const response =  await createPost({
        personId: profileData.id,
        familyTreeId: familyTreeId,
        postContent,
        userProfilePost : true,
        createdBy: decoded.sub,
        createdDate: new Date().toISOString().slice(0, 19),
      });

      setMessageType('success');
      setMessage("Post created successfully");
      return response;
    } catch (err) {
      console.error(err);
      setMessageType('error');
      setMessage("Unable to create post.");
    } finally {
      setSubmitting(false);
    }
  };

  const reload = async () => {
    loadPosts(profileData.id);
  }


  if (!profileData) return null;
  console.log("profileData : " + JSON.stringify(profileData));
  return (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <Content>
        <CloseButton onClick={onClose}>&times;</CloseButton>

        {(userRole === 'Owner' || userRole === 'Contributor') && (
          <>
            <div style={{
              display: 'flex-root',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '8px',
              width: '100%',
              margin: '0 auto'
            }}></div>
            <PostAreaWrapper style={{width: '100%'}}>
              <PostHelperText>
              New Post for <strong>{profileData?.data.firstName || 'this person'}</strong>.<br />
              </PostHelperText>
            <AddPost handlePostSubmit={handlePostSubmit} reload={reload}
              mediaType={"post_"}
              postAlias={`Write a memory, story, or fact about ${profileData?.data.firstName}..`} 
            />
            <p style={{ fontSize: '0.85rem', color: '#4f3d60', marginTop: '2px', fontWeight: '0.50' , fontStyle: 'italic'}}>
                Supported file formats: PDF, audio, video, JPG, JPEG, PNG, csv and text.
            </p>
            </PostAreaWrapper>
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

        {posts.map((post, index) =>
        (<PostCard
          key={index}
          style={{
            marginLeft: '0px',
            display: 'flex',
            flexDirection: 'column'
          }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '12px',
              color: '#555'
            }}
          >
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
            /> <strong style={{ color: '#407cac' }}>{post.createdBy}</strong>&nbsp; on {post.createdDate}
          </div>

          <PostContent>{post.postContent}</PostContent>
          <div>
            <ViewMediaList uploadFor={post} allowEdit={false} />
          </div>

          {/* </small> */}
          <button
            onClick={() => toggleComments(post.id)}
            style={{
              alignSelf: 'flex-end',
              background: 'transparent',
              border: 'none',
              color: '#407cac',
              cursor: 'pointer',
              fontSize: '13px',

            }}
          >
            {expandedComments[post.id] ? 'Hide Comments' : 'View Comments'}
          </button>

          {expandedComments[post.id] && <PostComments postId={post.id} familyTreeId={familyTreeId} userRole={userRole} />}

        </PostCard>
        ))}
      </Content>
    </Overlay>
  );
};

export default ProfileOverlay;
