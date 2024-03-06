import { createContext, PropsWithChildren, useContext, useState } from 'react';
// import { User } from '../types/User';

const AuthContext = createContext<any | null>(null);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  if (user === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return [user, setUser];
};
