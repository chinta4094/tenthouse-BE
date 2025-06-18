const e = require('express');
const nodemailer = require('nodemailer');

class MailContoller {

  constructor() {
    this.constructor = constructor;
  }

  static async sendEmail(payload) {
  // 1. Configure your email transporter (Gmail in this example)
  const { email, companyName, phoneNumber } = payload
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bhaskar4094@gmail.com',
      pass: 'zolf ghtr bgam frqr'  // Use App Passwords if 2FA is enabled
    }
  });

  // 2. Define email content
  const mailOptions = {
    from: 'bhaskar4094@gmail.com',
    to: email,
    subject: 'Test Email from Node.js',
    text: 'Hello! This is plain text content.',
    html: `<html>
              <head>
                  <title>Welcome to Our Service</title>
              </head>
              <body>
                  <div>
                      <h3>Welcome to Our Service</h3>
                  </div>
                  <div>
                      <p>Company Name: ${companyName}</p>
                      <p>Email: ${email.split('@')[0]}</p>
                      <p>Phone Number: ${phoneNumber}</p>  
                  </div>
                  <div>
                      <p>Thank you for choosing us!</p>
                      <p>If Any doubt, please contact with us 999212...</p>
                  </div>
              </body>
          </html>`,
    attachments: [
      {
        filename: 'test.txt',
        content: 'This is a test attachment.'
      }
    ]
  };

  // 3. Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
  } catch (err) {
    console.error('❌ Error sending email:', err);
  }
}
}

module.exports = MailContoller;
