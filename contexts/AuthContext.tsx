"use client";

import { createContext, ReactNode } from "react";
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";

interface AuthUser {
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

interface AuthContextType {
    isAuthenticated: boolean;
    isAdmin: boolean;
    user: AuthUser | null;
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
                isAdmin: !!session?.user?.isAdmin,
                user: session?.user ?? null,
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

