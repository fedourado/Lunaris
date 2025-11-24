document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('newsletter-form');
  const msg = document.getElementById('newsletter-msg');
  const emailInput = form.email;


  emailInput.addEventListener('input', () => {
  msg.textContent = '';
  });


  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = "Enviando...";

    try {
      const res = await fetch('https://lunaris-uwto.onrender.com/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput.value })
      })

      let data;
      try {
        data = await res.json(); // tenta ler o JSON
      } catch {
        data = { success: false, message: 'Resposta inválida do servidor' };
      }

      msg.textContent = data.message || data.error;
      msg.style.color = data.success ? 'lightgreen' : 'tomato';

      if (data.success) {
      form.reset();
      setTimeout(() => { msg.textContent = '' }, 3000); 
      }

    } catch (err) {
      console.error('Erro no fetch:', err);
      msg.textContent = 'Erro no envio, tente novamente.';
      msg.style.color = 'tomato';
    }
  });
});
