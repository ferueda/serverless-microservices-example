import { createContext, ReactNode, useState } from 'react';

export const AuthContext = createContext<any>(null);

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  return <AuthContext.Provider value={[user, setUser]}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
