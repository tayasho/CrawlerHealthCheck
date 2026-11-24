import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'メールアドレス', type: 'email' },
        password: { label: 'パスワード', type: 'password' },
      },
      async authorize(credentials) {
        const validEmail = process.env.AUTH_EMAIL;
        const validPassword = process.env.AUTH_PASSWORD;

        if (!validEmail || !validPassword) {
          console.error('AUTH_EMAIL or AUTH_PASSWORD not set');
          return null;
        }

        if (
          credentials?.email === validEmail &&
          credentials?.password === validPassword
        ) {
          return {
            id: '1',
            email: validEmail,
            name: validEmail.split('@')[0],
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || '';
        session.user.email = token.email || '';
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
};
