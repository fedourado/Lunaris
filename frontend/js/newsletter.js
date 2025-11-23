document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('newsletter-form');
  const msg = document.getElementById('newsletter-msg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.email.value;

    try {
      const res = await fetch('https://lunaris-uwto.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email.value })
      })

      const data = await res.json();
      msg.textContent = data.message || data.error;
      msg.style.color = data.success ? 'lightgreen' : 'tomato';
      if (data.success) form.reset();
    } catch (err) {
      console.error('Erro no fetch:', err);
      msg.textContent = 'Erro no envio, tente novamente.';
      msg.style.color = 'tomato';
    }
  });
});
