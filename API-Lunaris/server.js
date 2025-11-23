require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const nodemailer = require("nodemailer");

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// Arquivos estáticos
app.use(express.static(path.join(__dirname, '../html')));
app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/js', express.static(path.join(__dirname, '../js')));
app.use('/img', express.static(path.join(__dirname, '../img')));

// Rota Principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../html/home.html'));
});

// Conexão com Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Envio de e-mail (Nodemailer)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// Template HTML

const emailHTML = `

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Obrigado pela inscrição!</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f4f7;font-family:Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 30px 0;">
          <table width="500" style="background:#ffffff;border-radius:10px;overflow:hidden;">
            <tr>
              <td style="background:#6c63ff;color:#ffffff;padding:20px;font-size:24px;text-align:center;">
                Obrigado por se inscrever! 💜
              </td>
            </tr>
            <tr>
              <td style="padding:20px;color:#333;font-size:16px;line-height:1.5;">
                <p>Olá! ✨</p>
                <p>
                  Estamos muito felizes que você entrou para a nossa newsletter.
                  Agora você receberá novidades, conteúdos fresquinhos e atualizações diretamente no seu e-mail.
                </p>

                <p style="margin-top:20px;">Beijos da equipe, Lunaris 💫</p>
              </td>
            </tr>
            <tr>
              <td style="background:#f4f4f7;color:#555;font-size:12px;padding:15px;text-align:center;">
                Você recebeu este e-mail porque se inscreveu em nossa newsletter.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;


// Rota para newsletter
app.post('/subscribers', async (req, res) => {
  const { email } = req.body;
  console.log('Email recebido:', email);


  if (!email) 
    return res.status(400).json({ error: 'Email é obrigatório' });

// Salva no BD
const { data, error } = await supabase
  .from('subscribers')
  .insert([{ email }]);

if (error) {
  console.log('Erro Supabase:', error);
  if (error.code === '23505') 
    return res.status(400).json({ success: false, message: 'Email já cadastrado' });

  return res.status(500).json({ success: false, message: error.message });
}

try {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Obrigada por se inscrever no nosso Newsletter! 💜",
    html: emailHTML,
  });
} catch (err) {
  console.error("Erro ao enviar email:", err);
}

  res.json({ success: true, message: 'Inscrição realizada e email enviado!' });
});

// Start do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
