import { createContext, useContext, useState, useEffect } from 'react';
import default_profile_picture from "../assets/default_profile_picture.png";
import { UserContext } from './userContext';

const ProfileImageContext = createContext();

export const ProfileImageProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(default_profile_picture);
  const [imageUpdated, setImageUpdated] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (!user?.userid) return;
      try {
        const response = await fetch(`https://studybot.zapto.org/get-profile?userId=${user.userid}`);
        if (response.ok) {
          const data = await response.json();
          setProfileImage(data?.profile_photo_url || default_profile_picture);
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    fetchProfileImage();
  }, [user?.userid]);

  const updateProfileImage = (newImage) => {
    setProfileImage(newImage);
    setImageUpdated(!imageUpdated);
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