import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },  // To hold the current user's profile data
    userTracks: { results: [] },   // New state for user tracks
    userEvents: { results: [] },   // New state for user events
  });

  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        // Fetch the current user's profile, tracks, and events
        const [
          { data: userProfile },
          { data: userTracks },
          { data: userEvents },
        ] = await Promise.all([
          axiosReq.get(`/profiles/${currentUser?.profile_id}`),
          axiosReq.get(`/tracks/?owner=${currentUser?.profile_id}`),
          axiosReq.get(`/events/?owner=${currentUser?.profile_id}`),
        ]);

        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: userProfile ? [userProfile] : [] },
          userTracks: userTracks ?? { results: [] },
          userEvents: userEvents ?? { results: [] },
        }));
      } catch (err) {
        console.log(err);
      }
    };

    if (currentUser) {
      handleMount();
    }
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={setProfileData}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};

