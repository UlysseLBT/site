import { prisma } from '@/lib/prisma'
import CreneauxList from '@/components/CreneauxList'

export default async function ReserverPage({
  params,
}: {
  params: Promise<{ coachId: string }>
}) {
  const { coachId } = await params

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const creneaux = await prisma.disponibilite.findMany({
    where: {
      coachId,
      statut: 'LIBRE',
      jour: { gte: today },
    },
    orderBy: [{ jour: 'asc' }, { heureDebut: 'asc' }],
    select: {
      id: true,
      jour: true,
      heureDebut: true,
      heureFin: true,
      dureeMinutes: true,
    },
  })

  const parJour = creneaux.reduce(
    (acc: Record<string, typeof creneaux>, c) => {
      const key = c.jour.toISOString().split('T')[0]
      acc[key] = acc[key] ? [...acc[key], c] : [c]
      return acc
    },
    {}
  )

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-medium mb-6">Choisir un créneau</h1>
      <CreneauxList parJour={parJour} coachId={coachId} />
    </main>
  )
}