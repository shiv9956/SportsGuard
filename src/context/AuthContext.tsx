import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

interface User {
  id: string;
  email: string;
  organization: string;
  full_name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = localStorage.getItem('sg_user');
        const token = localStorage.getItem('sg_token');
        if (storedUser && token) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('AUTH_INIT_ERROR:', err);
        localStorage.removeItem('sg_user');
        localStorage.removeItem('sg_token');
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem('sg_token', token);
    localStorage.setItem('sg_user', JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('sg_token');
    localStorage.removeItem('sg_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
