require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

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
  res.sendFile(path.join(__dirname, '../html/index.html'));
});

// Conexão com Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


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
