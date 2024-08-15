import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth, { AuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'

import prisma from '@/lib/prisma'

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope:
            'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        },
      },
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
          role: profile.role
            ? profile.role
            : profile.email === 'guitrafer@gmail.com'
              ? 'admin'
              : 'user',
        }
      },
    }),
  ],
  pages: {
    signIn: '/', // on successfully signin
    signOut: '/login', // on signout redirects users to a custom login page.
    error: '/unauthorized', // displays authentication errors
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async signIn({ profile }) {
      const allowedEmail = 'guitrafer@gmail.com'
      if (profile?.email && profile?.email === allowedEmail) {
        return true // Permitir login
      } else {
        return false // Negar login
      }
    },
    async session({ session, token }) {
      session.user.role = token.role
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
