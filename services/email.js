const nodemailer = require("nodemailer");
require('dotenv').config()
const transporter = nodemailer.createTransport({
  service : "gmail",
  auth: {
    user: process.env.email,
    pass: process.env.mail_pass,
  },
});

exports.sendmail = async (user , downloadLink ) => {
  const info = await transporter.sendMail({
    from: "Rohit Burman",
    to: user.email,
    subject: `Hello ${user.name}`,
    text: "Hello world?", 
    html: `<b>DownLoad Link is ${downloadLink}</b>`, 
  });

  console.log("Message sent:", info.messageId);
};