import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './preview.css';

const BlogPreview = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        const sortedPosts = response.data.sort((a, b) => new Date(b.date_created) - new Date(a.date_created)).slice(0, 3);
        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const imageArray = [
    '../images/blog/purple.png',
    '../images/blog/6.png',
    '../images/blog/8.png',
  ];

  return (
    <div>
      <div className="blog-container" style={{ paddingBottom: '50px' }}>
        {posts.map((post, index) => (
          <div key={post.pid} className="blog-post">
            <Link to={`/post/${post.pid}`}>
              <img src={imageArray[index % imageArray.length]} alt="Random Image" className="blog-post-image" />
              <h3>{post.title}</h3>
              <p>{post.body.split('\n')[0]}</p> {/* Fetch only the first line */}
              <p>
                <i className={`fa-heart fa-solid`} style={{ color: '#e66e6e' }}></i> {post.likes}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPreview;