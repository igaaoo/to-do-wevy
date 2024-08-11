'use client';
import { ReactNode, useEffect, useState } from 'react';
import AuthContext, { AuthContextType } from './AuthContext';
import { redirect, usePathname } from 'next/navigation';
import { sessionName, sessionExpires } from '@/config/session';
import jwt from 'jsonwebtoken';

import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';
import { jwtType } from '@/types/jwtType';

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  let pathName = usePathname();

  const [token, setToken] = useState('');
  const [user, setUser] = useState('');


  const login = (token: string) => {
    setToken(token);
    setCookie(sessionName, token, { maxAge: sessionExpires });

    const decodedToken = jwt.decode(token) as jwtType;

    setUser(decodedToken.user);
  };

  const logout = () => {
    deleteCookie(sessionName);
    setToken('');
  };


  const contextValue: AuthContextType = {
    token,
    user,
    login,
    logout,
  };


  useEffect(() => {
    if (hasCookie(sessionName)) {
      login(getCookie(sessionName)!.toString());
    } else {
      if (pathName != '/login' && pathName != '/register') {
        redirect('/login');
      }
    }
  }, [token, pathName]);


  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
