import { useRef } from "react";
import default_profile_picture from "../assets/default_profile_picture.png";
import { useModal } from "../context/ModalProvider";
import { useProfileImageContext } from "../context/ProfileImageContext";

const useProfileImage = () => {
  const { closeModal } = useModal();
  const { profileImage, imageUpdated, updateProfileImage } = useProfileImageContext();
  const fileInputRef = useRef(null);
  const user = localStorage.getItem('user');
  const { userid } = JSON.parse(user);

  const uploadProfileImage = async () => {
    try {
      const file = fileInputRef.current.files[0];
      const formData = new FormData();
      formData.append("userId", userid);
      formData.append("profile_photo", file);
      const response = await fetch('https://studybot.zapto.org/upload-profile', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        updateProfileImage(data.profile_photo_url);
        fileInputRef.current.value = "";
        closeModal();
      }
    } catch (error) {
      console.error(error);
      updateProfileImage(default_profile_picture);
    }
  };

  const handleRemoveImage = async () => {
    const userId = JSON.stringify({ userId: userid });

    try {
      const response = await fetch('https://studybot.zapto.org/delete_profile_image', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: userId
      });

      if (response.ok) {
        updateProfileImage(default_profile_picture);
        closeModal();
      }
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  const openFilePicker = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  return {
    profileImage,
    fileInputRef,
    imageUpdated,
    uploadProfileImage,
    handleRemoveImage,
    openFilePicker,
  };
};

export default useProfileImage;
