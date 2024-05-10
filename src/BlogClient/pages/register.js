import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting registration form:', { username, email, password });

    // Check if any fields are empty
    if (!username || !email || !password) {
      setError('All fields must be filled');
      return;
    }

    try {
      const response = await axios.post('/api/register', { username, email, password });
      console.log('Registration response:', response.data);
      // Redirect the user to the login page or display a success message
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        {error && <p style={{color:'red'}}>{error}</p>}
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};
export default Register;