import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { EyeButton } from '../../components/ResubaleComponents/EyeButton';
import { ErrorMessage } from '../../components/ResubaleComponents/ErrorMessage';

export const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setformData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const validatePasswords = () => {
    const passErrors = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.current_password) {
      passErrors.current_password = "Password is required";
    } else if (!passwordRegex.test(formData.current_password)) {
      passErrors.current_password = "Password must be at least 8 characters, include an uppercase, a lowercase, a number, and a special character.";
    }
    if (!formData.new_password) {
      passErrors.new_password = "Password is required";
    } else if (!passwordRegex.test(formData.current_password)) {
      passErrors.current_password = "Password must be at least 8 characters, include an uppercase, a lowercase, a number, and a special character.";
    }
    if (!formData.confirm_password) {
      passErrors.confirm_password = "Confirm Password is required";
    } else if (formData.new_password !== formData.confirm_password) {
      passErrors.confirm_password = "Confirm Password must be same as password"
    }
    setErrors(passErrors);
    return Object.keys(passErrors).length === 0;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      console.log("formData", formData)

    }
  }
  return (
    <div className='w-full h-full mx-auto flex flex-col  justify-center items-center gap-8'>
      <h1 className='text-3xl font-semibold'>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 justify-center max-w-96'>
          <div className='relative'>
            <input className='px-4 py-2 text-lg border border-gray-400 outline-gray-500 w-full rounded-md'
              type={showCurrentPassword ? "text" : "password"}
              name='current_password'
              placeholder='Current Password*'
              value={formData.current_password}
              onChange={handleInputChange}
            />
            <EyeButton handleClick={() => setShowCurrentPassword(!showCurrentPassword)} password={showCurrentPassword} />
          </div>
          {errors.current_password && <ErrorMessage message={errors.current_password} />}
          <div className='relative'>
            <input className='px-4 py-2 text-lg border border-gray-400 outline-gray-500 w-full rounded-md'
              type={showNewPassword ? "text" : "password"}
              name='new_password'
              placeholder='New Password*'
              value={formData.new_password}
              onChange={handleInputChange}
            />
            <EyeButton handleClick={() => setShowNewPassword(!showNewPassword)} password={showNewPassword} />
          </div>
          {errors.new_password && <ErrorMessage message={errors.new_password} />}
          <div className='relative'>
            <input className='px-4 py-2 text-lg border border-gray-400 outline-gray-500 w-full rounded-md'
              type={showConfirmPassword ? "text" : "password"}
              name='confirm_password'
              placeholder='Confirm Password*'
              value={formData.confirm_password}
              onChange={handleInputChange}
            />
            <EyeButton handleClick={() => setShowConfirmPassword(!showConfirmPassword)} password={showConfirmPassword} />
          </div>
          {errors.confirm_password && <ErrorMessage message={errors.confirm_password} />}
          <button className='bg-primary-orange w-full text-lg px-4 py-2 text-white rounded-md font-semibold cursor-pointer' type='submit'>Save Changes</button>
        </div>
      </form>
    </div>
  )
}
