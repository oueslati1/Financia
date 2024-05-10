import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import axios from 'axios';
import Post from './Post';

jest.mock('axios');

describe('Post component', () => {
  test('like counter should update when post is liked or unliked', async () => {
    const postId = '1234';

    // Mock the initial data fetching
    axios.get.mockResolvedValueOnce({
      data: {
        id: postId,
        title: 'Test Post',
        author: 'Test Author',
        date_created: new Date().toISOString(),
        body: 'Test post content',
        likes: '10',
      },
    });
    axios.get.mockResolvedValueOnce({ data: [] });
    axios.get.mockResolvedValueOnce({ data: { username: 'testuser' } });

    // Mock the like/unlike actions
    axios.post.mockResolvedValueOnce({ data: { likes: '11' } });
    axios.delete.mockResolvedValueOnce({ data: { likes: '10' } });

    const { getByTestId, getByText } = render(
      <MemoryRouter initialEntries={[`/posts/${postId}`]}>
        <Routes>
          <Route path="/posts/:postId" element={<Post />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the post data to be fetched
    await waitFor(() => {
      expect(getByText('Test Post')).toBeInTheDocument();
    });

    // Get the like button and click it
    const likeButton = getByTestId('like-button');
    expect(getByText('10')).toBeInTheDocument();

    // Click the like button
    fireEvent.click(likeButton);
    await waitFor(() => {
      expect(getByText('11')).toBeInTheDocument();
    });

    // Click the like button again to unlike the post
    fireEvent.click(likeButton);
    await waitFor(() => {
      expect(getByText('10')).toBeInTheDocument();
    });
  });

  test('should add a comment to the post', async () => {
    const postId = '1234';
    const commentText = 'Test comment';
    const username = 'hi';
    const password = 'hi';

    // Mock the initial data fetching
    axios.get.mockResolvedValueOnce({
      data: {
        id: postId,
        title: 'Test Post',
        author: 'Test Author',
        date_created: new Date().toISOString(),
        body: 'Test post content',
        likes: 10,
      },
    });
    axios.get.mockResolvedValueOnce({ data: [] });
    axios.get.mockResolvedValueOnce({ data: { username } });

    // Mock the comment posting
    axios.post.mockResolvedValueOnce({
      data: {
        comment: {
          id: '1',
          postId,
          comment: commentText,
          author: username,
          date_created: new Date().toISOString(),
        },
      },
    });

    const { getByPlaceholderText, getByText, getByRole } = render(
      <MemoryRouter initialEntries={[`/posts/${postId}`]}>
        <Routes>
          <Route path="/posts/:postId" element={<Post />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the post data to be fetched
    await waitFor(() => {
      expect(getByText('Test Post')).toBeInTheDocument();
    });

    // Mock the login process
    axios.get.mockResolvedValueOnce({ data: { username, password } });

    // Wait for the comment input to appear
    await waitFor(() => {
      const commentInput = getByPlaceholderText('Enter your comment');
      expect(commentInput).toBeInTheDocument();

      // Fill in the comment input and click the "Add Comment" button
      fireEvent.change(commentInput, { target: { value: commentText } });
      const addCommentButton = getByRole('button', { name: 'Add Comment' });
      fireEvent.click(addCommentButton);
    });

    // Wait for the comment to be added
    await waitFor(() => {
      expect(getByText(commentText)).toBeInTheDocument();
      expect(getByText(`Author: ${username}`)).toBeInTheDocument();
    });
  });
});





