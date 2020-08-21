class NovoSearchBar {
  constructor(data, title, placeholder) {
    this.data = data;
    console.log(this.data);
    this.init(title, placeholder);
  }

  search() {
    const input = document.querySelector('#novosearch');

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
      const el = document.querySelector(this.getElementId(item.name));
      console.log('display ' + item.name, el);
      el.style.display = 'block';
    })

  }

  hideAll() {
    this.data.forEach(item => {
      const el = document.querySelector(this.getElementId(item.name));
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
    const searchTitle = document.querySelector('#novo-search-title');
    searchTitle.innerHTML = '<span class="novo-search-title">' + title + '</span>';

    const searchBarInput = document.createElement('input');
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

    const searchContainer = document.querySelector('#novo-search-container');
    searchContainer.appendChild(searchBarInput)

  }
}
