import React, { useState } from 'react'
import "./../../styles/account.css"
import edit from "./../../images/icons/edit.png"
import { apiCall } from '../../api/login'
import { ChangePassword } from './ChangePassword'
import { UpdataPassword } from '../../components/UpdataPassword'
import { toast } from 'react-toastify'

export default function Account() {
  const user = localStorage.getItem('user')
  const { userid } = JSON.parse(user)

  const [isEditing, setIsEditing] = useState(false)
  const [isPassEditing, setIsPassEditing] = useState(false)
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "Rafiqur",
    lastName: "Rahman",
    email: "rafiqurrahman51@gmail.com",
    phone: "9123456789",
    bio: "Team Manager",
    country: 'United Kingdom',
    cityState: "Leeds, East London",
    pincode: "235423",
    taxId: 'AS45645756',
  });
  const [passErrors, setPassErrors] = useState({})
  const [passwords, setPasswords] = useState({
    userId: userid,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })


  const validateForm = () => {
    const newErrors = {};
    // First Name and Last Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    // Phone validation: 10 digits + country code
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format.";
    }
    // Bio validation
    if (!formData.bio.trim()) {
      newErrors.bio = "Bio is required.";
    }

    // Country validation
    if (!formData.country.trim()) {
      newErrors.country = "Country is required.";
    }

    // City/State validation
    if (!formData.cityState.trim()) {
      newErrors.cityState = "City and State are required.";
    }

    // Postal Code validation: Exactly 6 digits
    const postalCodeRegex = /^\d{6}$/;
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Postal code is required.";
    } else if (!postalCodeRegex.test(formData.pincode)) {
      newErrors.pincode = "Postal code must be exactly 6 digits.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  const validatePasswords = () => {
    const passErrors = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwords.oldPassword) {
      passErrors.oldPassword = "Password is required";
    } else if (!passwordRegex.test(passwords.oldPassword)) {
      passErrors.oldPassword = "Password must be at least 8 characters, include an uppercase, a lowercase, a number, and a special character.";
    }
    if (!passwords.newPassword) {
      passErrors.newPassword = "Password is required";
    } else if (!passwordRegex.test(passwords.oldPassword)) {
      passErrors.oldPassword = "Password must be at least 8 characters, include an uppercase, a lowercase, a number, and a special character.";
    }
    if (!passwords.confirmPassword) {
      passErrors.confirmPassword = "Confirm Password is required";
    } else if (passwords.newPassword !== passwords.confirmPassword) {
      passErrors.confirmPassword = "Confirm Password must be same as password"
    }
    setPassErrors(passErrors);
    return Object.keys(passErrors).length === 0;
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevData) => ({
      ...prevData, [name]: value,
    }))
  }

  const onEdit = (e) => {
    e.preventDefault();
    if (isEditing) {
      if (validateForm()) {
        setIsEditing(false);
      } else {
        console.log("Errors in Personal Info form:", errors);
      }
    } else {
      setIsEditing(true);
    }
  };
  const onPassEdit = (e) => {
    e.preventDefault();
    if (isPassEditing) {
      if (validateForm()) {
        handlePasswordSubmit(e)
        setPasswords({})
      } else {
        console.log("Errors in Personal Info form:", errors);
      }
    } else {
      setIsPassEditing(true);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('password', passwords)
    // if (validateForm()) {
    //   // alert("Form submitted successfully!");
    //   console.log("Form Data:", formData);
    // } else {
    //   console.log('error', errors);
    //   // alert("Form contains errors. Please fix them.");
    //   return;
    // };
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          userId: userid,
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
          confirmPassword: passwords.confirmPassword,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("https://studybot.zapto.org/change-password", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.message !== 'Old password is incorrect.') {
              toast.success(result.message);
              setIsPassEditing(false);

            } else {
              toast.error(result.message)
            }
          })
          .catch((error) => console.error(error));
      } catch (error) {
        // toast.error(error)
        console.log(error)
      }
    }
  };

  return (
    <main className=''>
      <h1 className='text-2xl font-semibold'>My Account</h1>
      <section className='updateprofile_container  flex gap-4 justify-center items-center
      sm:justify-between
      '>
        <div className='flex flex-col sm:flex-row gap-8 justify-center items-center'>
          <div className='profile-img overflow-hidden'>
            <img className='w-28' src="https://www.profilebakery.com/wp-content/uploads/2024/03/professional-headshot-with-dark-gray-background-blue-suit.jpg" alt="profile-image" />
          </div>
          <div className='font-semibold'>
            {/* data should be dynamic */}
            <h2 className=' text-2xl'>Rafiqur Rahman</h2>
            <p className='text-gray-500  text-xl'>Team Manager</p>
            <p className='text-gray-400 text-base '>Leeds, United Kingdom</p>
          </div>
        </div>
        <button className='border border-gray-400 rounded-3xl px-4 py-2 flex gap-2'
          onClick={onEdit} >
          {isEditing ? "Save" : (<>
            Edit
            <img className='w-5' src={edit} alt="" />
          </>)}
        </button>
      </section>

      <section className='updateprofile_container '>
        <form className='flex gap-4 justify-between items-start'>
          <div className='w-4/5'>
            <h2 className='text-xl font-bold mb-4'>Personal Information</h2>
            <ul className='profile_ul flex-col sm:flex-row gap-2 sm:gap-4'>
              <li>
                <p>First Name</p>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    {errors.firstName && (
                      <div className="error-message text-red-500">
                        {errors.firstName}
                      </div>
                    )}
                  </>
                ) : (
                  <p>{formData.firstName}</p>
                )}
              </li>
              <li>
                <p>Last Name</p>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                    {errors.lastName && (
                      <div className="error-message text-red-500">
                        {errors.lastName}
                      </div>
                    )}
                  </>
                ) : (
                  <p>{formData.lastName}</p>
                )}
              </li>
              <li>
                <p>Email address</p>
                {isEditing ? (
                  <>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />  {errors.email && (
                      <div className="error-message text-red-500">
                        {errors.email}
                      </div>
                    )}
                  </>
                ) : (
                  <p>{formData.email}</p>
                )}
              </li>
              <li>
                <p>Phone</p>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    /> {errors.phone && (
                      <div className="error-message text-red-500">
                        {errors.phone}
                      </div>
                    )}
                  </>
                ) : (
                  <p>{formData.phone}</p>
                )}
              </li>
              <li>
                <p>Bio</p>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                    /> {errors.bio && (
                      <div className="error-message text-red-500">
                        {errors.bio}
                      </div>
                    )}
                  </>
                ) : (
                  <p>{formData.bio}</p>
                )}
              </li>
            </ul>
          </div>
        </form>
      </section>

      <section className='updateprofile_container  '>
        <form className='flex gap-4 justify-between items-start'>
          <div className='w-4/5'>
            <h2 className='text-xl font-bold mb-4'>Address</h2>
            <ul className='profile_ul flex-col sm:flex-row '>
              <li>
                <p>Country</p>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    /> {errors.country && (
                      <div className="error-message text-red-500">
                        {errors.country}
                      </div>
                    )}
                  </>
                ) : (
                  <p>{formData.country}</p>
                )}
              </li>
              <li>
                <p>City/State</p>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="cityState"
                      value={formData.cityState}
                      onChange={handleInputChange}
                    /> {errors.cityState && (
                      <div className="error-message text-red-500">
                        {errors.cityState}
                      </div>
                    )}
                  </>
                ) : (
                  <p>{formData.cityState}</p>
                )}
              </li>
              <li>
                <p>Pin code</p>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                    />
                    {errors.pincode && (
                      <div className="error-message text-red-500">
                        {errors.pincode}
                      </div>)}
                  </>
                ) : (
                  <p>{formData.pincode}</p>
                )}
              </li>
            </ul>
          </div>
        </form>

      </section>

      <section className='updateprofile_container ' >
        <form className='flex gap-4 justify-between items-start'
          onSubmit={handlePasswordSubmit}
        >
          <div className='w-full'>
            <h2 className='text-xl font-bold mb-4'>Settings</h2>
            <ul className='flex justify-between items-start'>
              <li className=''>
                <p className='text-base font-semibold text-[#7f7e7e]'>Password</p>
                {isPassEditing ? (
                  <>
                    <UpdataPassword
                      errors={passErrors}
                      passwords={passwords}
                      handleChange={handlePasswordChange}
                    />
                  </>
                ) : (
                  <p className='font-semibold text-[1.2rem]'>********</p>
                )}
              </li>
              <li className='flex gap-4'>
                {
                  isPassEditing && <button
                    className='border border-gray-400 rounded-3xl px-4 py-2 flex gap-2'
                    onClick={() => { setIsPassEditing(false) }}
                  >
                    Cancel
                  </button>
                }
                <button
                  className='border border-gray-400 rounded-3xl px-4 py-2 flex gap-2'
                  onClick={onPassEdit}
                >
                  {isPassEditing ? "Save" : "Change Password"}
                </button>

              </li>
            </ul>
          </div>
        </form>
      </section>

    </main>
  )
}
