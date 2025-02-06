import React, { useState } from 'react'
import edit from "./../../images/icons/edit.png"
import { ErrorMessage } from '../../components/ResubaleComponents/ErrorMessage';

export default function UpdateProfile() {
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false)
  const [isEditingAddress, setIsEditingAddress] = useState(false)
  const [errors, setErrors] = useState({});
  const [errors2, setErrors2] = useState({});
  const [formData, setFormData] = useState({
    firstName: "Rafiqur",
    lastName: "Rahman",
    email: "rafiqurrahman51@gmail.com",
    phone: "9123456789",
    bio: "Team Manager",
    country: 'United Kingdom',
    cityState: "Leeds, East London",
    postalCode: "235423",
    taxId: 'AS45645756',
  });

  const validateForm1 = () => {
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const validateForm2 = () => {
    const newErrors = {};

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
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required.";
    } else if (!postalCodeRegex.test(formData.postalCode)) {
      newErrors.postalCode = "Postal code must be exactly 6 digits.";
    }
    setErrors2(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleEditPersonalInfo = (e) => {
    e.preventDefault();
    if (isEditingPersonalInfo) {
      if (validateForm1()) {
        setIsEditingPersonalInfo(false);
      } else {
        console.log("Errors in Personal Info form:", errors);
      }
    } else {
      setIsEditingPersonalInfo(true);
    }
  };

  const toggleEditAddress = (e) => {
    e.preventDefault();
    if (isEditingAddress) {
      if (validateForm2()) {
        setIsEditingAddress(false);
      } else {
        console.log("Errors in Address form:", errors);
      }
    } else {
      setIsEditingAddress(true);
    }
  };

  const handleSubmit = () => {
    // if (validateForm()) {
    //   // alert("Form submitted successfully!");
    //   console.log("Form Data:", formData);
    // } else {
    //   console.log('error', errors);
    //   // alert("Form contains errors. Please fix them.");
    //   return;
    // };
  };

  return (
    <main className=''>
      <h1 className='text-2xl font-semibold'>My Profile</h1>
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
      </section>

      <section className='updateprofile_container '>
        <form className='flex gap-4 justify-between items-start'>
          <div className='w-4/5'>
            <h2 className='text-xl font-bold mb-4'>Personal Information</h2>
            <ul className='profile_ul flex-col sm:flex-row gap-2 sm:gap-4'>
              <li>
                <p>First Name</p>
                {isEditingPersonalInfo ? (
                  <>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    {errors.firstName && <ErrorMessage message={errors.firstName} />}
                  </>
                ) : (
                  <p>{formData.firstName}</p>
                )}
              </li>
              <li>
                <p>Last Name</p>
                {isEditingPersonalInfo ? (
                  <>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                    {errors.lastName && <ErrorMessage message={errors.lastName} />}
                  </>
                ) : (
                  <p>{formData.lastName}</p>
                )}
              </li>
              <li>
                <p>Email address</p>
                {isEditingPersonalInfo ? (
                  <>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />  {errors.email && <ErrorMessage message={errors.email} />}
                  </>
                ) : (
                  <p>{formData.email}</p>
                )}
              </li>
              <li>
                <p>Phone</p>
                {isEditingPersonalInfo ? (
                  <>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    /> {errors.phone && <ErrorMessage message={errors.phone} />}
                  </>
                ) : (
                  <p>{formData.phone}</p>
                )}
              </li>
              <li>
                <p>Bio</p>
                {isEditingPersonalInfo ? (
                  <>
                    <input
                      type="text"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                    /> {errors.bio && <ErrorMessage message={errors.bio} />}
                  </>
                ) : (
                  <p>{formData.bio}</p>
                )}
              </li>
            </ul>
          </div>

          <button className='border border-gray-400 rounded-3xl px-4 py-2 flex gap-2'
            onClick={toggleEditPersonalInfo} >
            {isEditingPersonalInfo ? "Save" : (<>
              Edit
              <img className='w-5' src={edit} alt="" />
            </>)}
          </button>
        </form>
      </section>

      <section className='updateprofile_container  '>
        <form className='flex gap-4 justify-between items-start'>
          <div className='w-4/5'>
            <h2 className='text-xl font-bold mb-4'>Address</h2>
            <ul className='profile_ul flex-col sm:flex-row'>
              <li>
                <p>Country</p>
                {isEditingAddress ? (
                  <>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    /> {errors2.country && <ErrorMessage message={errors.country} />}
                  </>
                ) : (
                  <p>{formData.country}</p>
                )}
              </li>
              <li>
                <p>City/State</p>
                {isEditingAddress ? (
                  <>
                    <input
                      type="text"
                      name="cityState"
                      value={formData.cityState}
                      onChange={handleInputChange}
                    /> {errors2.cityState && <ErrorMessage message={errors.cityState} />}
                  </>
                ) : (
                  <p>{formData.cityState}</p>
                )}
              </li>
              <li>
                <p>Postal code</p>
                {isEditingAddress ? (
                  <>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                    />
                    {errors2.postalCode && <ErrorMessage message={errors.postalCode} />}
                  </>
                ) : (
                  <p>{formData.postalCode}</p>
                )}
              </li>
              <li>
                <p>Tax ID</p>
                {isEditingAddress ? (
                  <input
                    type="text"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{formData.taxId}</p>
                )}
              </li>
            </ul>
          </div>
          <button className='border border-gray-400 rounded-3xl px-4 py-2 flex gap-2'
            onClick={toggleEditAddress}>
            {isEditingAddress ? "Save" : (<>
              Edit
              <img className='w-5' src={edit} alt="" />
            </>)}
          </button>
        </form>

      </section>
    </main>
  )
}
