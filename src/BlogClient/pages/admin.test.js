import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Admin from './Admin';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Admin', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should add a new post when form fields are filled and "Add Post" button is clicked', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const { getByPlaceholderText, getByRole } = render(<Admin />);

    fireEvent.change(getByPlaceholderText('Title'), { target: { value: 'New Post Title' } });
    fireEvent.change(getByPlaceholderText('Body'), { target: { value: 'New Post Body' } });
    fireEvent.change(getByPlaceholderText('Author'), { target: { value: 'John Doe' } });

    axios.post.mockResolvedValueOnce({ data: {} });

    fireEvent.click(getByRole('button', { name: 'Add Post' }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/posts', {
        title: 'New Post Title',
        body: 'New Post Body',
        author: 'John Doe',
      });
      expect(axios.get).toHaveBeenCalledWith('/api/posts');
    });
  });
});