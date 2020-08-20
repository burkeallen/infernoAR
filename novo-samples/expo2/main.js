let novoData = {};

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = resolve;
    script.onerror = reject;
    script.src = src;
    document.head.append(script);
  });
}

function loadStyleSheet(src) {
  return new Promise((resolve, reject) => {
    const styleSheet = document.createElement('link');
    styleSheet.type = 'text/css';
    styleSheet.rel = 'stylesheet';
    styleSheet.onload = resolve;
    styleSheet.onerror = reject;
    styleSheet.href = src;
    document.head.append(styleSheet);
  });
}

function fetchData(url) {
  return new Promise((resolve, reject) => {
    fetch(url, {mode: 'no-cors'})
      .then(response => response.text())
      .then(result => {
        resolve(JSON.parse(result));
      })
      .catch(err => {
        console.error('error', err);
        reject(Error(err));
      });
  });
}

function loadScripts() {
  loadScript('https://unpkg.com/swiper/swiper-bundle.min.js')
    .then(() => {
      loadScript('swiper.js');
    });

  loadStyleSheet('https://unpkg.com/swiper/swiper-bundle.min.css')
    .then(() => {
      loadStyleSheet('swiper.css');
    });

}

novoData = fetchData('./directory.json')
  .then(DATA => {
    loadScripts();
    return novoData;
  });

