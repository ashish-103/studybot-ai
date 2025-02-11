function EditableField({name, value, onChange, errors}) {
  return (
    <>
      <input
        type="text"
        name={name}
        value={value}
        onChange={(e)=>{onChange(e)}}
      />
      {errors?.[name] && (
        <div className="error-message text-red-500 absolute top-14 left-0">
          {errors?.[name]}
        </div>
      )}
    </>
  )
};

export default EditableField;