'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Creneau = {
  id: string
  jour: Date
  heureDebut: string
  heureFin: string
  dureeMinutes: number
}

export default function CreneauxList({
  parJour,
  coachId,
}: {
  parJour: Record<string, Creneau[]>
  coachId: string
}) {
  const router = useRouter()
  const jours = Object.entries(parJour)

  const [selected, setSelected] = useState<Creneau | null>(null)
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit() {
    if (!selected) return
    setLoading(true)
    setError('')

    const res = await fetch(`/api/coaches/${coachId}/reserver`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        disponibiliteId: selected.id,
        nom,
        email,
        notes,
      }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error || 'Une erreur est survenue')
      return
    }

    router.push(`/coaches/${coachId}/confirmation?rdvId=${data.rdvId}`)
  }

  if (jours.length === 0) {
    return <p className="text-gray-500">Aucun créneau disponible pour le moment.</p>
  }

  return (
    <>
      <div className="space-y-8">
        {jours.map(([jour, slots]) => (
          <section key={jour}>
            <h2 className="font-medium text-lg mb-3 capitalize">
              {new Date(jour).toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </h2>
            <div className="flex flex-wrap gap-3">
              {slots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelected(slot)}
                  className="border rounded-lg px-4 py-3 hover:border-blue-500 hover:bg-blue-50 hover:text-black transition text-left"
                >
                  <p className="font-medium">{slot.heureDebut} – {slot.heureFin}</p>
                  <p className="text-sm text-gray-500">{slot.dureeMinutes} min</p>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-semibold mb-1">Confirmer la réservation</h2>
            <p className="text-sm text-gray-500 mb-4">
              {new Date(selected.jour).toLocaleDateString('fr-FR', {
                weekday: 'long', day: 'numeric', month: 'long'
              })} — {selected.heureDebut} à {selected.heureFin}
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Nom complet</label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Jean Dupont"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="jean@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Notes (optionnel)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Vos questions ou précisions..."
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => { setSelected(null); setError('') }}
                className="flex-1 border rounded-lg py-2 text-sm hover:bg-gray-50 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                disabled={!nom || !email || loading}
                className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {loading ? 'Réservation...' : 'Confirmer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}