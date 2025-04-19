import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';
import '@testing-library/jest-dom';

describe('boundary', () => {
    test('HomeComponent boundary renders Welcome to Personal Task Manager heading', () => {
        render(<Home />);
        const headingElement = screen.getByText(/Welcome to Personal Task Manager/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('HomeComponent boundary renders simple task management app description', () => {
        render(<Home />);
        const descriptionElement = screen.getByText(/This is a simple task management app./i);
        expect(descriptionElement).toBeInTheDocument();
    });

    test('HomeComponent boundary renders navigate through the app text', () => {
        render(<Home />);
        const navigateText = screen.getByText(/Navigate through the app using the links in the header./i);
        expect(navigateText).toBeInTheDocument();
    });
});
