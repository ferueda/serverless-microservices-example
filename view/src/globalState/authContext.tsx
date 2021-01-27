import { createContext, ReactNode, useState } from 'react';
import { IUser } from '../types/IUser';

export const AuthContext = createContext<any>(null);

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  return <AuthContext.Provider value={[user, setUser]}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
