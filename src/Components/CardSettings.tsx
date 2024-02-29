import React from 'react'

function CardSettings() {
    return (
        <>
            <div className='flex flex-row items-center justify-between border border-light-gray h-12 text-sm'>

                <span className='mt-1 mx-2'>
                    {`${1} item left!`}
                </span>
                <ul className='flex flex-row mx-2'>
                    <li className='mt-1 mx-1 cursor-pointer hover:border hover:border-borderColor px-3 py-1 rounded'>
                        All
                    </li>
                    <li className='mt-1 mx-1 cursor-pointer hover:border hover:border-borderColor px-3 py-1 rounded'>
                        Active
                    </li>
                    <li className='mt-1 mx-1 cursor-pointer hover:border hover:border-borderColor px-3 py-1 rounded'>
                        Completed
                    </li>
                </ul>
                <span className='mt-1 mx-2 hover:underline cursor-pointer'>Clear Completed</span>
            </div>
            <div className='flex flex-col justify-center items-center h-full'>
                <div className='custom-footer-ul_line1 h-1 bg-white border border-slate-200'></div>
                <div className='custom-footer-ul_line2 h-1 bg-white border border-slate-200'></div>
            </div>
        </>
    )
}

export default CardSettings