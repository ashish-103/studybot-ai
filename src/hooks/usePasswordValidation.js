import { useState } from "react";

function usePasswordValidation() {
  const [passErrors, setPassErrors] = useState({})

  const isValidate = (passwords) => {
    const passErrors = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwords?.oldPassword) {
      passErrors.oldPassword = "Password is required";
    } else if (!passwordRegex.test(passwords?.oldPassword)) {
      passErrors.oldPassword = "Password must be at least 8 characters, include an uppercase, a lowercase, a number, and a special character.";
    }
    if (!passwords?.newPassword) {
      passErrors.newPassword = "Password is required";
    } else if (!passwordRegex.test(passwords?.newPassword)) {
      passErrors.newPassword = "Password must be at least 8 characters, include an uppercase, a lowercase, a number, and a special character.";
    }
    if (!passwords?.confirmPassword) {
      passErrors.confirmPassword = "Confirm Password is required";
    } else if (passwords?.newPassword !== passwords?.confirmPassword) {
      passErrors.confirmPassword = "Confirm Password must be same as password"
    }
    setPassErrors(passErrors);
    return Object.keys(passErrors).length === 0;
  }
  return {
    passErrors,
    setPassErrors,
    isValidate,
  }

};

export default usePasswordValidation;