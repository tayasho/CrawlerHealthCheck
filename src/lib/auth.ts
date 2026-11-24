import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const ALLOWED_DOMAIN = process.env.ALLOWED_DOMAIN || 'osintech.co.jp';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        const email = profile?.email || '';
        // Restrict to organization domain
        if (ALLOWED_DOMAIN && !email.endsWith(`@${ALLOWED_DOMAIN}`)) {
          return false;
        }
        return true;
      }
      return false;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || '';
        session.user.email = token.email || '';
      }
      return session;
    },
    async jwt({ token, profile }) {
      if (profile) {
        token.email = profile.email;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
};
