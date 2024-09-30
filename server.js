require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));  // Para servir archivos estáticos como imágenes
app.use(express.urlencoded({ extended: true }));

// Ruta para procesar el formulario
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false  // Acepta certificados autofirmados
        }
    });

    const mailOptions = {
        from: email,
        to: 'albertomonserrate342@gmail.com', // Cambia a la dirección que desees
        subject: `Nuevo mensaje de ${name}`,
        text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Correo enviado correctamente');
    } catch (error) {
        console.error('Error al enviar el correo:', error);  // <-- Aquí se muestra el error
        res.status(500).send('Error al enviar el correo');
    }
});
tls: {
    ciphers: 'SSLv3'
}


// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
