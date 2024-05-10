import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Quiz from './F1Quiz';

describe('Quiz component', () => {
  test('should display correct result when the user selects the correct answer', () => {
    const { getByText, getByRole } = render(<Quiz />);

    // Select the correct answer
    fireEvent.click(getByText('Costs that remain constant regardless of production level'));
    fireEvent.click(getByText('Check Answer'));

    // Assert that the correct result is displayed
    expect(getByText('Well Done!')).toBeInTheDocument();
    expect(getByText('You answered correctly.')).toBeInTheDocument();
  });

  test('should increase the total points when the user selects the correct answer', () => {
    const { getByText } = render(<Quiz />);

    // Select the correct answer
    fireEvent.click(getByText('Costs that remain constant regardless of production level'));
    fireEvent.click(getByText('Check Answer'));

    // Assert that the total points have increased
    expect(getByText((content) => content.startsWith('+5 Points!'))).toBeInTheDocument();
  });

  test('should display the badge when the user answers correctly', () => {
    const { getByText } = render(<Quiz />);

    // Select the correct answer
    fireEvent.click(getByText('Costs that remain constant regardless of production level'));
    fireEvent.click(getByText('Check Answer'));

    // Assert that the badge is displayed
    expect(getByText("You've earned the Explorer badge!")).toBeInTheDocument();
  });
});