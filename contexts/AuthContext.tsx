import { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Restore token from localStorage on mount
    const stored = localStorage.getItem("admin_token");
    if (stored) {
      setToken(stored);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        setToken(data.token);
        setIsAuthenticated(true);
        localStorage.setItem("admin_token", data.token);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    if (token) {
      try {
        await fetch("/api/auth", {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` },
        });
      } catch {
        // Ignore errors on logout
      }
    }
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("admin_token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
