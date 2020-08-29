var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'Work.task90@gmail.com',
    pass: 'Pa$$w0rd12'
  }
});

transporter.sendEMail = function (mailRequest) {
  return new Promise(function (resolve, reject) {
    transporter.sendMail(mailRequest, (error, info) => {
      if (error) {
        reject("Mail error: "+error);
      } else {
        resolve("The message was sent!");
      }
    });
  });
}

module.exports = transporter;