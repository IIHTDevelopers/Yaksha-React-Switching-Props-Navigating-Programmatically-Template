import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../../pages/About';
import '@testing-library/jest-dom';

describe('boundary', () => {
    test('AboutComponent boundary renders About Personal Task Manager heading', () => {
        render(<About />);
        const headingElement = screen.getByText(/About Personal Task Manager/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('AboutComponent boundary renders description paragraph', () => {
        render(<About />);
        const paragraphElement = screen.getByText(/This app helps you manage your personal tasks efficiently./i);
        expect(paragraphElement).toBeInTheDocument();
    });

    test('AboutComponent boundary renders view and manage tasks text', () => {
        render(<About />);
        const manageTasksText = screen.getByText(/You can view and manage your tasks easily with this simple interface./i);
        expect(manageTasksText).toBeInTheDocument();
    });
});
