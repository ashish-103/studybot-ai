function SaveButton({onClick}) {
  return (
    <button
    className='border border-gray-400 rounded-3xl px-4 py-2 flex gap-2'
    onClick={onClick}
  >
    Save
  </button>
 )
};

export default SaveButton;