import React from 'react'

interface TaskListProps {
    tasks: string[];
}
const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    return (
        <>
            <div className='flex flex-row bg-white h-16 md:mt-10 items-center md:w-full shadow-md border border-gray'>
                <div className='flex items-center w-full'>
                    <div className='ml-5 text-2xl'>
                        <input type="checkbox" />
                    </div>
                    <div className='ml-10 text-2xl text-gray'>
                        {tasks}
                    </div>
                </div>
                <div className='flex justify-end mr-6'>
                    <input type="checkbox" />
                </div>
            </div>
        </>
    )
}

export default TaskList