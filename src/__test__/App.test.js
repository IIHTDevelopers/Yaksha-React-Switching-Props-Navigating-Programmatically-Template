import React from 'react';
import { getAllByText, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import '@testing-library/jest-dom';

describe('boundary', () => {
  test('AppComponent boundary renders Header component', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(getByText(/header/i)).toBeInTheDocument();
  });

  test('AppComponent boundary renders Home component for root path', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(getByText(/home/i)).toBeInTheDocument();
  });

  test('AppComponent boundary renders TaskDetail component for /task-detail/:taskId path', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/task-detail/1']}>
        <App />
      </MemoryRouter>
    );
    expect(getByText(/task detail/i)).toBeInTheDocument();
  });

  test('AppComponent boundary renders TaskEdit component for /edit-task/:taskId path', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/edit-task/1']}>
        <App />
      </MemoryRouter>
    );
    expect(getByText(/edit task/i)).toBeInTheDocument();
  });
});
