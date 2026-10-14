"use client";

import { createContext, ReactNode } from "react";
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthContextBridge({ children }: { children: ReactNode }) {
    const { data: session } = useSession();

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!session?.user,
                login: () => signIn("github"),
                logout: () => signOut(),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function AuthProvider({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <AuthContextBridge>{children}</AuthContextBridge>
        </SessionProvider>
    );
}

