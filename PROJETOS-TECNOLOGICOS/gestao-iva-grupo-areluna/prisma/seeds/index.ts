import { PrismaClient } from '@prisma/client'
import { seedCompanies } from './companies'
import { seedTestUsers } from './test-users'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  try {
    // Seed companies first (required for users)
    await seedCompanies()
    
    // Then seed test users
    await seedTestUsers()

    console.log('🎉 Database seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })