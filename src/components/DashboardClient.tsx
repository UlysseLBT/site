'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Dispo = {
  id: string
  jour: Date
  heureDebut: string
  heureFin: string
  dureeMinutes: number
  statut: string
}

export default function DashboardClient({
  creneaux,
  coachId,
}: {
  creneaux: Dispo[]
  coachId: string
}) {
  const router = useRouter()
  const [liste, setListe] = useState<Dispo[]>(creneaux)
  const [jour, setJour] = useState('')
  const [heureDebut, setHeureDebut] = useState('')
  const [heureFin, setHeureFin] = useState('')
  const [duree, setDuree] = useState('60')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleAjouter() {
    setLoading(true)
    setError('')

    const res = await fetch(`/api/coaches/${coachId}/disponibilites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jour,
        heureDebut,
        heureFin,
        dureeMinutes: Number(duree),
      }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error || 'Erreur lors de l\'ajout')
      return
    }

    setListe((prev) => [...prev, data])
    setJour('')
    setHeureDebut('')
    setHeureFin('')
    setDuree('60')
    router.refresh()
  }

  async function handleSupprimer(id: string) {
    const res = await fetch(`/api/disponibilites/${id}`, { method: 'DELETE' })

    if (!res.ok) {
      const data = await res.json()
      alert(data.error || 'Erreur lors de la suppression')
      return
    }

    setListe((prev) => prev.filter((d) => d.id !== id))
  }

  return (
    <div className="space-y-8">
      {/* Formulaire ajout */}
      <section className="border rounded-xl p-5 space-y-4">
        <h2 className="font-medium text-lg">Ajouter un créneau</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="text-sm font-medium">Date</label>
            <input
              type="date"
              value={jour}
              onChange={(e) => setJour(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Heure début</label>
            <input
              type="time"
              value={heureDebut}
              onChange={(e) => setHeureDebut(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Heure fin</label>
            <input
              type="time"
              value={heureFin}
              onChange={(e) => setHeureFin(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm font-medium">Durée (minutes)</label>
            <input
              type="number"
              value={duree}
              onChange={(e) => setDuree(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          onClick={handleAjouter}
          disabled={!jour || !heureDebut || !heureFin || loading}
          className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? 'Ajout...' : 'Ajouter le créneau'}
        </button>
      </section>

      {/* Liste créneaux */}
      <section>
        <h2 className="font-medium text-lg mb-3">Créneaux existants</h2>
        {liste.length === 0 ? (
          <p className="text-gray-500 text-sm">Aucun créneau pour le moment.</p>
        ) : (
          <div className="space-y-2">
            {liste.map((d) => (
              <div
                key={d.id}
                className="flex items-center justify-between border rounded-lg px-4 py-3"
              >
                <div>
                  <p className="font-medium text-sm">
                    {new Date(d.jour).toLocaleDateString('fr-FR', {
                      weekday: 'long', day: 'numeric', month: 'long',
                    })}
                    {' — '}
                    {d.heureDebut} à {d.heureFin}
                  </p>
                  <p className="text-xs text-gray-500">{d.dureeMinutes} min</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    d.statut === 'LIBRE' ? 'bg-green-100 text-green-700' :
                    d.statut === 'RESERVE' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {d.statut}
                  </span>
                  {d.statut === 'LIBRE' && (
                    <button
                      onClick={() => handleSupprimer(d.id)}
                      className="text-xs text-red-500 hover:text-red-700 transition"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}