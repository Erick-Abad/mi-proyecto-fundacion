const nodemailer = require('nodemailer');

export default async function (req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: email,
      to: 'albertomonserrate342@gmail.com',
      subject: `Nuevo mensaje de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send('Correo enviado correctamente');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).send('Error al enviar el correo');
    }
  } else {
    res.status(405).send('Método no permitido');
  }
}