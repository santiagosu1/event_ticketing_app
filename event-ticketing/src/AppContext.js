import { createContext, useState } from "react";

export const AppContext = createContext(null);

const USER_KEY = "eventhub_user_v1";

export function AppContextProvider({ children }) {

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (userObj) => {
    setUser(userObj);
    localStorage.setItem(USER_KEY, JSON.stringify(userObj));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  };

  return (
    <AppContext.Provider value={{ user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}
