import React from 'react';
import { render, screen } from '@testing-library/react';
import { HashLink as Link } from 'react-router-hash-link';
import Navbar from './Navbar';

test('renders Navbar component', () => {
  render(<Navbar />);

  // logo 
  const logo = screen.getByRole('link', { name: '' });
  expect(logo).toBeInTheDocument();

  // menu links
  const homeLink = screen.getByRole('link', { name: 'Home' });
  const aboutLink = screen.getByRole('link', { name: 'About' });
  const coursesLink = screen.getByRole('link', { name: 'Courses' });
  const blogLink = screen.getByRole('link', { name: 'Blog' });

  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(coursesLink).toBeInTheDocument();
  expect(blogLink).toBeInTheDocument();
});
