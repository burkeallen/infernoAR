// Copyright 2020 NovoLogic, Inc.
/**
 * @author Burke Allen - NovoLogic, Inc.
 */

window.NovoSwiper = (window.NovoSwiper || (class NovoSwiper {
  constructor(config) {
    this.container = config.shadowRoot.querySelector(config.container);
    this.swiperContainer = this.createSwiperContainer();
    this.initCarousel(config.slides);
  }

  createSwiperContainer() {
    const swiperContainer = document.createElement('div');
    swiperContainer.className = 'swiper-container';
    swiperContainer.innerHTML = `
      <div class="swiper-wrapper"></div>
      <div class="swiper-pagination"></div>
    `;
    return this.container.appendChild(swiperContainer);
  }

  initCarousel(slides) {
    const container = this.container.querySelector('.swiper-container');
    const carousel = new Swiper(container, {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      grabCursor: true,
      preventClicks: false,
      preventClicksPropagation: false,
      uniqueNavElements: false,
      pagination: {
        el: this.container.querySelector('.swiper-pagination'),
        clickable: true,
      },
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      }
    });

    let swiperSlides = [];
    slides.forEach(item => {
      swiperSlides.push(this.buildSlide(item.image, item.url));
    });

    carousel.appendSlide(swiperSlides);

  }

  buildSlide(image, url) {
    return url ? this.buildClickable(image, url) : this.buildStatic(image);
  }

  buildClickable(image, url) {
    return '<a class="swiper-slide" href="' + url + '" target="_blank"><img alt="sponsor banner" class="novo-swiper-image" src="' + image + '"></a>';
  }

  buildStatic(image) {
    return '<div class="swiper-slide"><img alt="sponsor banner" class="novo-swiper-image" src="' + image + '"></div>';
  }

}));





