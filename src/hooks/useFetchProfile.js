import { useEffect, useState } from "react";
import { apiCall } from "../api/login";

function useFetchProfile() {
  const user = localStorage.getItem("user")
  const { userid } = JSON.parse(user)

  const [profile, setProfile] = useState({});

  const getProfileData = async () => {
    const { data } = await apiCall.get(`get-profile?userId=${userid}`);
    setProfile(data);
    // console.log('data', data);
  }


  useEffect(() => {
    getProfileData();
  }, [])

  return profile;
}
export default useFetchProfile;