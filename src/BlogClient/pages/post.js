import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './post.css';

const Post = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postRes = await axios.get(`/api/posts/${postId}`);
        setPost(postRes.data);
        setLikes(postRes.data.likes);
        setHasLiked(checkIfLiked());

        const commentsRes = await axios.get(`/api/posts/${postId}/comments`);
        setComments(commentsRes.data);

        // Check if the user is logged in
        const user = await getLoggedInUser();
        setUser(user);
      } catch (error) {
        console.error('Error fetching post and comments:', error);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  const getLoggedInUser = async () => {
    try {
      const res = await axios.get('/api/user');
      return res.data;
    } catch (error) {
      console.error('Error getting logged-in user:', error);
      return null;
    }
  };

  const checkIfLiked = () => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    return likedPosts.includes(postId);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleComment = async () => {
    if (!user) {
      // Prompt the user to log in
      navigate('/login');
      return;
    }

    try {
      const res = await axios.post('/api/comments', {
        postId,
        comment,
        author: user.username,
      });
      setComments([...comments, res.data.comment]);
      setComment('');
    } catch (error) {
      console.error('Error commenting on post:', error);
    }
  };

  const handleLike = async () => {
    try {
      let res;
      if (hasLiked) {
        // Unlike the post
        res = await axios.delete(`/api/likes/${postId}`);
        setLikes(res.data.likes);
        setHasLiked(false);

        // Remove the postId from the list of liked posts
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
        const updatedLikedPosts = likedPosts.filter((id) => id !== postId);
        localStorage.setItem('likedPosts', JSON.stringify(updatedLikedPosts));
      } else {
        // Like the post
        res = await axios.post('/api/likes', {
          postId,
        });
        setLikes(res.data.likes);
        setHasLiked(true);

        // Add the postId to the list of liked posts
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
        likedPosts.push(postId);
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-container">
      <div className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-author">Author: {post.author}</p>
        <p className="post-date"> {new Date(post.date_created).toLocaleDateString()}</p>
      </div>
      <div className="post-content">
        <p>{post.body}</p>
      </div>
      <div className="like-container">
        <span className="like-button" onClick={handleLike} data-testid="like-button">
          <p>
            <i className={`fa-heart ${hasLiked ? 'fa-solid' : 'fa-regular'}`} style={{ color: '#e66e6e' }}></i>{' '}
            {likes}
          </p>
        </span>
      </div>
      <div className="comments-container">
        <h3>Comments</h3>
        <div className="comment-input">
          {user ? (
            <>
              <input
                type="text"
                placeholder="Enter your comment"
                value={comment}
                onChange={handleCommentChange}
                className="comment-textarea"
              />
              <button onClick={handleComment} className="comment-button">
                Add Comment
              </button>
            </>
          ) : (
            <div>
              <p style={{fontStyle:'italic'}}>Please login to comment on posts.</p>
            </div>
          )}
        </div>
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                <p className="comment-author">Author: {comment.author}</p>
                <p className="comment-date">{new Date(comment.date_created).toLocaleString()}</p>
              </div>
              <p className="comment-text">{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;