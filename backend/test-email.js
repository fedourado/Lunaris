const { sendEmail } = require('./index.js');

sendEmail('fehddm@gmail.com')
  .then(() => console.log('Email enviado com sucesso!'))
  .catch(err => console.error('Erro ao enviar email:', err));
