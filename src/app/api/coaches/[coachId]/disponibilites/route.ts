import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ coachId: string }> }
) {
  const { coachId } = await params

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const creneaux = await prisma.disponibilite.findMany({
    where: { coachId, statut: 'LIBRE', jour: { gte: today } },
    orderBy: [{ jour: 'asc' }, { heureDebut: 'asc' }],
    select: { id: true, jour: true, heureDebut: true, heureFin: true, dureeMinutes: true },
  })

  return NextResponse.json(creneaux)
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ coachId: string }> }
) {
  try {
    const { coachId } = await params
    const { jour, heureDebut, heureFin, dureeMinutes } = await req.json()

    if (!jour || !heureDebut || !heureFin || !dureeMinutes) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    const dispo = await prisma.disponibilite.create({
      data: {
        coachId,
        jour: new Date(jour),
        heureDebut,
        heureFin,
        dureeMinutes: Number(dureeMinutes),
        statut: 'LIBRE',
      },
    })

    return NextResponse.json(dispo, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}