import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import TaskEdit from '../../pages/TaskEdit';
import '@testing-library/jest-dom';

// Mock useHistory, useLocation, and useParams hooks
import { useHistory, useLocation, useParams } from 'react-router-dom'; // Ensure these are imported
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: jest.fn(),
    useLocation: jest.fn(),
    useParams: jest.fn(),
}));

describe('boundary', () => {
    const mockUpdateTask = jest.fn();
    const mockHistoryPush = jest.fn();

    beforeEach(() => {
        // Mock useHistory, useLocation, and useParams hooks
        useHistory.mockReturnValue({ push: mockHistoryPush });
        useLocation.mockReturnValue({ state: { task: { name: 'Test Task', description: 'Test Description', status: 'In Progress' } } });
        useParams.mockReturnValue({ taskId: '1' });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('TaskEditComponent boundary renders the TaskEdit component with initial task data', () => {
        render(
            <MemoryRouter initialEntries={['/task-edit/1']}>
                <Route path="/task-edit/:taskId">
                    <TaskEdit updateTask={mockUpdateTask} />
                </Route>
            </MemoryRouter>
        );

        expect(screen.getByLabelText(/Task Name/i)).toHaveValue('Test Task');
        expect(screen.getByLabelText(/Task Description/i)).toHaveValue('Test Description');
        expect(screen.getByLabelText(/Status/i)).toHaveValue('In Progress');
    });

    test('TaskEditComponent boundary updates task data on input change', () => {
        render(
            <MemoryRouter initialEntries={['/task-edit/1']}>
                <Route path="/task-edit/:taskId">
                    <TaskEdit updateTask={mockUpdateTask} />
                </Route>
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Task Name/i), { target: { value: 'Updated Task' } });
        fireEvent.change(screen.getByLabelText(/Task Description/i), { target: { value: 'Updated Description' } });
        fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'Completed' } });

        expect(screen.getByLabelText(/Task Name/i)).toHaveValue('Updated Task');
        expect(screen.getByLabelText(/Task Description/i)).toHaveValue('Updated Description');
        expect(screen.getByLabelText(/Status/i)).toHaveValue('Completed');
    });

    test('TaskEditComponent boundary calls updateTask and navigates to task list on save', () => {
        render(
            <MemoryRouter initialEntries={['/task-edit/1']}>
                <Route path="/task-edit/:taskId">
                    <TaskEdit updateTask={mockUpdateTask} />
                </Route>
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText(/Save/i));

        expect(mockUpdateTask).toHaveBeenCalledWith('1', { name: 'Test Task', description: 'Test Description', status: 'In Progress' });
        expect(mockHistoryPush).toHaveBeenCalledWith('/task-list');
    });
});
