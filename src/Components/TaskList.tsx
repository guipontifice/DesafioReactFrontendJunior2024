import React from 'react'
import { useState } from 'react';
interface TaskListProps {
    tasks: string[];
}
const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    const [isChecked, setIsChecked] = useState<Record<string, boolean>>({});
    const [isSelected, setIsSelected] = useState<Record<string, boolean>>({});
    const [tasksState, setTasksState] = useState<string[]>(tasks);

    const handleCheck = (task: string) => {
        console.log('checked')
        setIsChecked(prevState => ({ ...prevState, [task]: !prevState[task] }));
    };
    const handleSelect = (task: string) => {
        setIsSelected(prevState => ({ ...prevState, [task]: !prevState[task] }))
    }

    const handleDeselect = (task: string) => {
        setIsSelected(prevState => ({ ...prevState, [task]: false }));
    };

    const handleRemove = (task: string) => {
        setTasksState(tasksState.filter(t => t !== task));
    }
    return (
        <>
            {
                tasks.map((task, index) => {
                    return (
                        <div
                            key={index}
                            className='flex flex-row bg-white h-16 items-center md:w-full shadow-md border-t border-light-gray'
                            onClick={() => handleSelect(task)} onBlur={() => handleDeselect(task)}>
                            <div className='flex items-center w-full'>
                                <div className='flex items-center ml-3' onClick={(event) => { event.stopPropagation(); handleCheck(task) }}>
                                    {
                                        isChecked[task] ?
                                            <ion-icon name="checkmark-circle-outline" style={{ fontSize: '30px', color: 'rgba(0, 128, 0, 0.5)' }}></ion-icon> :
                                            <ion-icon name="ellipse-outline" style={{ fontSize: '30px', color: 'rgba(0, 0, 0, 0.5)' }}></ion-icon>
                                    }
                                </div>
                                <div className={`${isChecked[task] ? 'line-through text-light-gray' : ''} ml-7 text-2xl text-gray`}>
                                    {task}
                                </div>
                            </div>
                            {
                                isSelected[task] === true ?
                                    <div className='flex justify-end mr-6' onClick={(event) => { event.stopPropagation(); handleRemove(task) }}>
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