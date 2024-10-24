import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/features/redux/store';
import CategoryPage from '@/features/category/categorieSection';

describe('CategoryPage Component', () => {
  test('displays loading state', () => {
    render(
      <Provider store={store}>
        <CategoryPage searchTerm="" />
      </Provider>
    );

    expect(screen.getByText(/loading categories/i)).toBeInTheDocument();
  });

  test('displays categories when fetched successfully', async () => {
    const mockCategories = [
      { id: 1, name: 'Electronics' },
      { id: 2, name: 'Books' },
    ];

   
    const mockStore = {
      getState: () => ({
        categories: {
          status: 'succeeded',
          categories: mockCategories,
          error: null,
        },
      }),
      subscribe: jest.fn(),
      dispatch: jest.fn(),
    };

    render(
      <Provider store={mockStore as any}> 
        <CategoryPage searchTerm="" />
      </Provider>
    );

   
    expect(screen.getByText(/Electronics/i)).toBeInTheDocument();
    expect(screen.getByText(/Books/i)).toBeInTheDocument();
  });

  test('displays error message when fetch fails', () => {
    // Create a mock store state with an error
    const mockStoreWithError = {
      getState: () => ({
        categories: {
          status: 'failed',
          categories: [],
          error: 'Failed to fetch categories',
        },
      }),
      subscribe: jest.fn(),
      dispatch: jest.fn(),
    };

    render(
      <Provider store={mockStoreWithError as any}> 
        <CategoryPage searchTerm="" />
      </Provider>
    );

   
    expect(screen.getByText(/failed to fetch categories/i)).toBeInTheDocument();
  });

});
