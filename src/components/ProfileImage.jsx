import { useState } from "react";
import useProfileImage from "../hooks/useProfileImage";
import ImageUploadModal from "./ImageUploadModal";

function ProfileImage() {
  const {
    profileImage,
    fileInputRef,
    uploadProfileImage,
    handleRemoveImage,
    openFilePicker,
  } = useProfileImage();

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative">
      <form className='profile-img overflow-hidden min-w-28 min-h-28 max-w-32 max-h-32'>
        <img
          src={profileImage} // Default Placeholder
          alt="Profile"
          className="rounded-full object-cover border cursor-pointer"
          onClick={() => setModalOpen(true)}
        />
        {/* hidden input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={uploadProfileImage}
          className="hidden"
        />
      </form>
      <ImageUploadModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onUpload={openFilePicker}
        onRemove={handleRemoveImage}
        image={profileImage}
      />

    </div>
  );
};

export default ProfileImage;