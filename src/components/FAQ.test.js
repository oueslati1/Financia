import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FAQSection from './FAQ';

describe('FAQSection', () => {
    test('show the answer when the closed question is clicked', () => {
      render(<FAQSection />);
  
      // Get the first FAQ box
      const faqBox1 = screen.getByText('How long does each course take to complete?');
      const faqBox1Answer = screen.getByText('Our courses are self-paced, so this varies from person to person. However, you should expect to spend 30 minutes to an hour on each topic.');
  
      // Verify the initial state
      expect(faqBox1).toBeInTheDocument();
      expect(faqBox1Answer).not.toHaveClass('show');
  
      // Simulate clicking the question
      fireEvent.click(faqBox1);
  
      // Verify the updated state
      expect(faqBox1Answer).toHaveClass('show');
    });

    test('hide the answer when the open question is clicked', () => {
        render(<FAQSection />);
    
        // Get the first FAQ box
        const faqBox1 = screen.getByText('How long does each course take to complete?');
        const faqBox1Answer = screen.getByText('Our courses are self-paced, so this varies from person to person. However, you should expect to spend 30 minutes to an hour on each topic.');
    
        // Simulate clicking the question to open it
        fireEvent.click(faqBox1);
    
        // Verify the initial open state
        expect(faqBox1Answer).toHaveClass('show');
    
        // Simulate clicking the question again to close it
        fireEvent.click(faqBox1);
    
        // Verify the updated closed state
        expect(faqBox1Answer).not.toHaveClass('show');
      });
});