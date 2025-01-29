import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import loginImage from "../images/login2.png";
import OtpModal from '../components/Otpmodal';

import Home from './Home';
import ForgotPasswordModal from '../components/ForgotPasswordModal';


export default function ForgotPassword() {
  const [isModalOpen, setIsModalOpen] = useState(true)
  // const [loading, setLoading] = useState(false)
  // const [errors, setErrors] = useState({})
  // const [formData, setFormData] = useState({
  //   email: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // const handleSubmit = () => { }
  return (
    <>
      <Home />
      <ForgotPasswordModal />
    </>
  )
}
