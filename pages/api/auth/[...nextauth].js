import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import AzureADProvider from 'next-auth/providers/azure-ad'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: { newUser: '/setup' },        // redirect new users here
  providers: [
    // Google OAuth (all users)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/calendar'
        }
      }
    }),
    // Microsoft (Azure AD) OAuth
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: {
        params: {
          scope: 'openid profile offline_access https://graph.microsoft.com/Calendars.ReadWrite'
        }
      }
    }),
    // iCloud via App‑Specific Password
    CredentialsProvider({
      name: 'iCloud',
      credentials: {
        username: { label: 'Apple ID', type: 'text' },
        password: { label: 'App Password', type: 'password' },
      },
      async authorize(credentials) {
        // we trust the user‑entered Apple ID + app password flow
        return { id: credentials.username, name: credentials.username }
      }
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user, account }) {
      // Tag the linked account as 'personal' vs 'work'
      const type = ['google', 'apple'].includes(account.provider)
        ? 'personal'
        : 'work'
      await prisma.account.update({
        where: { providerAccountId: account.providerAccountId },
        data: { calendarType: type }
      })
      return true
    },
    async jwt({ token, user, account }) {
      if (user) token.name = user.name
      if (account) {
        token.accessToken  = account.access_token
        token.refreshToken = account.refresh_token
        token.expires      = account.expires_at
      }
      return token
    },
    async session({ session, token }) {
      session.user.name         = token.name
      session.user.accessToken  = token.accessToken
      session.user.refreshToken = token.refreshToken
      return session
    }
  }
}

export default NextAuth(authOptions)
