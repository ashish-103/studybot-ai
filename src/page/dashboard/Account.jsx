/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import "./../../styles/account.css"
import edit from "./../../images/icons/edit.png"
import { UpdataPassword } from '../../components/UpdataPassword'
import { toast } from 'react-toastify'
import useFetchProfile from '../../hooks/useFetchProfile'
import { apiCall } from '../../api/login'
import ProfileImage from '../../components/ProfileImage'
import usePasswordValidation from '../../hooks/usePasswordValidation'
import useProfileFormValidation from '../../hooks/useProfileFormValidation'

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

  const [formData, setFormData] = useState({
    // userId: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    bio: "",
    country: "",
    city: "",
    postal_code: "",
  });
  const [isEditing, setIsEditing] = useState(false)
  const [isPassEditing, setIsPassEditing] = useState(false)
  const [passwords, setPasswords] = useState({
    userId: userid,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  // update intial formdata from useFetchProfile hoook.
  useEffect(() => {
    if (profile) { // Check if data is available
      setFormData({
        // userId: userid || "",
        first_name: first_name || "",
        last_name: last_name || "",
        email: email || "",
        phone: phone || "",
        bio: bio || "",
        country: country || "",
        city: city || "",
        postal_code: postal_code || "",
      });
    }
  }, [profile, userid]);

  // scrollIntoView  password fields.
  useEffect(() => {
    if (isPassEditing && divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  // validate Form
  const { errors, setErrors, isFormValidate } = useProfileFormValidation()
  const { passErrors, setPassErrors, isValidate } = usePasswordValidation();

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
    setFormData({
      first_name: first_name || "",
      last_name: last_name || "",
      email: email || "",
      phone: phone || "",
      bio: bio || "",
      country: country || "",
      city: city || "",
      postal_code: postal_code || "",
    })
  }
  // Cancel Buttons ends

  // Submit form and password.
  const onSave = async (e) => {
    e.preventDefault();
    if (isFormValidate(formData)) {
      try {
        // console.log('formdata',formData)
        const updatedProfile = {
          ...formData,
          userId: userid
        }
        console.log('formdata', updatedProfile)
        // const { data } = await apiCall.post("https://studybot.zapto.org/update-profile", updatedProfile);
        // // console.log('response', response)
        // if (data) {
        //   toast.success(data.message);
        //   setIsEditing(false);
        //   refetch();
        // } else {
        //   toast.error(data.message || "Failed to update profile.");
        // }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const onPasswordSave = async (e) => {
    e.preventDefault();
    if (isValidate(passwords)) {
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

  const addressKeys = ["country", "city", "postal_code"];

  const addressFields = Object.entries(formData)
    .filter(([key]) => addressKeys.includes(key));

  const PersonalInfoFields = Object.entries(formData)
    .filter(([key]) => !addressKeys.includes(key));

  const formatKey = (key) => {
    return key
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Convert first letter of each word to uppercase
  };


  return (
    <main className='account'>
      <h1 className='text-2xl font-semibold'>My Profile</h1>
      <section className='updateprofile_container  flex gap-4 justify-center items-center
      sm:justify-between relative
      '>
        <div className='flex flex-col sm:flex-row gap-8 justify-center items-center '>
          <ProfileImage />

          <div className='font-semibold'>
            {/* data should be dynamic */}
            <h2 className=' text-2xl'>{`${formData?.first_name} ${formData?.last_name}`}</h2>
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
            <ul className='profile_ul flex-col sm:flex-row  sm:gap-4'>
              {PersonalInfoFields.map(([key, value]) => (
                <li className='relative'>
                  <p>{formatKey(key)}</p>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name={key}
                        value={value}
                        onChange={handleInputChange}
                      />
                      {errors?.[key] && (
                        <div className="error-message text-red-500 absolute top-14 left-0">
                          {errors?.[key]}
                        </div>
                      )}
                    </>
                  ) : (
                    <p>{value}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </form>
      </section>

      <section className='updateprofile_container  '>
        <form className='flex gap-4 justify-between items-start'>
          <div className='w-4/5'>
            <h2 className='text-xl font-bold mb-4'>Address</h2>
            <ul className='profile_ul flex-col sm:flex-row '>
              {addressFields.map(([key, value]) => (
                <li className='relative'>
                  <p>{formatKey(key)}</p>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name={key}
                        value={value}
                        onChange={handleInputChange}
                      />
                      {errors?.[key] && (
                        <div className="error-message text-red-500 absolute top-14 left-0">
                          {errors?.[key]}
                        </div>
                      )}
                    </>
                  ) : (
                    <p>{value}</p>
                  )}
                </li>
              ))}
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
