import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import About from './About';

describe('About', () => {
  it('renders the component correctly', () => {
    render(<About />);

    // Assert that the "About Us" title is rendered
    const aboutUsTitle = screen.getByText('About Us');
    expect(aboutUsTitle).toBeInTheDocument();

    // Assert that the "Background" section is rendered
    const backgroundTitle = screen.getByText('Background');
    expect(backgroundTitle).toBeInTheDocument();

    const backgroundContent = screen.getByText(
      'As the UK faces a cost-of-living crisis, despite forecasts of a decreasing inflation rate, the economic data released in the previous weeks reveals that the YoY inflation rate remains at 6.7%. Moreover, the soaring high interest rates benchmarked by the Bank of England are maintained at a 15-year high of 5.25%. This current economic situation has presented numerous challenges for start-ups and small businesses within the UK making it more difficult for them to access funding and deal with business expenses.'
    );
    expect(backgroundContent).toBeInTheDocument();

    // Assert that the "Project Aims" section is rendered
    const projectAimsTitle = screen.getByText('Project Aims');
    expect(projectAimsTitle).toBeInTheDocument();

    const projectAimsContent = screen.getByText(
      'Our aim is to help businesses understand the cost of doing business in London. To do this, we will build a website that will help improve financial literacy through educational content. Users will learn about 3 keys of the topic costs, which are fixed costs, variable costs and costs of starting the business. The content will be engaging as it will be in both written and video form, which users will then be tested on to ensure they understand. The case studies section will consist of a series of interviews with established businesses who will give advice, which in conjunction with the learning content, will help equip users with the skills required to make better financial choices.'
    );
    expect(projectAimsContent).toBeInTheDocument();
  });
});