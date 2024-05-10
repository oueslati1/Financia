import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Login from './Login';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('login component', () => {
  it('should login a user successfully', async () => {
    const mockedNavigate = jest.fn();
    jest.mocked(useNavigate).mockReturnValue(mockedNavigate);

    const mockedResponse = {
      data: {
        role: 'user',
      },
    };

    axios.post.mockResolvedValueOnce(mockedResponse);

    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText('Username:'), { target: { value: 'hello' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'hello' } });
    fireEvent.click(getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/login', {
        username: 'hello',
        password: 'hello',
      });
      expect(mockedNavigate).toHaveBeenCalledWith('/Blog');
    });
  });
});