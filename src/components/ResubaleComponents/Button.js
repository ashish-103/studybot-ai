/* eslint-disable react/prop-types */

const Button = ({ label, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-1 rounded-lg  ${
        className === "px-0" ? "px-0" : `px-7 ${className}`
      }`}
    >
      {label}
    </button>
  );
};

export default Button;
