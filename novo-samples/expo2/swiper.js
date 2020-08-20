const carousel = new Swiper('.swiper-container', {
  autoHeight: true,
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  grabCursor: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});

carousel.appendSlide([
  buildImageSlide('banner1.jpg'),
  buildImageSlide('banner2.jpg'),
  buildImageSlide('banner3.png'),
  buildImageSlide('banner4.webp'),
]);

function buildImageSlide(filename) {
  const baseRef = 'https://studio304nextechar.freetls.fastly.net/infernoAR/avc/assets/placeholder/';
  const img = baseRef + filename;
  return '<div class="swiper-slide"><img class="novo-swiper-image" src="' + img + '"></div>';
}
