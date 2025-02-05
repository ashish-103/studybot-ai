import React from 'react'
import { Link } from 'react-router-dom'
import { useModal } from '../../context/ModalProvider';
import ForgotPasswordModal from '../../components/ForgotPasswordModal';

export default function Account() {
    const { activeModal, openModal, closeModal } = useModal();

    return (
        <>
            <div>Account</div>
            <div className='flex justify-between flex-col gap-2'>
                <div className='flex justify-between items-center'>
                    <span className=''>Profile</span>
                    <Link
                        to="/dashboard/account/update-profile"
                        className="px-4 py-2 min-w-[120px] text-center text-white bg-[#001921]  border border-[#001921] rounded  hover:bg-transparent hover:text-[#212B36] focus:outline-none focus:ring font-semibold"
                    >Update profile </Link>
                </div>
                <div className='flex justify-between items-center'>
                    <span className=''>Change Password</span>
                    <Link
                        to={"/dashboard/account/change-password"}
                        // onClick={() => { openModal('forgot_password') }}
                        className="px-4 py-2 min-w-[120px] text-center text-white bg-[#001921]  border border-[#001921] rounded  hover:bg-transparent hover:text-[#212B36] focus:outline-none focus:ring font-semibold"
                    >Change Password </Link>
                </div>
            </div>
            {/* {activeModal === 'forgot_password' && (
                <ForgotPasswordModal activeModal={activeModal} closeModal={closeModal} />
            )} */}
        </>
    )
}
