import { useState, useEffect } from "react"
import React from 'react'
import TaskList from "./TaskList";
import CardSettings from "./CardSettings";

function input() {
    const [inputValue, setInputValue] = React.useState('' as string);
    const [task, setTask] = React.useState([] as string[]);

    React.useEffect(() => {
        console.log('Task:', task);
    }, [task]);
    const createTask = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(inputValue)
        setTask([...task, inputValue])
        console.log('Task:', task)
        setInputValue('')
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    };
    interface TaskListProps {
        tasks: string[];
    }
    return (
        <>
            <div className={`bg-white items-center md:w-3/5 shadow-md focus:within focus:border focus:outline-1 focus:outline-offset-2 focus:outline-focusInput`} tabIndex={0}>
                <form onSubmit={createTask} className={`${inputValue ? 'border-2 border-focusInput outline-2' : ''} `}>
                    <div className="flex items-center w-text-gray">
                        {task && task.length > 0 ? (
                            <label className="ml-3 align-middle w-10 items-center">
                                <ion-icon name="chevron-down-outline"></ion-icon>
                            </label>
                        ) : ''}
                        <input
                            type="text"
                            className={`group-focus/item:visible text-xl font-thin italic bg-white p-5 w-full outline-none`}
                            placeholder="What needs to be done?"
                            value={inputValue}
                            onChange={handleInputChange} />
                    </div>
                </form >
                <div className="md:w-full shadow-md">
                    {
                        task && task.length > 0 ?
                            <TaskList tasks={task} /> :
                            ''
                    }
                </div>
            <div className="bg-white w-full">
                <CardSettings />
            </div>
            </div>
            <footer className="flex flex-col items-center text-gray text-xs">
                <p className="mt-20">Double-click to edit a todo</p>
                <p className="mt-2">Created by the TodoMVC Team</p>
                <p className="mt-2">Part of TodoMVC</p>
            </footer>
        </>
    )
}

export default input