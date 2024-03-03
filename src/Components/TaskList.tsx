import { count } from 'console';
import React from 'react'
import { useState } from 'react';
interface TaskListProps {
    tasks: string[];
    setTasks: (tasks: string[]) => void;
    filter: 'all' | 'active' | 'completed';
    completedTasks: Record<string, boolean>;
    setCompletedTasks: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}
const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks, filter, completedTasks, setCompletedTasks }) => {
    const [isChecked, setIsChecked] = useState<Record<string, boolean>>({});
    const [isSelected, setIsSelected] = useState<Record<string, boolean>>({});
    const [editTask, setEditTask] = useState<string | null>(null);
    const [editValue, setEditValue] = useState<string>('');
    // const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

    const handleEdit = (task: string) => {
        console.log('double click')
        setEditTask(task);
        setEditValue(task);
    };
    const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditValue(event.target.value);
    };
    const handleEditEnd = () => {
        setTasks(tasks.map(task => task === editTask ? editValue : task))
        setEditTask(null);
        setEditValue('');
    }
    const handleCheck = (task: string) => {
        setIsChecked(prevState => {
            const newIsChecked = { ...prevState, [task]: !prevState[task] };
            setCompletedTasks(prevTasks => ({ ...prevTasks, [task]: newIsChecked[task] }));
            return newIsChecked;
        });
    };
    const handleSelect = (task: string) => {
        if (editTask === null) {
            setIsSelected(prevState => ({ ...prevState, [task]: !prevState[task] }))
        }
    }

    const handleDeselect = (task: string) => {
        setIsSelected(prevState => ({ ...prevState, [task]: false }));
    };

    const handleRemove = (event: React.MouseEvent, task: string) => {
        console.log(task)
        event.stopPropagation();
        setTasks(tasks.filter(item => item !== task));
    };
    let filteredTasks = tasks;
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !isChecked[task]);
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => isChecked[task]);
    }
    return (
        <>
            {
                filteredTasks.map((task, index) => {
                    return (
                        <div
                            key={index}
                            className='flex flex-row bg-white h-16 items-center md:w-full shadow-md border-t border-light-gray'
                            onClick={() => handleSelect(task)}
                            onBlur={() => handleDeselect(task)}
                            onDoubleClick={() => handleEdit(task)}
                        >

                            <div className='flex items-center w-full' onDoubleClick={() => handleEdit(task)}>
                                <div className='flex items-center ml-3' onClick={(event) => { event.stopPropagation(); handleCheck(task) }}>
                                    {
                                        isChecked[task] ?
                                            <ion-icon name="checkmark-circle-outline" style={{ fontSize: '30px', color: 'rgba(0, 128, 0, 0.5)' }}></ion-icon> :
                                            <ion-icon name="ellipse-outline" style={{ fontSize: '30px', color: 'rgba(0, 0, 0, 0.5)' }}></ion-icon>
                                    }
                                </div>
                                <div className={`${isChecked[task] ? 'line-through text-light-gray' : ''} ml-7 text-2xl text-gray`}>
                                    {
                                        editTask === task ?
                                            <input
                                                value={editValue}
                                                onChange={handleEditChange}
                                                onBlur={handleEditEnd}
                                                onKeyPress={event => event.key === 'Enter' && handleEditEnd()}
                                            /> :
                                            task
                                    }
                                </div>
                            </div>
                            {
                                isChecked[task] ?
                                    <div className='flex justify-end mr-6' onClick={(event) => handleRemove(event, task)}>
                                        <ion-icon name="close-outline" style={{ fontSize: '25px', color: 'rgba(0, 0, 0, 0.5)' }}></ion-icon>
                                    </div>
                                    : ''
                            };

                        </div>
                    )
                })
            }
        </>
    );
}


export default TaskList