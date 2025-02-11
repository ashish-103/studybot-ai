import React from 'react'

export default function UpdataPassword({ handleChange, passwords, errors }) {

  return (
    <div className='flex flex-col gap-2 overflow-y-visible'>
      <label>Current Password</label>
      <input type="text"
        name='oldPassword'
        value={passwords.oldPassword}
        onChange={handleChange}
        className='w-fit'
      />
      {errors.oldPassword && (
        <div className="error-message text-red-500">
          {errors.oldPassword}
        </div>
      )}

      <label>New Password</label>
      <input type="text"
        name='newPassword'
        value={passwords.newPassword}
        onChange={handleChange}
        className='w-fit'
      />
      {errors.newPassword && (
        <div className="error-message text-red-500">
          {errors.newPassword}
        </div>
      )}

      <label>Confirm Password</label>
      <input type="text"
        name='confirmPassword'
        value={passwords.confirmPassword}
        onChange={handleChange}
        className='w-fit'
      />
      {errors.confirmPassword && (
        <div className="error-message text-red-500">
          {errors.confirmPassword}
        </div>
      )}
    </div>
  )
}
