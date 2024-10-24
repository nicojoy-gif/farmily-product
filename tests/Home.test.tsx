import React from 'react';
import { render, screen } from '@testing-library/react';
import { Home } from '@/features/components';
describe('Home Component', () => {
  test('renders Navbar and Hero components', () => {
    render(<Home />);
    
    expect(screen.getByText(/search products/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /categories/i })).toBeInTheDocument();
  });
});
