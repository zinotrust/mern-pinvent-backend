const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
      user: "nodecourse@outlook.com",
      pass: "#Pacino453asdf#Outlook",
    },
  });

  const options = {
    from: "nodecourse@outlook.com",
    to: email,
    subject: subject,
    html: message,
  };

  // Send email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;
