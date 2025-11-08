import { Resend } from 'resend'

export async function onRequestPost(context) {
  const formData = await context.request.formData()
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  // initialize Resend client with your API key stored in Cloudflare secret
  const resend = new Resend(context.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: "Your Site <no-reply@yourdomain.com>",
      to: "you@yourdomain.com",     // 👈 this is where you receive the message
      subject: `New contact from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`
    })

    return new Response("Message sent!", { status: 200 })
  } catch (error) {
    return new Response("Error sending email: " + error.message, { status: 500 })
  }
}
