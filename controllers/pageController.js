const nodemailer = require("nodemailer");
require("dotenv").config();


exports.getIndexPage = (req, res) => {
  console.log(req.session.userID);
  res.status(200).render("index", {
    page_name: "index",
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
  console.log(process.env.mail_gmail)
};

// exports.sendEmail =  async (req, res) => {
//   const outputMessage = 
//   ` 
//    <h1>Mail Details </h1>
//     <u1>
//      <li> Name: ${req.body.name} </li>
//      <li> Email: ${req.body.email} </li>
//      </u1>
//      <h1>Message</h1>
//      <p>${req.body.message}</p>
//    `

//    const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true, // true for port 465, false for other ports
//     auth: {
//       user: process.env.mail_gmail,
//       pass: process.env.password_gmail,
//     },
//   });
  
//   // async..await is not allowed in global scope, must use a wrapper
//   async function main() {
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//       from: '"Smart Edu Contact Form " <nodejsemre@gmail.com>', // sender address
//       to: "emreium@gmail.com", // list of receivers
//       subject: "Smart Edu Contact Form New Message", // Subject line
//       text: "Hello world?", // plain text body
//       html: outputMessage // html body
//     });
  
//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
//   }
//   res.status(200).redirect('/contact')
// };




exports.sendEmail = async (req, res) => {
  const outputMessage = 
  ` 
    <h1>Mail Details </h1>
    <ul>
      <li> Name: ${req.body.name} </li>
      <li> Email: ${req.body.email} </li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
  `;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // 587 kullanıyorsanız secure: false yapın
    secure: true,
    auth: {
      user: process.env.mail_gmail, // .env'de tanımlı mail adresi
      pass: process.env.password_gmail, // .env'de tanımlı şifre
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"Smart Edu Contact Form" <nodejsemre@gmail.com>', // Gönderici adresi
      to: "emreium@gmail.com,nodejsemre@gmail.com,bern.varol@gmail.com>", // Alıcı adresi
      subject: "Smart Edu Contact Form New Message", // Konu başlığı
      text: "Hello world?", // düz metin içeriği
      html: outputMessage, // HTML içerik
    });

    console.log("Message sent: %s", info.messageId);
    req.flash("success","We recived your message succesfully");
    res.status(200).redirect('/contact');

  } catch (error) {
    console.error("Error sending email:", error);
    req.flash("fail","We can not recived your message");
    res.status(500).redirect('/contact');
  }
};