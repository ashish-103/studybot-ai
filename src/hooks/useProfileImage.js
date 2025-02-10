import { useState, useRef } from "react";

const useProfileImage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      setShowMenu(false);
    }
  };

  // Open file input when clicking on "Change Photo"
  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  // Show menu when clicking the image
  const handleImageClick = () => {
    setShowMenu(!showMenu);
  };

  // Remove Image
  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    setShowMenu(false);
  };

  return {
    image,
    preview,
    showMenu,
    fileInputRef,
    handleFileChange,
    handleImageClick,
    handleRemoveImage,
    openFilePicker,
  };
};

export default useProfileImage;
