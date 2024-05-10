const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

// Create a new PostgreSQL pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: '',
  password: '',
  port: ,
});

// GET all posts
router.get('/api/posts', (req, res) => {
  pool.query('SELECT * FROM posts', (error, result) => {
    if (error) {
      console.error('Error executing query', error.stack);
      res.status(500).json({ error: 'Failed to fetch posts' });
    } else {
      res.json(result.rows);
    }
  });
});

// GET a single post
router.get('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  pool.query('SELECT * FROM posts WHERE pid = $1', [postId], (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Failed to fetch post' });
    } else if (result.rows.length === 0) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json(result.rows[0]);
    }
  });
});

// GET comments for a post
router.get('/api/posts/:postId/comments', (req, res) => {
  const postId = req.params.postId;
  pool.query('SELECT * FROM comments WHERE post_id = $1', [postId], (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Failed to fetch comments' });
    } else {
      res.json(result.rows);
    }
  });
});

// GET the logged-in user
router.get('/api/user', async (req, res) => {
  try {
    // Check if the user is logged in
    const user = await checkLoggedInUser(req);
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: 'User not logged in' });
    }
  } catch (error) {
    console.error('Error getting logged-in user:', error);
    res.status(500).json({ error: 'Error getting logged-in user' });
  }
});

const checkLoggedInUser = async (req) => {
  const userId = req.cookies.userId;
  if (userId) {
    const result = await pool.query('SELECT * FROM users WHERE uid = $1', [userId]);
    if (result.rows.length > 0) {
      return { username: result.rows[0].username };
    }
  }
  return null;
};

// Register endpoint
router.post('/api/register', async (req, res) => {
	const { username, email, password } = req.body;
  
	try {
	  // Check if the username or email is already taken
	  const usernameExists = await checkUsernameExists(username);
	  const emailExists = await checkEmailExists(email);
  
	  if (usernameExists || emailExists) {
		return res.status(400).json({ error: 'Username or email already taken' });
	  }
  
	  // Hash the password
	  const hashedPassword = await bcrypt.hash(password, 10);
  
	  // Insert the new user into the database
	  const result = await pool.query(
		'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
		[username, email, hashedPassword]
	  );
  
	  res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
	} catch (error) {
	  console.error('Error registering user:', error);
	  res.status(500).json({ error: 'Error registering user' });
	}
  });
  
  const checkUsernameExists = async (username) => {
	const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
	return result.rows.length > 0;
  };
  
  const checkEmailExists = async (email) => {
	const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
	return result.rows.length > 0;
  };

// Login endpoint
router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const hashedPassword = result.rows[0].password;
    const passwordMatches = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const role = result.rows[0].role;
    const userId = result.rows[0].uid;
    res.cookie('userId', userId, { httpOnly: true });
    res.json({ role });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Admin endpoints
router.post('/api/posts', async (req, res) => {
  const { title, body, author } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO posts (title, body, author, date_created) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [title, body, author]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Error creating post' });
  }
});
// PUT (update) an existing post
router.put('/api/posts/:id', async (req, res) => {
	const postId = req.params.id;
	const { title, body, author } = req.body;
	try {
	  await pool.query(
		'UPDATE posts SET title = $1, body = $2, author = $3 WHERE pid = $4',
		[title, body, author, postId]
	  );
	  const updatedPost = { pid: postId, title, body, author };
	  res.status(200).json(updatedPost);
	} catch (error) {
	  console.error('Error updating post:', error);
	  res.status(500).json({ error: 'Error updating post' });
	}
  });
  
  // DELETE a post
  router.delete('/api/posts/:id', async (req, res) => {
	const postId = req.params.id;
	try {
	  await pool.query('DELETE FROM posts WHERE pid = $1', [postId]);
	  res.status(204).send();
	} catch (error) {
	  console.error('Error deleting post:', error);
	  res.status(500).json({ error: 'Error deleting post' });
	}
  });

// User endpoints
router.post('/api/comments', async (req, res) => {
  const { postId, comment, author } = req.body;
  const userId = req.cookies.userId;
  try {
    // Check if the user is logged in
    const user = await checkLoggedInUser(req);
    if (!user) {
      return res.status(401).json({ error: 'User not logged in' });
    }

    // Insert the new comment into the database
    const result = await pool.query(
      'INSERT INTO comments (comment, author, user_id, post_id, date_created) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [comment, author, userId, postId]
    );

    res.status(201).json({ comment: result.rows[0] });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Error creating comment' });
  }
});

router.post('/api/likes', async (req, res) => {
  const postId = req.body.postId;
  try {
    // Increment the likes count for the post with the specified postId
    await pool.query('UPDATE posts SET likes = likes + 1 WHERE pid = $1', [postId]);
    // Fetch the updated likes count
    const result = await pool.query('SELECT likes FROM posts WHERE pid = $1', [postId]);
    const likes = result.rows[0].likes;
    res.json({ likes });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ error: 'Error liking post' });
  }
});

router.delete('/api/likes/:postId', async (req, res) => {
  const postId = req.params.postId;
  try {
    // Decrement the likes count for the post with the specified postId
    await pool.query('UPDATE posts SET likes = likes - 1 WHERE pid = $1', [postId]);
    // Fetch the updated likes count
    const result = await pool.query('SELECT likes FROM posts WHERE pid = $1', [postId]);
    const likes = result.rows[0].likes;
    res.json({ likes });
  } catch (error) {
    console.error('Error unliking post:', error);
    res.status(500).json({ error: 'Error unliking post' });
  }
});

module.exports = router;
