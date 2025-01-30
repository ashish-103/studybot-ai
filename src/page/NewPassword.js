import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router"
import { apiCall } from '../api/login';
import { toast } from 'react-toastify';

export default function NewPassword() {
  const [errors, setErrors] = useState({});
  const [formData, setformData] = useState({
    password: "",
    re_password: "",
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const token = queryParams.get("token");
  const email = queryParams.get("email");

  // let email = params?.email;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });

  };
  const validatePasswords = () => {
    const passErrors = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
      passErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      passErrors.password = "Password must be at least 8 characters, include an uppercase, a lowercase, a number, and a special character.";
    }
    if (!formData.re_password) {
      passErrors.re_password = "Confirm Password is required";
    } else if (formData.password !== formData.re_password) {
      passErrors.re_password = "Confirm Password must be same as password"
    }
    setErrors(passErrors);
    return Object.keys(passErrors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      try {
        const data = new FormData();
        data.append("password", formData.password);
        data.append("re_password", formData.re_password);
        const response = await apiCall.post(`reset_password/${token}`, data)
        if (response.status === 200) {
          navigate('/')
        }
      }
      catch (error) {
        console.log('error', error)
        toast.error(error?.response.data.message)
      }

    }
  }
  return (
    <section className='w-full h-screen flex flex-col justify-start items-center bg-[#003060] my-0 mx-auto pt-6'>
      <h1 className='text-3xl text-white'>Change password for <span className="block pt-2">{email}</span> </h1>
      <div className='flex flex-col gap-4 rounded-lg border border-gray-600 bg-slate-400 mt-10 p-6 w-[22rem] h-fit justify-between'>
        <form onSubmit={handleSubmit} >
          <label htmlFor="password">Password</label>
          <input
            name='password'
            className='w-full mb-4 border border-gray-600 px-2 py-1 outline-1 outline-stone-700 rounded-lg' type="password" placeholder='Password'
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="error-message text-red-500 text-sm">
              {errors.password}
            </div>
          )}
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            name='re_password'
            className='w-full  border border-gray-600 px-2 py-1 outline-1 outline-stone-700 rounded-lg' type="password" placeholder='Confirm Password'
            value={formData.re_password}
            onChange={handleChange} />
          {errors.re_password && (
            <div className="error-message text-red-500 text-sm">
              {errors.re_password}
            </div>
          )}
          <p className='m-2'>Make sure it's at least 8 characters including a number, uppercase and lowercase letters.</p>
          <button type='submit' className='border mt-4 border-gray-700 bg-slate-600 text-white w-full p-2 text-lg rounded-lg'>
            change password
          </button>
        </form>
      </div>
    </section>
  )
}
