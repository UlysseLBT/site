import { prisma } from '@/lib/prisma'
import DashboardClient from '@/components/DashboardClient'

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ coachId: string }>
}) {
  const { coachId } = await params

  const creneaux = await prisma.disponibilite.findMany({
    where: { coachId },
    orderBy: [{ jour: 'asc' }, { heureDebut: 'asc' }],
  })

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Gestion des créneaux</h1>
      <DashboardClient creneaux={creneaux} coachId={coachId} />
    </main>
  )
}