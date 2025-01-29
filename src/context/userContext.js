import { createContext, useEffect, useState } from "react";

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const getUser = localStorage.getItem("user");

  useEffect(() => {
    if (getUser) {
      const data = JSON.parse(getUser);
      setUser(data);
    }
  }, [getUser]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
