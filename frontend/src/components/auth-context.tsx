"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api, setOnAccessDenied } from "@/lib/api";
import { useRouter, usePathname } from "next/navigation";
import { AccessDeniedModal } from "@/components/AccessDeniedModal";

import { setGlobalToken, getGlobalToken } from "@/lib/token";

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
  triggerAccessDeniedModal: (message: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<UserProfile | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("userProfile");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return null;
  });

  const [accessToken, setAccessTokenState] = useState<string | null>(() => {
    return getGlobalToken();
  });

  const [accessDeniedMessage, setAccessDeniedMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setOnAccessDenied((msg) => {
      setAccessDeniedMessage(msg);
    });
  }, []);

  const setUser = useCallback((profile: UserProfile | null) => {
    setUserState(profile);
    if (typeof window !== "undefined") {
      if (profile) {
        localStorage.setItem("userProfile", JSON.stringify(profile));
      } else {
        localStorage.removeItem("userProfile");
      }
    }
  }, []);

  const setAccessToken = useCallback((token: string | null) => {
    setAccessTokenState(token);
    setGlobalToken(token);
  }, []);

  const refreshSession = useCallback(async (): Promise<string | null> => {
    try {
      // POST to refresh API (attaches httpOnly refreshToken cookie automatically with credentials: include)
      const data = await api.post<{ accessToken: string }>("/auth/refresh");
      const token = data.accessToken;
      setAccessToken(token);
      
      // Fetch fresh user profile info
      const profile = await api.get<UserProfile>("/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(profile);
      return token;
    } catch (e) {
      // Refresh failed, clear session
      setAccessToken(null);
      setUser(null);
      return null;
    }
  }, [setAccessToken, setUser]);

  const login = async (username: string, password: string) => {
    const data = await api.post<{ accessToken: string; user: UserProfile }>("/auth/login", {
      username,
      password
    });
    setAccessToken(data.accessToken);
    setUser(data.user);
    if (data.user?.role === "TEACHER") {
      router.push("/dashboard/records");
    } else {
      router.push("/dashboard");
    }
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

  // Initial load check on mount
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

    if (pathname === "/") {
      if (user) {
        if (user.role === "TEACHER") {
          router.replace("/dashboard/records");
        } else {
          router.replace("/dashboard");
        }
      } else {
        router.replace("/login");
      }
      return;
    }

    const isAuthRoute = pathname === "/login";
    
    if (!user && !isAuthRoute) {
      router.replace("/login");
    } else if (user && isAuthRoute) {
      if (user.role === "TEACHER") {
        router.replace("/dashboard/records");
      } else {
        router.replace("/dashboard");
      }
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
      hasPermission,
      triggerAccessDeniedModal: setAccessDeniedMessage
    }}>
      {children}
      <AccessDeniedModal
        message={accessDeniedMessage}
        onClose={() => setAccessDeniedMessage(null)}
      />
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
