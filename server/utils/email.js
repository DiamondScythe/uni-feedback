const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendEmail(message) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail(message);

    console.log("Message sent successfully to %s", message.to);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  sendEmail,
};
