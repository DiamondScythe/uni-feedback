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

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error(err);
  }
}

// app.post("/email", async (req, res) => {
//     const msg = {
//       from: `"TestEmail" <${process.env.EMAIL_ADDRESS}>`,
//       to: "nhutoan399@gmail.com",
//       subject: "Hello",
//       html: "<b>Hello world?</b>",
//     };

//     sendEmail(msg);
//   });

module.exports = {
  sendEmail,
};
