// Copyright 2020 NovoLogic, Inc.
/**
 * @author Burke Allen - NovoLogic, Inc.
 */

window.NovoExpo = (window.NovoExpo || (class NovoExpo {
  constructor(config = {}) {
    this.config = config;
    this.data = {};
    this.shadowRoot = {};
    this.expoContainer = null;
    this.page = null;
    this.init();
  }

  init() {
    this.shadowRoot = this.config.shadowRoot;
    this.page = this.shadowRoot.querySelector('#novo-page');
    this.expoContainer = this.createContainer();
    this.sayHello();
    this.loadStyles();
    if (this.scriptsExist()) {
      this.createExpo();
    } else {
      this.loadScripts().then(() => this.createExpo());
    }
  }

  sayHello() {
    console.log(`
      ********************************************************
      ** Expo Hall is managed by NovoLogic, Inc.
      ** https://novologic.com/retain-longer/virtual-events-and-conferences/
      ********************************************************
    `);
    // console.log('Novo Expo Hall Config', this.config);
  }

  loadStyles() {
    const url = this.config.baseURL ? this.config.baseURL : location.href.replace(/[^/]*$/, '');
    this.loadStyleSheet('//unpkg.com/swiper/swiper-bundle.min.css');
    this.loadStyleSheet(url + 'grid.css');
    this.loadStyleSheet(url + 'swiper.css');
    this.loadStyleSheet(url + 'expo.css');
  }

  loadScripts() {
    const url = this.config.baseURL ? this.config.baseURL : location.href.replace(/[^/]*$/, '');
    this.loadStyleSheet('//unpkg.com/swiper/swiper-bundle.min.css');
    this.loadStyleSheet(url + 'grid.css');
    this.loadStyleSheet(url + 'swiper.css');
    this.loadStyleSheet(url + 'expo.css');

    return Promise.all([
      this.loadScript('//unpkg.com/swiper/swiper-bundle.min.js'),
      this.loadScript(url + 'sponsor.js'),
      this.loadScript(url + 'searchbar.js'),
      this.loadScript(url + 'swiper.js'),
    ]);
  }

  scriptsExist() {
    if (!!window.Swiper
      && !!window.NovoSponsor
      && !!window.NovoSearchBar
      && !!window.NovoSwiper) {
      return true;
    }
    console.log('need to fetch novo scripts');
    return false;
  }

  async createExpo() {
    const url = this.config.dataURL + '?client=' + this.config.client;
    this.data = await this.fetchData(url);
    this.shadowRoot.getElementById('novo-loading').remove();
    this.createSlides();
    this.createSearchBar();
    this.createSponsorGrid();
  }

  createSlides() {
    new NovoSwiper({
      "shadowRoot": this.shadowRoot,
      "container": '#novo-container',
      "slides": this.data.slides
    });
  }

  createSearchBar() {
    new NovoSearchBar({
      "shadowRoot": this.shadowRoot,
      "container": '#novo-container',
      "sponsors": this.data.sponsors,
      "title": this.config.expoTitle,
      "placeholder": this.config.searchPlaceholder
    });
  }

  createSponsorGrid() {
    new NovoSponsor({
      "shadowRoot": this.shadowRoot,
      "container": '#novo-container',
      "sponsors": this.data.sponsors,
      "featuredTitle": this.config.featuredTitle,
      "standardTitle": this.config.standardTitle
    });
  }

  createContainer() {
    // this.removePreviousWrapperInstance();
    const container = document.createElement('div');
    container.id = 'novo-container';
    container.style.backgroundImage = 'url("' + this.config.backgroundImage + '")';
    container.style.color = this.config.color;
    container.innerHTML = '<h1 id="novo-loading">Loading Expo Hall......</h1>';
    return this.page.appendChild(container);
  }


  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.onload = resolve;
      script.onerror = reject;
      script.src = src;
      this.page.appendChild(script);
    });
  }

  loadStyleSheet(src) {
    return new Promise((resolve, reject) => {
      const styleSheet = document.createElement('link');
      styleSheet.type = 'text/css';
      styleSheet.rel = 'stylesheet';
      styleSheet.onload = resolve;
      styleSheet.onerror = reject;
      styleSheet.href = src;
      this.page.appendChild(styleSheet);
      resolve(true);
    });
  }

  async fetchData(url) {
    return await fetch(url)
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .catch(error => console.error(error));
  }

}));
