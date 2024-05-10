import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Quiz from './F1Quiz';


describe('Quiz component', () => {
  test('should display incorrect answer message when the user selects the incorrect answer', () => {
    const { getByText, getByRole } = render(<Quiz />);
    
    // Select an incorrect answer
    fireEvent.click(getByText('Costs that change over time'));
    fireEvent.click(getByText('Check Answer'));
    
    // Assert that the incorrect answer message is displayed
    expect(getByText('Not Quite')).toBeInTheDocument();
    expect(getByText('You answered incorrectly.')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });
});