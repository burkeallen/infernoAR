class Expo {
  constructor() {
    this.data = {};
  }

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.onload = resolve;
      script.onerror = reject;
      script.src = src;
      document.head.append(script);
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
      document.head.append(styleSheet);
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

  init(title, placeholder) {
    Promise.all([
      this.loadScript('https://unpkg.com/swiper/swiper-bundle.min.js'),
      this.loadScript('swiper.js'),
      this.loadScript('searchbar.js'),
    ])
      .then(() => {
        new NovoSwiper(this.data.slides);
        new NovoSearchBar(this.data.sponsors, title, placeholder);
      });

    this.loadStyleSheet('https://unpkg.com/swiper/swiper-bundle.min.css');
    this.loadStyleSheet('expo.css');
    this.loadStyleSheet('swiper.css');
  }


}
