const carouselInner = document.querySelector('#mockupCarousel .carousel-inner');

let isDragging = false;
let startX = 0;
let currentTranslate = 0;

carouselInner.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX;
});

carouselInner.addEventListener('mouseup', (e) => {
  if (!isDragging) return;
  const diff = e.pageX - startX;
  if (diff > 50) {
    // arrasta pra direita → slide anterior
    const prevButton = document.querySelector('#mockupCarousel .carousel-control-prev');
    prevButton?.click();
  } else if (diff < -50) {
    // arrasta pra esquerda → slide próximo
    const nextButton = document.querySelector('#mockupCarousel .carousel-control-next');
    nextButton?.click();
  }
  isDragging = false;
});

carouselInner.addEventListener('mouseleave', () => {
  isDragging = false;
});

carouselInner.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
});
