import NextAuth, { DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";

declare module "next-auth" {
    interface Session {
        user: { isAdmin: boolean } & DefaultSession["user"];
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub],
    callbacks: {
        jwt({ token, account, profile }) {
            if (account && profile) {
                token.isAdmin =
                    String(profile?.id) ===
                    process.env.AUTH_ADMIN_GITHUB_ID;
            }
            return token;
        },
        session({ session, token }) {
            session.user.isAdmin = (token.isAdmin as boolean) ?? false;
            return session;
        },
    },
});
