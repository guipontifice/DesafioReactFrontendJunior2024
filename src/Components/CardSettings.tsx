import React from 'react'
import { useState } from 'react';

interface CardSettingsProps {
    filter: 'all' | 'active' | 'completed';
    setFilter: (filter: 'all' | 'active' | 'completed') => void;
    completedTasks: Record<string, boolean>;
    clearTasks: () => void;
    tasks: string[];
}
const CardSettings: React.FC<CardSettingsProps> = ({ filter, setFilter, completedTasks, clearTasks, tasks }) => {
    console.log('tasks.length', tasks.length);
    console.log('completedTasks.length', completedTasks.length)
    console.log('esse aqui', filter)
    const completedTasksCount = Object.values(completedTasks).filter(Boolean).length;
    const itemsLeft = tasks.filter(task => !completedTasks[task]).length
    console.log('vamo ver se funcionou:', itemsLeft)
    return (
        <>
            <div className='flex flex-row items-center justify-between border border-light-gray h-12 text-sm'>
                <span className='mt-1 mx-2'>
                    {`${tasks.length - completedTasksCount} item${itemsLeft === 1 ? '' : 's'} left!`}
                </span>
                <ul className='flex flex-row mx-2'>
                    <li className={`mt-1 mx-1 cursor-pointer hover:border hover:border-borderColor px-3 py-1 rounded  ${filter === 'all' ? 'border border-borderColor' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </li>
                    <li className={`mt-1 mx-1 cursor-pointer hover:border hover:border-bborderColor px-3 py-1 rounded  ${filter === 'active' ? 'border border-borderColor' : ''}`}
                        onClick={() => setFilter('active')}
                    >
                        Active
                    </li>
                    <li className={`mt-1 mx-1 cursor-pointer hover:border hover:border-borderColor px-3 py-1 rounded  ${filter === 'completed' ? 'border border-borderColor' : ''}`}
                        onClick={() => setFilter('completed')}
                    >
                        Completed
                    </li>
                </ul>
                <span className='mt-1 mx-2 hover:underline cursor-pointer' onClick={clearTasks}>Clear Completed</span>
            </div>
            <div className='flex flex-col justify-center items-center h-full'>
                <div className='custom-footer-ul_line1 h-1 bg-white border border-slate-200'></div>
                <div className='custom-footer-ul_line2 h-1 bg-white border border-slate-200'></div>
            </div>
        </>
    )
}

export default CardSettings