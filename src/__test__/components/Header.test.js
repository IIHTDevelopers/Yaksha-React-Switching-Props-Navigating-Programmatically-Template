import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../components/Header';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('boundary', () => {
    test('HeaderComponent boundary renders Home link', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        const homeLink = screen.getByText(/Home/i);
        expect(homeLink).toBeInTheDocument();
        expect(homeLink).toHaveAttribute('href', '/');
    });

    test('HeaderComponent boundary renders Task List link', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        const taskListLink = screen.getByText(/Task List/i);
        expect(taskListLink).toBeInTheDocument();
        expect(taskListLink).toHaveAttribute('href', '/task-list');
    });

    test('HeaderComponent boundary renders About link', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        const aboutLink = screen.getByText(/About/i);
        expect(aboutLink).toBeInTheDocument();
        expect(aboutLink).toHaveAttribute('href', '/about');
    });
});
