import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './blog.css';

const Blog = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('/api/posts')
      .then((res) => {
        const sortedPosts = res.data.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
        setPosts(sortedPosts);
      })
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const imageArray = [
    '../images/blog/purple.png',
    '../images/blog/2.png',
    '../images/blog/3.png',
    '../images/blog/4.png',
    '../images/blog/5.png',
    '../images/blog/6.png',
    '../images/blog/7.png',
    '../images/blog/8.png'
  ];

  return (
    <div>
      <h2 className="blog-top-title">Blog</h2>
      <p className="blog-top-heading">Find all of our latest stories to stay updated.</p>
      <div className="blog-container">
        {posts.map((post, index) => (
          <div key={post.pid} className="blog-post">
            <Link to={`/post/${post.pid}`}>
            <img src={imageArray[index % imageArray.length]} alt="Random Image" className="blog-post-image" />
              <div className="blog-post-header">
                <h3>{post.title}</h3>
              </div>
              <div className="blog-post-footer">
                <p className="post-details">Author: {post.author}</p>
                <p className="post-date">{new Date(post.date_created).toLocaleDateString()}</p>
                <p>
                  <i className="fa fa-heart" style={{ color: '#e66e6e' }}></i> {post.likes}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;