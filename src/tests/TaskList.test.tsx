/**
 * @jest-environment jsdom
 */
import React from "react";
import TaskList from "../Components/TaskList";
import { fireEvent, getAllByAltText, render } from "@testing-library/react";
import '@testing-library/jest-dom'
import CardSettings from "../Components/CardSettings";

test('renders tasks', () => {
    const tasks = ['Task 1', 'Task 2', 'Task 3'];
    const { getByText } = render(
        <TaskList
            tasks={tasks}
            setTasks={() => { }}
            filter='all'
            setFilter={() => { }}
            completedTasks={{ 'Task 1': false, 'Task 2': false, 'Task 3': false }}
            setCompletedTasks={() => { }}
        />
    );

    tasks.forEach(task => {
        expect(getByText(task)).toBeInTheDocument();
    });
});

test('renders checkboxes for tasks', () => {

    const tasks = ['Task 1', 'Task 2', 'Task 3'];
    const { getAllByTestId } = render(
        <TaskList
            tasks={tasks}
            setTasks={() => { }}
            filter='all'
            setFilter={() => { }}
            completedTasks={{ 'Task 1': false, 'Task 2': false, 'Task 3': false }}
            setCompletedTasks={() => { }}
        />
    );

    const checkboxes = getAllByTestId('task-checkbox');

    expect(checkboxes.length).toBe(tasks.length);
});

test('updates task completion status when checkbox is clicked', () => {
    // Arrange
    const tasks = ['Task 1'];
    const setCompletedTasks = jest.fn();
    const { getByTestId } = render(
        <TaskList
            tasks={tasks}
            setTasks={() => { }}
            filter='all'
            setFilter={() => { }}
            completedTasks={{ 'Task 1': false }}
            setCompletedTasks={setCompletedTasks}
        />
    );

    const checkbox = getByTestId('task-checkbox');
    fireEvent.click(checkbox);

    expect(setCompletedTasks).toHaveBeenCalledWith({ 'Task 1': true });
});

test('updates filter when select value is changed', () => {
    const setFilter = jest.fn();
    const { getByTestId } = render(
        <CardSettings
            filter='all'
            setFilter={setFilter}
            checkedTasksCount={0}
            clearTasks={() => { }}
            tasks={[]}
        />
    );
    const filterSelect = getByTestId('filter-select');
    console.log(filterSelect)

    fireEvent.click(filterSelect, { target: { value: 'completed' } });

    console.log(setFilter.mock.calls)
    expect(setFilter).toHaveBeenCalledWith('completed');
});

test('clears tasks when clear button is clicked', () => {
    const clearTasks = jest.fn();
    const { getByText } = render(
        <CardSettings
            filter='all'
            setFilter={() => {}}
            checkedTasksCount={0}
            clearTasks={clearTasks}
            tasks={[]}
        />
    );

    const clearButton = getByText('Clear Completed');
    fireEvent.click(clearButton);

    expect(clearTasks).toHaveBeenCalled();
});

test('displays the correct number of tasks', () => {
    const tasks = ['Task 1', 'Task 2', 'Task 3']
    const { getByText } = render(
        <CardSettings
            filter='all'
            setFilter={() => {}}
            checkedTasksCount={0}
            clearTasks={() => {}}
            tasks={tasks}
        />
    );
    const taskCount = getByText('3 tasks');
    expect(taskCount).toBeInTheDocument();
})
