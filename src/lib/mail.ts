import nodemailer from 'nodemailer'

export async function envoyerMailConfirmation({
  destinataire,
  nom,
  date,
  heureDebut,
  heureFin,
  zoomJoinUrl,
  zoomPassword,
  notesClient,
}: {
  destinataire: string
  nom: string
  date: Date
  heureDebut: string
  heureFin: string
  zoomJoinUrl: string | null
  zoomPassword: string | null
  notesClient: string | null
}) {
  console.log('📧 Tentative envoi mail à :', destinataire)
  console.log('GMAIL_USER:', process.env.GMAIL_USER)
  console.log('GMAIL_PASS défini:', !!process.env.GMAIL_PASS)

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  })

  const dateStr = new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
      <h2 style="color: #1d4ed8;">✅ Réservation confirmée</h2>
      <p>Bonjour <strong>${nom}</strong>,</p>
      <p>Votre séance de méditation a bien été réservée.</p>

      <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0;">
        <p style="margin: 0;"><strong>📅 Date :</strong> ${dateStr}</p>
        <p style="margin: 8px 0 0;"><strong>🕐 Horaire :</strong> ${heureDebut} – ${heureFin}</p>
        ${notesClient ? `<p style="margin: 8px 0 0;"><strong>📝 Vos notes :</strong> ${notesClient}</p>` : ''}
      </div>

      ${zoomJoinUrl ? `
      <div style="text-align: center; margin: 30px 0;">
        <a href="${zoomJoinUrl}" style="background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
          Rejoindre la séance Zoom
        </a>
        ${zoomPassword ? `<p style="margin-top: 12px; color: #64748b; font-size: 14px;">Mot de passe : <code>${zoomPassword}</code></p>` : ''}
      </div>
      ` : ''}

      <p style="color: #64748b; font-size: 14px;">À bientôt,<br/>L'équipe</p>
    </div>
  `

  const info = await transporter.sendMail({
    from: `"Site Méditation" <${process.env.GMAIL_USER}>`,
    to: destinataire,
    subject: `✅ Confirmation de votre séance du ${dateStr}`,
    html,
  })

  console.log('📨 Résultat envoi :', info.messageId)
}