import useProfileImage from "../hooks/useProfileImage";

function ProfileImage() {
  const {
    profileImage,
    showMenu,
    fileInputRef,
    uploadProfileImage,
    handleImageClick,
    handleRemoveImage,
    openFilePicker,
  } = useProfileImage();
  return (
    <>
      <form className='profile-img overflow-hidden  min-w-28 min-h-28 max-w-32 max-h-32'>
        <img
          src={profileImage} // Default Placeholder
          alt="Profile"
          className="rounded-full object-cover border cursor-pointer"
          onClick={handleImageClick}
        />
        {/* hidden input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={uploadProfileImage}
          className="hidden"
        />

        {showMenu && (
          <div className="absolute top-32 left-4  w-34 bg-white shadow-md rounded-md flex gap-4 ">
            <button
              className="w-full p-2 text-sm  text-blue-500 hover:bg-gray-100"
              onClick={openFilePicker}
            >
              Upload
            </button>

            <button
              className="w-full px-2 py-1 text-sm  text-red-500 hover:bg-gray-100"
              onClick={handleRemoveImage}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </>
  )
};

export default ProfileImage;