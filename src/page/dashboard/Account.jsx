import React from 'react'
import { Link } from 'react-router-dom'

export default function Account() {
    return (
        <>
            <div>Account</div>
            <div className='flex justify-between items-center'>
                <span>Profile</span>
                <Link
                    to="/dashboard/account/update-profile"
                    className="px-4 py-2 min-w-[120px] text-center text-white bg-[#001921]  border border-[#001921] rounded  hover:bg-transparent hover:text-[#212B36] focus:outline-none focus:ring font-semibold"
                >Update profile </Link>
            </div>
        </>
    )
}
