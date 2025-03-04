import { createContext, useContext, useState, useEffect } from 'react';
import default_profile_picture from "../assets/default_profile_picture.png";

const ProfileImageContext = createContext();

export const ProfileImageProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(default_profile_picture);
  const [imageUpdated, setImageUpdated] = useState(false);
  const user = localStorage.getItem('user');
  const { userid } = JSON.parse(user);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(`https://studybot.zapto.org/get-profile?userId=${userid}`);
        if (response.ok) {
          const data = await response.json();
          setProfileImage(data?.profile_photo_url || default_profile_picture);
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    fetchProfileImage();
  }, [userid]);

  const updateProfileImage = (newImage) => {
    setProfileImage(newImage);
    setImageUpdated(prev => !prev);
  };

  return (
    <ProfileImageContext.Provider value={{ profileImage, imageUpdated, updateProfileImage }}>
      {children}
    </ProfileImageContext.Provider>
  );
};

export const useProfileImageContext = () => {
  const context = useContext(ProfileImageContext);
  if (!context) {
    throw new Error('useProfileImageContext must be used within a ProfileImageProvider');
  }
  return context;
}; 