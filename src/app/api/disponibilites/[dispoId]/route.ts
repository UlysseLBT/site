import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ dispoId: string }> }
) {
  try {
    const { dispoId } = await params

    const dispo = await prisma.disponibilite.findUnique({ where: { id: dispoId } })

    if (!dispo) {
      return NextResponse.json({ error: 'Créneau introuvable' }, { status: 404 })
    }

    if (dispo.statut === 'RESERVE') {
      return NextResponse.json({ error: 'Impossible de supprimer un créneau réservé' }, { status: 409 })
    }

    await prisma.disponibilite.delete({ where: { id: dispoId } })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}