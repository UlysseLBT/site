import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getZoomToken, createZoomMeeting } from '@/lib/zoom'
import { envoyerMailConfirmation } from '@/lib/mail'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ coachId: string }> }
) {
  try {
    const { coachId } = await params
    const { disponibiliteId, nom, email, notes } = await req.json()

    const dispo = await prisma.disponibilite.findUnique({
      where: { id: disponibiliteId },
    })

    if (!dispo || dispo.statut !== 'LIBRE') {
      return NextResponse.json({ error: 'Créneau non disponible' }, { status: 409 })
    }

    let user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      user = await prisma.user.create({
        data: { email, name: nom, role: 'CLIENT' },
      })
    }

    const startTime = `${dispo.jour.toISOString().split('T')[0]}T${dispo.heureDebut}:00`
    const token = await getZoomToken()
    const meeting = await createZoomMeeting(token, 'Séance de méditation', startTime, dispo.dureeMinutes)

    const rdv = await prisma.$transaction(async (tx) => {
      await tx.disponibilite.update({
        where: { id: disponibiliteId },
        data: { statut: 'RESERVE' },
      })

      return tx.rendezVous.create({
        data: {
          clientId: user.id,
          coachId,
          disponibiliteId,
          zoomMeetingId: String(meeting.id),
          zoomJoinUrl: meeting.join_url,
          zoomStartUrl: meeting.start_url,
          zoomPassword: meeting.password,
          notesClient: notes,
          statut: 'CONFIRME',
          confirmeAt: new Date(),
        },
      })
    })

    // Envoi du mail de confirmation
    await envoyerMailConfirmation({
      destinataire: email,
      nom,
      date: dispo.jour,
      heureDebut: dispo.heureDebut,
      heureFin: dispo.heureFin,
      zoomJoinUrl: rdv.zoomJoinUrl,
      zoomPassword: rdv.zoomPassword,
      notesClient: rdv.notesClient,
    })

    return NextResponse.json({ rdvId: rdv.id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}