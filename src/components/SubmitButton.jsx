function SubmitButton({ handleSubmit }) {
  return (
    <button
      className="bg-[#0AA6D7] text-white px-4 py-1 rounded-lg"
      onClick={handleSubmit}
    >
      Submit
    </button>)
};

export default SubmitButton;