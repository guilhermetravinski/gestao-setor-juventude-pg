import { PrismaAdapter } from '@auth/prisma-adapter'
import { User } from '@prisma/client'
import NextAuth, { AuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'

import prisma from '@/lib/prisma'

const authOptions: AuthOptions = {
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
            : profile.email === 'guitrafer@gmail.com' ||
                profile.email === 'sjuventudedpg@gmail.com'
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
    async jwt({ token, user, account }) {
      // Include the user object and id_token in the JWT
      if (user) {
        token.user = user as User
      }
      if (account?.id_token) {
        token.id_token = account.id_token
      }
      return token
    },
    async signIn({ profile }) {
      const allowedEmails = ['guitrafer@gmail.com', 'sjuventudedpg@gmail.com']

      if (profile?.email && allowedEmails.includes(profile?.email)) {
        return true
      } else {
        return false
      }
    },
    async session({ session, token }) {
      session.user.role = token.user.role
      session.id_token = token.id_token
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
