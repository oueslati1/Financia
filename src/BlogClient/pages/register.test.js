import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Register from './Register';


jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Register component', () => {
  test('should register a user successfully', async () => {
    const mockedNavigate = jest.fn();
    jest.mocked(useNavigate).mockReturnValue(mockedNavigate);

    const mockedResponse = {
      data: {
        message: 'User registered successfully',
      },
    };

    axios.post.mockResolvedValueOnce(mockedResponse);

    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText('Username:'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'testpassword' } });
    fireEvent.click(getByRole('button', { name: 'Register' })); 
    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/register', {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
      });
      expect(mockedNavigate).toHaveBeenCalledWith('/login');
    });
  });

  test('should display error message if fields are not filled', async () => {
    const { getByRole, getByText } = render(<Register />);
    
    fireEvent.click(getByRole('button', { name: 'Register' }));
    
    await waitFor(() => {
      expect(axios.post).not.toHaveBeenCalled(); // Make sure the API is not called
      expect(getByText('All fields must be filled')).toBeInTheDocument();
    });
  });
});