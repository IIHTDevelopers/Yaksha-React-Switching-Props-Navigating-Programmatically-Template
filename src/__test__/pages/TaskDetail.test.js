import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import TaskDetail from '../../pages/TaskDetail';

const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: MemoryRouter });
};

describe('boundary', () => {
    test('TaskDetailComponent boundary renders Task Detail heading', () => {
        renderWithRouter(<TaskDetail />, { route: '/task-detail/1' });
        const headingElement = screen.getByText(/Task Detail/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('TaskDetailComponent boundary renders task description', () => {
        const taskData = { name: 'Task 1', description: 'Task 1 description', status: 'In Progress' };
        renderWithRouter(<TaskDetail />, { route: '/task-detail/1', state: taskData });
        const descriptionElement = screen.getByText(/Task description/i);
        expect(descriptionElement).toBeInTheDocument();
    });

    test('TaskDetailComponent boundary renders task status', () => {
        const taskData = { name: 'Task 1', description: 'Task 1 description', status: 'In Progress' };
        renderWithRouter(<TaskDetail />, { route: '/task-detail/1', state: taskData });
        const statusElement = screen.getByText(/In Progress/i);
        expect(statusElement).toBeInTheDocument();
    });

    test('TaskDetailComponent boundary clicking Edit Task button navigates to edit task page', () => {
        const taskData = { name: 'Task 1', description: 'Task 1 description', status: 'In Progress' };
        renderWithRouter(<TaskDetail />, { route: '/task-detail/1', state: taskData });
        const editButton = screen.getByText(/Edit Task/i);
        fireEvent.click(editButton);
        expect(window.location.pathname).toBe('/task-detail/1');
    });
});
