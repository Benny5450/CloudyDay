export async function onRequestPost(context) {
  const formData = await context.request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  const payload = {
    from: "Cloudy Day Crafts <no-reply@cloudydaycrafts.com>",
    to: ["cloudydaycraft@gmail.com"],
    subject: `New contact form message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${context.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    return new Response("Error sending email: " + error, { status: 500 });
  }

  return new Response("Email sent successfully!", { status: 200 });
}
