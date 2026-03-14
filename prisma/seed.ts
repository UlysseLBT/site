import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

// @ts-ignore
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter } as any)

async function main() {
  // Nettoyer les anciennes données
  await prisma.disponibilite.deleteMany()
  await prisma.coach.deleteMany()
  await prisma.user.deleteMany()

  const user = await prisma.user.create({
    data: {
      id: 'user-1',
      email: 'coach@test.fr',
      name: 'Coach Test',
      role: 'COACH',
    },
  })

  const coach = await prisma.coach.create({
    data: {
      id: '1',
      userId: user.id,
      bio: 'Coach de méditation',
      specialite: 'Méditation',
    },
  })

  await prisma.disponibilite.createMany({
    data: [
      {
        coachId: coach.id,
        jour: new Date('2026-03-20'),
        heureDebut: '10:00',
        heureFin: '11:00',
        dureeMinutes: 60,
        statut: 'LIBRE',
      },
      {
        coachId: coach.id,
        jour: new Date('2026-03-20'),
        heureDebut: '14:00',
        heureFin: '15:00',
        dureeMinutes: 60,
        statut: 'LIBRE',
      },
      {
        coachId: coach.id,
        jour: new Date('2026-03-21'),
        heureDebut: '09:00',
        heureFin: '10:00',
        dureeMinutes: 60,
        statut: 'LIBRE',
      },
    ],
  })

  console.log('Seed réussi ! Coach ID:', coach.id)
}

main()
  .catch(console.error)
  .finally(() => pool.end())