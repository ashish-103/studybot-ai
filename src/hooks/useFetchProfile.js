import { useCallback, useEffect, useState } from "react";
import { apiCall } from "../api/login";

function useFetchProfile() {
  const user = localStorage.getItem("user")
  const { userid } = JSON.parse(user)

  const [profile, setProfile] = useState({});

  const getProfileData = useCallback(async () => {
    try {
      if (!userid) return;

      const { data } = await apiCall.get(`get-profile?userId=${userid}`);
      setProfile(data);
      console.log('data', data);

    } catch (error) {
      console.log(error);
    }
  }, [userid])


  useEffect(() => {
    getProfileData();
  }, [getProfileData])

  return {profile, refetch: getProfileData};
}
export default useFetchProfile;