class NovoSearchBar {
  constructor(data, title, placeholder) {
    this.data = data;
    console.log(this.data);
    this.init(title, placeholder);
    this.landingPageEl = (typeof landingPageEl === 'undefined') ? document : landingPageEl;

  }

  search() {
    const input = this.landingPageEl.querySelector('#novosearch');

    if (!input) {
      this.displayFound(this.data);
      return;
    }

    const searchString = input.value.toLowerCase();

    const listData = this.data.filter(item => {
      return item.category.toLowerCase().includes(searchString)
        || item.name.toLowerCase().includes(searchString)
        || item.description.toLowerCase().includes(searchString);
    });
    this.hideAll();
    this.displayFound(listData);
  }

  displayFound(listData) {
    listData.forEach(item => {
      const el = this.landingPageEl.querySelector(this.getElementId(item.name));
      console.log('display ' + item.name, el);
      el.style.display = 'block';
    })

  }

  hideAll() {
    this.data.forEach(item => {
      const el = this.landingPageEl.querySelector(this.getElementId(item.name));
      console.log('hide ' + item.name, el);
      el.style.display = 'none';
    })
  }


  getElementId(name) {
    const searchRegExp = /\s/g;
    const replaceWith = '-';
    const id = '#novo-' + name.replace(searchRegExp, replaceWith);
    console.log('element id ', id);
    return id;
  }

  init(title, placeholder) {
    const searchTitle = this.landingPageEl.querySelector('#novo-search-title');
    searchTitle.innerHTML = '<span class="novo-search-title">' + title + '</span>';

    const searchBarInput = this.landingPageEl.createElement('input');
    searchBarInput.type = 'text';
    searchBarInput.name = 'novosearch';
    searchBarInput.id = 'novosearch';
    searchBarInput.className = 'novo-search-input';
    searchBarInput.placeholder = placeholder;
    searchBarInput.addEventListener('input',
      (event) => {
        console.log('event', event);
        this.search(event.data);
      });

    const searchContainer = this.landingPageEl.querySelector('#novo-search-container');
    searchContainer.appendChild(searchBarInput)

  }
}
