/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import "./../../styles/account.css"
import edit from "./../../images/icons/edit.png"
import { UpdataPassword } from '../../components/UpdataPassword'
import { toast } from 'react-toastify'
import useFetchProfile from '../../hooks/useFetchProfile'
import useProfileImage from '../../hooks/useProfileImage'
import { apiCall } from '../../api/login'

export default function Account() {
  const user = localStorage.getItem('user')
  const { userid } = JSON.parse(user)
  const divRef = useRef(null);

  const { profile, refetch } = useFetchProfile();
  const {
    email,
    bio,
    first_name,
    last_name,
    country,
    city,
    postal_code,
    phone,
  } = profile || {};

  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false)
  const [isPassEditing, setIsPassEditing] = useState(false)
  const [errors, setErrors] = useState({});
  const [passErrors, setPassErrors] = useState({})
  const [passwords, setPasswords] = useState({
    userId: userid,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const {
    profileImage,
    showMenu,
    fileInputRef,
    uploadProfileImage,
    handleImageClick,
    handleRemoveImage,
    openFilePicker,
  } = useProfileImage();

  // update intial formdata from useFetchProfile hoook.
  useEffect(() => {
    if (first_name || last_name || email) { // Check if data is available
      setFormData({
        userId: userid || "",
        firstName: first_name || "",
        lastName: last_name || "",
        email: email || "",
        phone: phone || "",
        bio: bio || "",
        country: country || "",
        city: city || "",
        postal_code: postal_code || "",
      });
    }
  }, [first_name, last_name, email, phone, bio, country, city, postal_code, profileImage]);

  // scrollIntoView  password fields.
  useEffect(() => {
    if (isPassEditing && divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  // validate Form
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

    if (formData.phone.trim() && !phoneRegex.test(formData.phone)) {
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
    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }

    // Postal Code validation: Exactly 6 digits
    const postalCodeRegex = /^\d{6}$/;
    if (!formData.postal_code.trim()) {
      newErrors.postal_code = "Pin code is required.";
    } else if (!postalCodeRegex.test(formData.postal_code)) {
      newErrors.postal_code = "Pin code must be exactly 6 digits.";
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
    } else if (!passwordRegex.test(passwords.newPassword)) {
      passErrors.newPassword = "Password must be at least 8 characters, include an uppercase, a lowercase, a number, and a special character.";
    }
    if (!passwords.confirmPassword) {
      passErrors.confirmPassword = "Confirm Password is required";
    } else if (passwords.newPassword !== passwords.confirmPassword) {
      passErrors.confirmPassword = "Confirm Password must be same as password"
    }
    setPassErrors(passErrors);
    return Object.keys(passErrors).length === 0;
  }

  // Handle input changes
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

  // Toggle Edit form.
  const onEdit = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
  };

  const onPassEdit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      if (divRef.current) {
        divRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);

      setIsPassEditing(!isPassEditing);
  }

  // Cancel Buttons starts
  const onPassCancel = (e) => {
    e.preventDefault();
    setPasswords({})
    setIsPassEditing(false);
    setPassErrors({})
  }
  const onCancel = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setErrors({})
  }
  // Cancel Buttons ends

  // Submit form and password.
  const onSave = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // console.log('formdata',formData)
        const {data} = await apiCall.post("https://studybot.zapto.org/update-profile", formData);
        // console.log('response', response)
        if (data) {
          toast.success(data.message);
          setIsEditing(false);
          refetch();
        } else {
          toast.error(data.message || "Failed to update profile.");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const onPasswordSave = async (e) => {
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

        const response = await fetch("https://studybot.zapto.org/change-password", requestOptions)
        const result = await response.json();

        if (result.message !== 'Old password is incorrect.') {
          toast.success(result.message);
          setIsPassEditing(false);
        } else {
          toast.error(result.message)
        }

      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <main className='account'>
      <h1 className='text-2xl font-semibold'>My Profile</h1>
      <section className='updateprofile_container  flex gap-4 justify-center items-center
      sm:justify-between relative
      '>
        <div className='flex flex-col sm:flex-row gap-8 justify-center items-center '>
          <form className='profile-img overflow-hidden  min-w-28 min-h-28 max-w-32 max-h-32'>
            <img
              src={profileImage} // Default Placeholder
              alt="Profile"
              className="rounded-full object-cover border cursor-pointer"
              onClick={handleImageClick}
            />
            {/* hidden input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={uploadProfileImage}
              className="hidden"
            />

            {showMenu && (
              <div className="absolute top-32 left-4  w-34 bg-white shadow-md rounded-md flex gap-4 ">
                <button
                  className="w-full p-2 text-sm  text-blue-500 hover:bg-gray-100"
                  onClick={openFilePicker}
                >
                  Upload
                </button>

                <button
                  className="w-full px-2 py-1 text-sm  text-red-500 hover:bg-gray-100"
                  onClick={handleRemoveImage}
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
          <div className='font-semibold'>
            {/* data should be dynamic */}
            <h2 className=' text-2xl'>{`${formData?.firstName} ${formData?.lastName}`}</h2>
            <p className='text-gray-500  text-xl'>{formData?.bio}</p>
            <p className='text-gray-400 text-base '>{`${formData?.city}, ${formData?.country}`}</p>
          </div>
        </div>
        <div className=''
        >
          {isEditing ? (

            <div className='flex justify-between items-center gap-4'>
              <button
                className='border border-gray-400 rounded-3xl px-4 py-2 flex gap-2'
                onClick={onSave}
              >
                Save
              </button>
              <button
                className='border border-gray-400 rounded-3xl px-4 py-2 flex gap-2'
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>

          ) : (
            <button className='border border-gray-400 rounded-3xl px-4 py-2 flex gap-2'
              onClick={onEdit}>
              Edit
              <img className='w-5' src={edit} alt="" />
            </button>
          )}
        </div>
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
                  <p>{first_name}</p>
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
                  <p>{last_name}</p>
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
                  <p>{email}</p>
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
                  <p>{phone}</p>
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
                  <p>{bio}</p>
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
                  <p>{country}</p>
                )}
              </li>
              <li>
                <p>City</p>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    /> {errors.city && (
                      <div className="error-message text-red-500">
                        {errors.city}
                      </div>
                    )}
                  </>
                ) : (
                  <p>{city}</p>
                )}
              </li>
              <li>
                <p>Pin code</p>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="postal_code"
                      value={formData.postal_code}
                      onChange={handleInputChange}
                    />
                    {errors.pincode && (
                      <div className="error-message text-red-500">
                        {errors.postal_code}
                      </div>)}
                  </>
                ) : (
                  <p>{postal_code}</p>
                )}
              </li>
            </ul>
          </div>
        </form>

      </section>

      <section className='updateprofile_container ' >
        <form className='flex gap-4 justify-between items-start'>
          <div className='w-full'>
            <h2 className='text-xl font-bold mb-4'>Settings</h2>
            <ul className='flex justify-between items-start'>
              <li className='' ref={divRef}>
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
                {isPassEditing ? (

                  <div className='flex justify-between items-center gap-4'>
                    <button
                      className='border border-gray-400 rounded-3xl px-4 py-2 flex gap-2'
                      onClick={onPasswordSave}
                    >
                      Save
                    </button>
                    <button
                      className='border border-gray-400 rounded-3xl px-4 py-2 flex gap-2'
                      onClick={onPassCancel}
                    >
                      Cancel
                    </button>
                  </div>

                ) : (
                  <button className='border border-gray-400 rounded-3xl px-4 py-2 flex gap-2'
                    onClick={onPassEdit}>
                    Change Password
                    <img className='w-5' src={edit} alt="" />
                  </button>
                )}
              </li>
            </ul>
          </div>
        </form>
      </section>

    </main>
  )
}
