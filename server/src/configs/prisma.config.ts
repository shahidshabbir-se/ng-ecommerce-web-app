import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const connectDB = async () => {
  try {
    console.log('Attempting to connect to the database...')
    await prisma.$connect()
    console.log('Connected to database')
  } catch (err) {
    console.table(err)
    await prisma.$disconnect()
    console.log('Failed to connect to the database')
    console.log('Application Closed')
    process.exit(1)
  }
}
