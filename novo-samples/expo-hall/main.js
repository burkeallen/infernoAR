let landingPageEl = document;
let ntarDirectoryCategories = [];
let ntarDirectoryList = [];
let ntarCategoryList = [];

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.onload = resolve
    script.onerror = reject
    script.src = src
    document.head.append(script)
  })
}

const fetchData = (url) => {
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

const loadScripts = () => {
  loadScript('category.js')
    .then(() => {
      console.log('category loaded')
    });

  loadScript('banner-carousel.js')
    .then(() => {
      console.log('banner carousel loaded')
    });

  loadScript('pdf-overlay.js')
    .then(() => {
      console.log('PDF Overlay loaded')
    });

}

fetchData('./directory.json')
  .then(DATA => {
    ntarDirectoryCategories = DATA.categories;
    ntarDirectoryList = DATA.directory;
    loadScripts();
  });

