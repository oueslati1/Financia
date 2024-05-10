import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './admin.css';

const Admin = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [editingPost, setEditingPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'admin') {
      fetchPosts();
    } else {
      navigate('/Blog');
    }
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleAddPost = async () => {
    try {
      await axios.post('/api/posts', newPost);
      setNewPost({ title: '', body: '', author: '' });
      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setNewPost({ title: post.title, body: post.body, author: post.author });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdatePost = async () => {
    try {
      await axios.put(`/api/posts/${editingPost.pid}`, newPost);
      setEditingPost(null);
      setNewPost({ title: '', body: '', author: '' });
      fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
    try {
      await axios.delete(`/api/posts/${postId}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
}
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Dashboard</h2>
      {!editingPost && (
        <div className="add-post-container">
          <h3 className="add-post-title">Add Post</h3>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newPost.title}
            onChange={handleInputChange}
            className="add-post-input"
          />
          <textarea
            name="body"
            placeholder="Body"
            value={newPost.body}
            onChange={handleInputChange}
            className="add-post-textarea"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={newPost.author}
            onChange={handleInputChange}
            className="add-post-input"
          />
          <button onClick={handleAddPost} className="add-post-button">
            Add Post
          </button>
        </div>
      )}
      {editingPost && (
        <div className="edit-post-container">
          <h3 className="edit-post-title">Edit Post</h3>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newPost.title}
            onChange={handleInputChange}
            className="edit-post-input"
          />
          <textarea
            name="body"
            placeholder="Body"
            value={newPost.body}
            onChange={handleInputChange}
            className="edit-post-textarea"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={newPost.author}
            onChange={handleInputChange}
            className="edit-post-input"
          />
          <button onClick={handleUpdatePost} className="edit-post-button">
            Update Post
          </button>
        </div>
      )}
      <div className="posts-container">
        <h3 className="posts-title">Posts</h3>
        {posts.map((post) => (
          <div key={post.pid} className="post-card">
              <div className="post-actions">
              <button onClick={() => handleEditPost(post)} className="post-button">
                <i className="fa-solid fa-pen"></i> <p> Edit</p>
              </button>
              <button onClick={() => handleDeletePost(post.pid)} className="post-button">
                <i className="fa-solid fa-trash"></i> <p> Delete</p>
              </button>
              </div>
            <h4 className="post-preview-title">{post.title}</h4>
            <p className="post-body">{post.body}</p>
            <p className="post-author">Author: {post.author}</p>
            <p className="post-date"> {new Date(post.date_created).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;