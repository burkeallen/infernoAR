import {Autoplay, Navigation, Pagination, Swiper} from 'swiper'

Swiper.use([Autoplay, Navigation, Pagination]);

interface Slide {
  image?: String;
  link?: String;
}
interface Slides extends Array<Slide>{}
export {Slide}
export {Slides}

class Header {
  swiper: Swiper;
  widget: Element;
  slides: Slides;

  constructor(widget: Element, slides: Slides) {
    this.widget = widget;
    this.slides = slides;
  }

  init() {
    const container = this.widget.querySelector('.swiper-container');
    // @ts-ignore
    this.swiper = new Swiper(container, this.swiperConfig());
  }

  build(data: any) {
    return `
    <div class="widget-header">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        ${this.buildSlides()}
      </div>
      <div class="swiper-pagination"></div>
      <span class="swiper-button-prev"></span>
      <span class="swiper-button-next"></span>
      <div class="swiper-scrollbar"></div>
    </div>
    </div>
   `
  }

  buildSlides() {
    let slideHTML = '';
    this.slides.forEach(slide => {
      slideHTML += this.buildStatic(slide.image);
    });
    return slideHTML;
  }

  buildStatic(image) {
    return `<div class="swiper-slide"><img alt="sponsor image" src="${image}"></div>`;
  }

  swiperConfig() {
    return {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      grabCursor: true,
      preventClicks: false,
      preventClicksPropagation: false,
      pagination: {
        el: this.widget.querySelector('.swiper-pagination'),
        clickable: true,
      },
      navigation: {
        nextEl: this.widget.querySelector('.swiper-button-next'),
        prevEl: this.widget.querySelector('.swiper-button-prev'),
      },
      autoplay: {
        delay: 3000
      }
    }
  }
}

export {Header}
