import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Hero } from '@/features/header'; 

describe('Hero Component', () => {
  test('renders search input', () => {
    const mockOnSearch = jest.fn();
    render(<Hero onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText(/search products/i);
    expect(input).toBeInTheDocument(); 
  });

  test('calls onSearch when input changes', () => {
    const mockOnSearch = jest.fn();
    render(<Hero onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText(/search products/i);
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });
});
