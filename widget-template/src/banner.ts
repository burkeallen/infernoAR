import {Autoplay, Navigation, Pagination, Swiper} from 'swiper'

Swiper.use([Autoplay, Navigation, Pagination]);

class Banner {
  swiper: Swiper;
  widget: Element;

  constructor(widget: Element) {
    this.widget = widget;
  }

  init() {
    const container = this.widget.querySelector('.swiper-container');
    // @ts-ignore
    this.swiper = new Swiper(container, this.swiperConfig());
  }

  build(data: any) {
    return `
    <div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide"><img alt="sponsor banner" class="novo-swiper-image" src="https://studio304nextechar.freetls.fastly.net/infernoAR/avc/assets/placeholder/banner1.jpg"></div>
        <div class="swiper-slide"><img alt="sponsor banner" class="novo-swiper-image" src="https://studio304nextechar.freetls.fastly.net/infernoAR/avc/assets/placeholder/banner2.jpg"></div>
        <div class="swiper-slide"><img alt="sponsor banner" class="novo-swiper-image" src="https://studio304nextechar.freetls.fastly.net/infernoAR/avc/assets/placeholder/banner3.png"></div>
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    </div>
   `
  }


  buildStatic(image) {
    return '<div class="swiper-slide"><img alt="sponsor banner" class="novo-swiper-image" src="' + image + '"></div>';
  }

  swiperConfig() {

    return {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      grabCursor: true,
      preventClicks: false,
      preventClicksPropagation: false,
      uniqueNavElements: false,
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

export {Banner}
