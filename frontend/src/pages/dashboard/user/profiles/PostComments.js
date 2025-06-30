import React, { useEffect, useState } from 'react';
import useCookie from './../../../auth/useCookie';
import avatar from "../../../../default-avatar.png";
import ResponseMessage from "../../../../component/ResponseMessage.js";
import { API_BASE } from "Constants";
const PostComments = ({ postId, familyTreeId, userRole}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { token, decoded } = useCookie('accessToken');

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const loadComments = async () => {
    try {
      const res = await fetch(`${API_BASE}/comments/post/${postId}`, {
        credentials: 'include',
      });
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error('Failed to load comments', err);
    }
  };

  const submitComment = async () => {
    if (!newComment.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/comments/${familyTreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          postId: postId,
          commentContent: newComment,
          createdBy: decoded.sub,
          createdDate: new Date().toISOString().slice(0, 19),
        })
      });
      setMessageType('success');
      setMessage("Commented successfully");
      setNewComment('');
      await loadComments();
      
      return response;
    } catch (err) {
      console.error('Failed to submit comment', err);
      setMessageType('error');
      setMessage("Failed to comment on post.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const getRelativeTime = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return `${seconds}s ago`;
  };


  return (
    <div>
          <ResponseMessage type={messageType} message={message} />

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></div>
        <span style={{ padding: '0 10px', fontWeight: 'bold', fontSize: '14px', color: '#555' }}>Comments</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></div>
      </div>

      <div>
        {comments.map((c, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              padding: '10px 0',
              borderBottom: '1px solid #eee',
              fontSize: '13px',
            }}
          >


            <div style={{ flex: 1 }}>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '13.5px',
                  color: '#222',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                }}
              >
                <img
                  src={avatar}
                  alt="avatar"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    marginRight: '10px',
                    objectFit: 'cover',
                  }}
                />

                <span>
                  {c.createdBy}{' '}
                  <span style={{ fontWeight: 'normal', color: '#666' }}>
                    • {getRelativeTime(c.createdDate)}
                  </span>
                </span>
              </div>

              <div style={{ color: '#333', whiteSpace: 'pre-wrap', textAlign: 'left' }}>
                {c.commentContent}
              </div>
            </div>
          </div>
        ))}

      </div>
      {(userRole === 'Owner' || userRole === 'Contributor') && (
      <>
        <div style={{ display: 'flex'}}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={{ flex: 1, padding: '6px', fontSize: '13px' }}
          />
          <button onClick={submitComment} disabled={loading} style={{ marginLeft: '6px', marginRight: '6px' }}>
            Post
          </button>
        </div>
      </>
      )}
    </div>
  );
};

export default PostComments;
