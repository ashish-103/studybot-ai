import { useState } from "react";

function useProfileFormValidation() {
  const [errors, setErrors] = useState({});

  const isFormValidate = (formData) => {
    const newErrors = {};
    // First Name and Last Name validation
    if (!formData?.first_name.trim()) {
      newErrors.first_name = "First name is required.";
    }
    if (!formData?.last_name.trim()) {
      newErrors.last_name = "Last name is required.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData?.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData?.email)) {
      newErrors.email = "Invalid email format.";
    }

    // Phone validation: 10 digits + country code
    const phoneRegex = /^\d{10}$/;

    if (formData?.phone.trim() && !phoneRegex.test(formData?.phone)) {
      newErrors.phone = "Invalid phone number format.";
    }

    // Bio validation
    if (!formData?.bio.trim()) {
      newErrors.bio = "Bio is required.";
    }

    // Country validation
    if (!formData?.country.trim()) {
      newErrors.country = "Country is required.";
    }

    // City/State validation
    if (!formData?.city.trim()) {
      newErrors.city = "City is required.";
    }

    // Postal Code validation: Exactly 6 digits
    const postalCodeRegex = /^\d{6}$/;
    if (!formData?.postal_code.trim()) {
      newErrors.postal_code = "Pin code is required.";
    } else if (!postalCodeRegex.test(formData?.postal_code)) {
      newErrors.postal_code = "Pin code must be exactly 6 digits.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  return {
    errors,
    setErrors,
    isFormValidate,
  }

};

export default useProfileFormValidation;