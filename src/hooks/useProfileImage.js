import { useState, useRef, useEffect } from "react";
import uploadingImage from "../assets/uploading.gif"
import profile_picture from "../assets/default_profile_picture.png"

const useProfileImage = () => {
  const [profileImage, setProfileImage] = useState("https://placehold.co/150?text=Profile Photo");
  const [showMenu, setShowMenu] = useState(false);
  // const [imageUpdated, setImageUpdated] = useState(false)
  const fileInputRef = useRef(null);
  const user = localStorage.getItem('user');
  const { userid } = JSON.parse(user)

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(`https://studybot.zapto.org/get-profile?userId=${userid}`);
        if (response.ok) {
          const data = await response.json();
          setProfileImage(data?.profile_photo_url || profile_picture);
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    fetchProfileImage();
  }, [userid]);

  // Handle file selection
  const uploadProfileImage = async () => {
    try {
      setProfileImage(uploadingImage)
      const file = fileInputRef.current.files[0];
      const formData = new FormData();
      formData.append("userId", userid)
      formData.append("profile_photo", file)
      const response = await fetch('https://studybot.zapto.org/upload-profile', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json();
        console.log('data', data);
        setProfileImage(data?.profile_photo_url);
        // setImageUpdated(!imageUpdated)
      }
      setShowMenu(false)
    } catch (error) {
      console.error(error);
      setProfileImage(profile_picture);
    }
  };

  // Open file input when clicking on "Change Photo"
  const openFilePicker = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  // Show menu when clicking the image
  const handleImageClick = () => {
    https://placehold.co/150?text=Profile Photo"
    setShowMenu(!showMenu);
  };

  // Remove Image
  const handleRemoveImage = () => {
    setShowMenu(false);
  };

  return {
    profileImage,
    showMenu,
    fileInputRef,
    uploadProfileImage,
    handleImageClick,
    handleRemoveImage,
    openFilePicker,
  };
};

export default useProfileImage;
