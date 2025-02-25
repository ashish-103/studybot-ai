import useProfileImage from "../hooks/useProfileImage";
import ImageUploadModal from "./ImageUploadModal";
import { useModal } from "../context/ModalProvider";

function ProfileImage() {
  const { activeModal, openModal } = useModal();
  const {
    profileImage,
    fileInputRef,
    uploadProfileImage,
    handleRemoveImage,
    openFilePicker,
  } = useProfileImage();


  return (
    <div className="relative">
      <form className='profile-img overflow-hidden min-w-28 min-h-28 max-w-32 max-h-32'>
        <img
          src={profileImage} // Default Placeholder
          alt="Profile"
          className="rounded-full object-cover border cursor-pointer"
          onClick={() => openModal('uploadProfileImage')}
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
      {activeModal === 'uploadProfileImage' &&
        <ImageUploadModal
          // isOpen={activeModal}
          // onClose={() => setModalOpen(false)}
          onUpload={openFilePicker}
          onRemove={handleRemoveImage}
          image={profileImage}
        />}

    </div>
  );
};

export default ProfileImage;