import { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if session exists by calling a protected endpoint
    // Token is automatically sent via httpOnly cookie by the browser
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/auth", {
        method: "GET",
        credentials: "include", // Include cookies
      });

      const data = await response.json();
      console.log("Auth status:", data, "Response OK:", response.ok);

      // Check the authenticated field in response, not just HTTP status
      if (data.authenticated) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      // Handle both network errors and 404s gracefully
      console.error("Auth check error:", error);
      setIsAuthenticated(false);
    }
  };

  const login = async (password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies in response
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth", {
        method: "DELETE",
        credentials: "include", // Include cookies
      });
    } catch {
      // Ignore errors on logout
    }
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
