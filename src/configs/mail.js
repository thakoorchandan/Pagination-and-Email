const nodemailer = require('nodemailer'); 
require("dotenv").config();

const {CURRENT_DEVELOPMENT, SMTP_USERNAME, SMTP_PASSWORD} = process.env;

const transporter = nodemailer.createTransport({
  host: CURRENT_DEVELOPMENT == "development" ? "smtp.mailtrap.io" : "",
    port: 587,
    secure: false,
    auth: {
      user: SMTP_USERNAME, 
      pass: SMTP_PASSWORD, 
    },
});


module.exports = transporter;