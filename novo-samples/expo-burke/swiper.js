class NovoSwiper {
  constructor(slides) {
    this.initCarousel(slides);
  }

  initCarousel(slides) {
    const carousel = new Swiper('.swiper-container', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      grabCursor: true,
      preventClicks: false,
      preventClicksPropagation: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });

    slides.forEach(item => {
      carousel.appendSlide([this.buildSlide(item.image, item.url)]);
    });
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

}





