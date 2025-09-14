from flask import Flask, request, redirect, render_template_string
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)

# Change these to your email + SMTP info
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_ADDRESS = "cloudydatcraft@gmail.com"
EMAIL_PASSWORD = ""

@app.route("/")
def index():
    return render_template_string(open("contact.html").read())

@app.route("/send_email", methods=["POST"])
def send_email():
    name = request.form["name"]
    sender_email = request.form["email"]
    message = request.form["message"]

    # Format email
    body = f"Name: {name}\nEmail: {sender_email}\n\nMessage:\n{message}"
    msg = MIMEText(body)
    msg["Subject"] = "New Contact Form Submission"
    msg["From"] = sender_email
    msg["To"] = EMAIL_ADDRESS

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)
        return "Message sent successfully!"
    except Exception as e:
        return f"Error: {e}"

if __name__ == "__main__":
    app.run(debug=True)
