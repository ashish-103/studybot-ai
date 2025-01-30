import React from 'react'

const DailogBox = () => {
    return (
        <>
            <div className="dropdown relative">
                <label tabindex="0" className="btn focus:btn-outline focus:text-orange-500 normal-case text-orange-500 ml-2">
                    <span>DropDown</span>
                    <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                        <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                    </svg>
                </label>

                <div tabindex="0" className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-80">
                    <div className="rounded-lg bg-base-300 p-3 drop-shadow-xl divide-y divide-neutral">
                        <div className="flex space-x-4 items-center p-4">
                            <div className="flex mr-auto items-center space-x-4">
                                <img src="https://avatars.githubusercontent.com/u/26052038?v=4" alt="Name" className="w-16 h-16 shrink-0 rounded-full" />
                                <div className="space-y-2 flex flex-col flex-1 truncate">
                                    <div className="relative leading-tight text-gray-900">
                                        <span className="flex">
                                            <span className="truncate relative pr-8 text-white">Name</span>
                                        </span>
                                    </div>
                                    <p className="font-normal text-base leading-tight truncate">example@mail.com</p>
                                </div>
                            </div>
                        </div>
                        <div aria-label="navigation" className="py-2">
                            <nav className="grid gap-1">
                                <a href="/" className="flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 rounded-md">
                                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M3 5C3 3.89543 3.89543 3 5 3H9C10.1046 3 11 3.89543 11 5V9C11 10.1046 10.1046 11 9 11H5C3.89543 11 3 10.1046 3 9V5ZM9 5H5V9H9V5Z" /><path d="M3 15C3 13.8954 3.89543 13 5 13H9C10.1046 13 11 13.8954 11 15V19C11 20.1046 10.1046 21 9 21H5C3.89543 21 3 20.1046 3 19V15ZM9 15H5V19H9V15Z" /><path d="M13 5C13 3.89543 13.8954 3 15 3H19C20.1046 3 21 3.89543 21 5V9C21 10.1046 20.1046 11 19 11H15C13.8954 11 13 10.1046 13 9V5ZM19 5H15V9H19V5Z" /><path d="M13 15C13 13.8954 13.8954 13 15 13H19C20.1046 13 21 13.8954 21 15V19C21 20.1046 20.1046 21 19 21H15C13.8954 21 13 20.1046 13 19V15ZM19 15H15V19H19V15Z" />
                                    </svg>
                                    <span>Dashboard</span>
                                </a>


                            </nav>
                        </div>
                        <div className="pt-2">
                            <button type="button" className="flex items-center space-x-3 py-3 px-4 w-full leading-6 text-lg text-gray-600 focus:outline-none hover:bg-gray-100 rounded-md">
                                <svg className="w-7 h-7" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                                    <path d="M9 12h12l-3 -3"></path>
                                    <path d="M18 15l3 -3"></path>
                                </svg>
                                <span>Signout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DailogBox
