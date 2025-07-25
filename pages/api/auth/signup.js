import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body
  const hash = await bcrypt.hash(password, 10)
  try {
    await prisma.user.create({ data: { email, passwordHash: hash } })
    return res.status(201).end()
  } catch (e) {
    return res.status(400).json({ error: 'User already exists' })
  }
}
