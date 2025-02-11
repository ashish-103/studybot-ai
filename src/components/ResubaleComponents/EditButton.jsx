import edit from "./../../images/icons/edit.png"

function EditButton({onClick, text}) {
  return (
    <button className='border border-gray-400 rounded-3xl px-4 py-2 flex gap-2'
    onClick={onClick}>
    {text}
    <img className='w-5' src={edit} alt="" />
  </button>
 )
};

export default EditButton;