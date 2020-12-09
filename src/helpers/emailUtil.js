const nodemailer = require("nodemailer");

async function sendEmail(mailOptions) {

    try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });
    
        
        const emailResponse = await transporter.sendMail(mailOptions);
    
        console.log("Email sent", emailResponse);
    } catch (error) {
        console.log("Error while sending the email", error);
        throw error;
    }
}

module.exports = sendEmail;