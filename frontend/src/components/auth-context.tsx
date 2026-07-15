"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import { useRouter, usePathname } from "next/navigation";

import { setGlobalToken } from "@/lib/token";

interface UserProfile {
  id: number;
  username: string;
  hoTen: string;
  email: string;
  role: string;
  permissions?: string[];
}

interface AuthContextType {
  user: UserProfile | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<string | null>;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const setAccessToken = useCallback((token: string | null) => {
    setAccessTokenState(token);
    setGlobalToken(token);
  }, []);

  const refreshSession = useCallback(async (): Promise<string | null> => {
    try {
      // POST to refresh API (attaches httpOnly refreshToken cookie automatically)
      const data = await api.post<{ accessToken: string }>("/auth/refresh");
      const token = data.accessToken;
      setAccessToken(token);
      
      // Fetch user profile info
      const profile = await api.get<UserProfile>("/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(profile);
      return token;
    } catch (e) {
      // Refresh failed, user is not logged in or session expired
      setAccessToken(null);
      setUser(null);
      return null;
    }
  }, [setAccessToken]);

  const login = async (username: string, password: string) => {
    const data = await api.post<{ accessToken: string; user: UserProfile }>("/auth/login", {
      username,
      password
    });
    setAccessToken(data.accessToken);
    setUser(data.user);
    router.push("/dashboard");
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // ignore logout errors
    } finally {
      setAccessToken(null);
      setUser(null);
      router.push("/login");
    }
  };

  const hasPermission = useCallback((permission: string): boolean => {
    if (!user) return false;
    if (user.role === "ADMIN") return true; // Admins have all permissions
    return user.permissions?.includes(permission) || false;
  }, [user]);

  // Initial load check
  useEffect(() => {
    const checkSession = async () => {
      await refreshSession();
      setIsLoading(false);
    };
    checkSession();
  }, [refreshSession]);

  // Redirect handling based on session
  useEffect(() => {
    if (isLoading) return;

    const isAuthRoute = pathname === "/login";
    
    if (!user && !isAuthRoute) {
      router.push("/login");
    } else if (user && isAuthRoute) {
      router.push("/dashboard");
    }
  }, [user, isLoading, pathname, router]);

  return (
    <AuthContext.Provider value={{
      user,
      accessToken,
      isLoading,
      login,
      logout,
      refreshSession,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
