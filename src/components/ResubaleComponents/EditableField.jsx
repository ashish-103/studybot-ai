function EditableField({ name, value, onChange, errors }) {
  console.log('errors',errors);
  return (
    <>
      <input
        className={`border border-gray-400 outline-none ${errors?.[name] ? "animate-shake shadow-sm border-red-400 shadow-red-500 " : " "} `}
        type="text"
        name={name}
        value={value}
        onChange={(e) => { onChange(e) }}
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