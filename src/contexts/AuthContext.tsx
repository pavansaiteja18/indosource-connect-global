
import React, { createContext, useState, useContext, ReactNode } from "react";
import { toast } from "sonner";

type UserType = "buyer" | "seller" | "agent" | null;

interface AuthContextType {
  user: User | null;
  userType: UserType;
  isAuthenticated: boolean;
  login: (email: string, password: string, type: UserType) => Promise<boolean>;
  register: (userData: RegistrationData, type: UserType) => Promise<boolean>;
  logout: () => void;
  setUserType: (type: UserType) => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface RegistrationData {
  name: string;
  email: string;
  password: string;
  company?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType>(null);

  // Mock login function - would connect to backend in real app
  const login = async (email: string, password: string, type: UserType): Promise<boolean> => {
    try {
      // Mock authentication
      if (email && password) {
        const mockUser = {
          id: "user-" + Math.random().toString(36).substr(2, 9),
          name: email.split('@')[0],
          email,
          avatar: undefined
        };
        
        setUser(mockUser);
        setUserType(type);
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('userType', type || '');
        
        toast.success("Logged in successfully");
        return true;
      }
      return false;
    } catch (error) {
      toast.error("Login failed");
      return false;
    }
  };

  const register = async (userData: RegistrationData, type: UserType): Promise<boolean> => {
    try {
      // Mock registration
      const mockUser = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        avatar: undefined
      };
      
      setUser(mockUser);
      setUserType(type);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('userType', type || '');
      
      toast.success("Registered successfully");
      return true;
    } catch (error) {
      toast.error("Registration failed");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    toast.success("Logged out successfully");
  };

  const value = {
    user,
    userType,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    setUserType
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
