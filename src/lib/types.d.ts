/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@prisma/client'
import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: User
    id_token: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User
    id_token: string
  }
}
