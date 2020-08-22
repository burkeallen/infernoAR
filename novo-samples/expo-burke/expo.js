// Copyright 2020 NovoLogic, Inc.
/**
 * @author Burke Allen - NovoLogic, Inc.
 */

class NovoExpo {
  constructor(baseURL) {
    this.data = {};
    this.baseURL = baseURL ? baseURL : location.href.replace(/[^/]*$/, '');
    this.landingPageEl = (typeof landingPageEl === 'undefined') ? document : landingPageEl;
  }

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = this.landingPageEl.createElement('script');
      script.type = 'text/javascript';
      script.onload = resolve;
      script.onerror = reject;
      script.src = src;
      this.landingPageEl.head.append(script);
    });
  }

  loadStyleSheet(src) {
    return new Promise((resolve, reject) => {
      const styleSheet = this.landingPageEl.createElement('link');
      styleSheet.type = 'text/css';
      styleSheet.rel = 'stylesheet';
      styleSheet.onload = resolve;
      styleSheet.onerror = reject;
      styleSheet.href = src;
      this.landingPageEl.head.append(styleSheet);
      resolve(true);
    });
  }

  fetchData(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.text())
        .then(result => {
          const data = JSON.parse(result);
          this.data = data;
          resolve(data);
        })
        .catch(err => {
          console.error('error', err);
          reject(Error(err));
        });
    });
  }

  init(labels) {
    Promise.all([
      this.loadScript(this.baseURL + 'grid.js'),
      this.loadScript(this.baseURL + 'sponsor.js'),
      this.loadScript(this.baseURL + 'searchbar.js'),
      this.loadScript('https://unpkg.com/swiper/swiper-bundle.min.js'),
      this.loadScript(this.baseURL + 'swiper.js'),
    ])
      .then(() => {
        console.log('labels', labels);

        new NovoSwiper(this.data.slides);
        new NovoSearchBar(this.data.sponsors, labels.expoTitle, labels.searchPlaceholder);
        const sponsor = new NovoSponsor(labels.featuredTitle, labels.standardTitle);
        sponsor.displayList(this.data.sponsors);
      });

    this.loadStyleSheet('https://unpkg.com/swiper/swiper-bundle.min.css');
    this.loadStyleSheet(this.baseURL + 'expo.css');
    this.loadStyleSheet(this.baseURL + 'swiper.css');
    this.loadStyleSheet(this.baseURL + 'grid.css');

    this.setBackground();
  }

  setBackground(url) {
    url = url ? url : './bkg.jpg';
    const container = this.landingPageEl.querySelector('#novo-container');
    if(container) {
      container.style.backgroundImage = "url('" + url + "')";
    }

  }

}
