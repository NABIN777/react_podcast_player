import { render, screen } from '@testing-library/react';
import React from 'react';
import Home from './Home';

describe('Home component', () => {
  it('renders without errors', () => {
    render(<Home />);
    // Assert that the component renders without errors
    expect(screen.getByTestId('home-container')).toBeInTheDocument();
  });

  it('renders music container when loaded', () => {
    render(<Home />);
    // Simulate the component being loaded
    const loadedSkeleton = screen.queryByTestId('home-skeleton');
    expect(loadedSkeleton).not.toBeInTheDocument();
    // Assert that the music container is rendered
    expect(screen.getByTestId('home-music-container')).toBeInTheDocument();
  });

  // You can write more tests for different scenarios and interactions
});
