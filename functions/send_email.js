export async function onRequestPost(context) {
  const formData = await context.request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // Example: use a service like SendGrid, Resend, or Mailgun here
  // For now, just return success
  return new Response(JSON.stringify({
    status: "success",
    received: { name, email, message }
  }), {
    headers: { "Content-Type": "application/json" }
  });
}
