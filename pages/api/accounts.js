import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (!session?.user?.email) return res.status(401).json({ error: 'Unauthorized' })

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { accounts: true }
  })
  const personal = user.accounts.filter(a => a.calendarType === 'personal').map(a => a.provider)
  const work = user.accounts.filter(a => a.calendarType === 'work').map(a => a.provider)
  res.json({ personal, work })
}
