import { prisma } from '@/lib/prisma'

export default async function ConfirmationPage({
  searchParams,
}: {
  params: Promise<{ coachId: string }>
  searchParams: Promise<{ rdvId: string }>
}) {
  const { rdvId } = await searchParams

  const rdv = await prisma.rendezVous.findUnique({
    where: { id: rdvId },
    include: { disponibilite: true },
  })

  if (!rdv) return <p className="p-6">Rendez-vous introuvable.</p>

  const dispo = rdv.disponibilite
  const joinUrl = rdv.zoomJoinUrl
  const password = rdv.zoomPassword

  const dateStr = new Date(dispo.jour).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <main className="max-w-lg mx-auto p-6 text-center">
      <div className="text-5xl mb-4">✅</div>
      <h1 className="text-2xl font-semibold mb-2">Réservation confirmée !</h1>
      <p className="text-gray-500 mb-6">
        {dateStr} de {dispo.heureDebut} à {dispo.heureFin}
      </p>
      {joinUrl ? (
        <a href={joinUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-blue-700 transition">
          Rejoindre la séance Zoom
        </a>
      ) : null}
      {password ? (
        <p className="text-sm text-gray-500 mt-3">
          Mot de passe : <span className="font-mono">{password}</span>
        </p>
      ) : null}
    </main>
  )
}