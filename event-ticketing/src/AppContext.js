import { createContext, useState } from "react";

export const AppContext = createContext(null);

const USER_KEY = "eventhub_user_v1";

export function AppContextProvider({ children }) {

  // cargar usuario si ya estaba logueado
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // login ahora recibe OBJETO usuario, no solo email
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
