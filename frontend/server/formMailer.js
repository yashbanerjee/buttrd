import nodemailer from 'nodemailer'

const FORM_TYPES = new Set(['contact', 'feedback', 'catering'])
const DEFAULT_RECIPIENT_EMAIL = 'Info@buttrdme.com'

const FIELD_LIMITS = {
  name: 120,
  email: 180,
  phone: 80,
  message: 2000,
  orderDate: 40,
  orderTime: 40,
  guestCount: 40,
  eventDateTime: 120,
  location: 240,
}

let transporter

function trimField(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength)
}

function normalizeSubmission(payload = {}) {
  return {
    formType: trimField(payload.formType, 40).toLowerCase(),
    name: trimField(payload.name, FIELD_LIMITS.name),
    email: trimField(payload.email, FIELD_LIMITS.email),
    phone: trimField(payload.phone, FIELD_LIMITS.phone),
    message: trimField(payload.message, FIELD_LIMITS.message),
    orderDate: trimField(payload.orderDate, FIELD_LIMITS.orderDate),
    orderTime: trimField(payload.orderTime, FIELD_LIMITS.orderTime),
    guestCount: trimField(payload.guestCount, FIELD_LIMITS.guestCount),
    eventDateTime: trimField(payload.eventDateTime, FIELD_LIMITS.eventDateTime),
    location: trimField(payload.location, FIELD_LIMITS.location),
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function getMissingFields(data) {
  const requiredFields = ['formType', 'name', 'email']

  if (data.formType === 'catering') {
    requiredFields.push('phone', 'guestCount', 'eventDateTime', 'location')
  } else {
    requiredFields.push('message')
  }

  if (data.formType === 'feedback') {
    requiredFields.push('orderDate', 'orderTime')
  }

  return requiredFields.filter((field) => !data[field])
}

export function validateFormSubmission(payload) {
  const data = normalizeSubmission(payload)
  const missingFields = getMissingFields(data)

  if (!FORM_TYPES.has(data.formType)) {
    return { ok: false, error: 'Invalid form type' }
  }

  if (missingFields.length > 0) {
    return { ok: false, error: `Missing required fields: ${missingFields.join(', ')}` }
  }

  if (!isValidEmail(data.email)) {
    return { ok: false, error: 'Invalid email address' }
  }

  return { ok: true, data }
}

function getBooleanEnv(name, fallback) {
  const value = process.env[name]
  if (value === undefined || value === '') return fallback
  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase())
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const secure = getBooleanEnv('SMTP_SECURE', port === 465)
  const recipient = process.env.FORM_RECIPIENT_EMAIL || DEFAULT_RECIPIENT_EMAIL
  const fromEmail = process.env.SMTP_FROM_EMAIL || user || recipient
  const fromName = process.env.SMTP_FROM_NAME || 'Buttrd Website'

  return {
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
    recipient,
    from: `"${fromName.replace(/"/g, '\\"')}" <${fromEmail}>`,
  }
}

function getTransporter() {
  const config = getSmtpConfig()

  if (!config.host) {
    const error = new Error('SMTP_HOST is not configured')
    error.code = 'SMTP_NOT_CONFIGURED'
    throw error
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.auth,
    })
  }

  return { transporter, config }
}

function getFormTitle(formType) {
  if (formType === 'feedback') return 'Order feedback'
  if (formType === 'catering') return 'Catering enquiry'
  return 'General enquiry'
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatTextRows(rows) {
  return rows
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')
}

function formatHtmlRows(rows) {
  return rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) => `
        <tr>
          <th align="left" style="padding: 8px 12px; border-bottom: 1px solid #eee;">${escapeHtml(label)}</th>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${escapeHtml(value).replace(/\n/g, '<br>')}</td>
        </tr>
      `,
    )
    .join('')
}

function buildSubmissionRows(data) {
  return [
    ['Form', getFormTitle(data.formType)],
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Message', data.message],
    ['Order date', data.orderDate],
    ['Order time', data.orderTime],
    ['Number of people', data.guestCount],
    ['Event date and time', data.eventDateTime],
    ['Area / Location', data.location],
  ]
}

export async function sendFormSubmissionEmail(data) {
  const { transporter: mailTransporter, config } = getTransporter()
  const title = getFormTitle(data.formType)
  const rows = buildSubmissionRows(data)

  await mailTransporter.sendMail({
    from: config.from,
    to: config.recipient,
    replyTo: data.email,
    subject: `New ${title} - Buttrd`,
    text: `New ${title} from the Buttrd website\n\n${formatTextRows(rows)}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
        <h2 style="margin: 0 0 16px;">New ${escapeHtml(title)} from the Buttrd website</h2>
        <table cellspacing="0" cellpadding="0" style="border-collapse: collapse; width: 100%; max-width: 680px;">
          ${formatHtmlRows(rows)}
        </table>
      </div>
    `,
  })
}
