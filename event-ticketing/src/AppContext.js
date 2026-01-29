import  { createContext,useState } from 'react';
export const AppContext = createContext(null);

export function AppContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const login = (email) => {
        setUser( email );
    }
    return (
        <AppContext.Provider value={{ user, login }}>
            {children}
        </AppContext.Provider>
    );
}