import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from '../../pages/TaskList';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

const mockTasks = [
    { id: '1', name: 'Task 1' },
    { id: '2', name: 'Task 2' },
    { id: '3', name: 'Task 3' },
];

describe('boundary', () => {
    test('TaskListComponent boundary renders Task List heading', () => {
        render(
            <MemoryRouter>
                <TaskList tasks={mockTasks} />
            </MemoryRouter>
        );
        const headingElement = screen.getByText(/Task List/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('TaskListComponent boundary renders list of tasks', () => {
        render(
            <MemoryRouter>
                <TaskList tasks={mockTasks} />
            </MemoryRouter>
        );
        mockTasks.forEach(task => {
            const taskElement = screen.getByText(task.name);
            expect(taskElement).toBeInTheDocument();
            expect(taskElement).toHaveAttribute('href', `/task-detail/${task.id}`);
        });
    });

    test('TaskListComponent boundary renders no tasks if task list is empty', () => {
        render(
            <MemoryRouter>
                <TaskList tasks={[]} />
            </MemoryRouter>
        );
        const taskElements = screen.queryAllByRole('listitem');
        expect(taskElements).toHaveLength(0);
    });
});
