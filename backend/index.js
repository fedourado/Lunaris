require('dotenv').config();
const nodemailer = require('nodemailer');

// Configuração do transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    port: 587,
    auth: {
        user: process.env.EMAIL_USER, // seu email
        pass: process.env.EMAIL_PASS  // senha de app do Gmail
    }
});

async function sendEmail(to) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.TO_EMAIL,
        subject: 'Obrigado(a) por se inscrever na nossa Newsletter!',
        html: `<!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8" /><title>Obrigado pela inscrição!</title></head>
        <body style="margin:0;padding:0;background:#f4f4f7;font-family:Arial, Helvetica, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center" style="padding:30px 0;">
                <table width="500" style="background:#ffffff;border-radius:10px;overflow:hidden;">
                <tr><td style="background:#6c63ff;color:#ffffff;padding:20px;font-size:24px;text-align:center;">
                    Obrigado por se inscrever! 💜
                </td></tr>
                <tr><td style="padding:20px;color:#333;font-size:16px;line-height:1.5;">
                    <p>Olá! ✨</p>
                    <p>Estamos muito felizes que você entrou para a nossa newsletter.</p>
                    <p style="margin-top:20px;">Beijos da equipe, Lunaris 💫</p>
                </td></tr>
                <tr><td style="background:#f4f4f7;color:#555;font-size:12px;padding:15px;text-align:center;">
                    Você recebeu este e-mail porque se inscreveu em nossa newsletter.
                </td></tr>
                </table>
            </td></tr>
            </table>
        </body>
        </html>`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado:', info.response);
        return info;
    } catch (err) {
        console.error('Erro ao enviar email:', err);
        throw err;
    }

}

// Teste local
async function testEmail() {
    const testRecipient = 'seu-email-de-teste@gmail.com'; // coloque seu email aqui
    await sendEmail(testRecipient);
}

testEmail();