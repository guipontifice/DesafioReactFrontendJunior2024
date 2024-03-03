/**
 * @jest-environment jsdom
 */
import React from "react";
import CardSettings from "../Components/CardSettings";
import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'

test('renders without crashing', () => {
    render(
        <CardSettings
            filter='all'
            setFilter={() => { }}
            checkedTasksCount={0}
            clearTasks={() => { }}
            tasks={[]}
        />
    )
})

test('updates filter when a filter option is clicked', () => {
    const setFilter = jest.fn();
    const { getByText } = render(
        <CardSettings
            filter='all'
            setFilter={setFilter}
            checkedTasksCount={0}
            clearTasks={() => { }}
            tasks={[]}
        />
    );
    fireEvent.click(getByText('Completed'));

    expect(setFilter).toHaveBeenCalledWith('completed');
});

test('calls clearTasks when "Clear Completed" is clicked', () => {
    const clearTasks = jest.fn();
    const { getByText } = render(
        <CardSettings
            filter='all'
            setFilter={() => { }}
            checkedTasksCount={0}
            clearTasks={clearTasks}
            tasks={[]}
        />
    );
    fireEvent.click(getByText('Clear Completed'));

    expect(clearTasks).toHaveBeenCalled();
    
});

test('displays the correct number of items left', () => {
    const {getByText } = render(
        <CardSettings
            filter='all'
            setFilter={() => { }}
            checkedTasksCount={1}
            clearTasks={() => { }}
            tasks={['Task 1', 'Task 2']}
        />
    );
    expect(getByText('1 item left!')).toBeInTheDocument();
});

test('highlights the correct filter option', () => {
    const { getByText } = render(
      <CardSettings
        filter='completed'
        setFilter={() => {}}
        checkedTasksCount={0}
        clearTasks={() => {}}
        tasks={[]}
      />
    );
  
    expect(getByText('Completed')).toHaveClass('border border-borderColor');
  });

  test('displays "0 items left!" when there are no tasks', () => {
    const { getByText } = render(
      <CardSettings
        filter='all'
        setFilter={() => {}}
        checkedTasksCount={0}
        clearTasks={() => {}}
        tasks={[]}
      />
    );
  
    expect(getByText('0 items left!')).toBeInTheDocument();
  });