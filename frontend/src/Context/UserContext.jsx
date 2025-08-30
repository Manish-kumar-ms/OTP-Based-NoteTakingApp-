import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const serverUrl = "http://localhost:8000";

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/currentUser`, {
        withCredentials: true,
      });
      console.log("Current user data:", result.data.user);
      setUserData(result.data.user);
    } catch (error) { 
        console.error("Error fetching current user:", error);
      setUserData(null); // Ensure it's null if not authenticated
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };
  useEffect(() => {
    handleCurrentUser();
  }, []); 

  const value = { userData, setUserData, serverUrl, loading };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;