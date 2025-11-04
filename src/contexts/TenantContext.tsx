import React, { createContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

export interface Institute {
  id: string;
  name: string;
  subdomain: string;
  logo?: string;
}

export type UserRole = 'institute_admin' | 'sub_admin' | 'instructor' | 'student';

export interface TenantContextType {
  user: User | null;
  institute: Institute | null;
  instituteId: string | null;
  userRole: UserRole | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setInstitute: (institute: Institute | null) => void;
  setUserRole: (role: UserRole | null) => void;
  logout: () => void;
}

export const TenantContext = createContext<TenantContextType | undefined>(undefined);

interface TenantProviderProps {
  children: ReactNode;
}

export const TenantProvider: React.FC<TenantProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [institute, setInstituteState] = useState<Institute | null>(null);
  const [userRole, setUserRoleState] = useState<UserRole | null>(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('tenant_user');
    const savedInstitute = localStorage.getItem('tenant_institute');
    const savedRole = localStorage.getItem('tenant_role');

    if (savedUser) setUserState(JSON.parse(savedUser));
    if (savedInstitute) setInstituteState(JSON.parse(savedInstitute));
    if (savedRole) setUserRoleState(savedRole as UserRole);
  }, []);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem('tenant_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('tenant_user');
    }
  };

  const setInstitute = (newInstitute: Institute | null) => {
    setInstituteState(newInstitute);
    if (newInstitute) {
      localStorage.setItem('tenant_institute', JSON.stringify(newInstitute));
    } else {
      localStorage.removeItem('tenant_institute');
    }
  };

  const setUserRole = (role: UserRole | null) => {
    setUserRoleState(role);
    if (role) {
      localStorage.setItem('tenant_role', role);
    } else {
      localStorage.removeItem('tenant_role');
    }
  };

  const logout = () => {
    setUserState(null);
    setInstituteState(null);
    setUserRoleState(null);
    localStorage.removeItem('tenant_user');
    localStorage.removeItem('tenant_institute');
    localStorage.removeItem('tenant_role');
  };

  const value: TenantContextType = {
    user,
    institute,
    instituteId: institute?.id || null,
    userRole,
    isAuthenticated: !!user && !!institute,
    setUser,
    setInstitute,
    setUserRole,
    logout,
  };

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
};
