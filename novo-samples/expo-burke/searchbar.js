// Copyright 2020 NovoLogic, Inc.
/**
 * @author Burke Allen - NovoLogic, Inc.
 */
window.NovoSearchBar = (window.NovoSearchBar || (class NovoSearchBar {
  constructor(config) {
    this.config = config;
    this.shadowRoot = config.shadowRoot;
    this.container = this.shadowRoot.querySelector(config.container);
    this.data = config.sponsors;
    this.init();
  }

  init() {
    const searchBar = this.createSearchBarContainer();
    const searchTitle = this.createSearchTitle(this.config.title);
    const searchInput = this.createSearchInput(this.config.placeholder);
    searchBar.appendChild(searchTitle);
    searchBar.appendChild(searchInput);
    this.container.appendChild(searchBar);
  }

  createSearchBarContainer() {
    const searchContainer = document.createElement('div');
    searchContainer.id = 'novo-search-bar-container';
    return searchContainer;
  }

  createSearchTitle(title) {
    const searchTitle = document.createElement('div');
    searchTitle.id = 'novo-search-title';
    searchTitle.innerHTML = '<span class="novo-search-title">' + title + '</span>';
    return searchTitle;
  }

  createSearchInput(placeholder) {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.name = 'novosearch';
    searchInput.id = 'novosearch';
    searchInput.className = 'novo-search-input';
    searchInput.placeholder = placeholder;
    searchInput.addEventListener('input',
      (event) => {
        this.search(event.data);
      });
    return searchInput;
  }

  search() {
    const input = this.shadowRoot.querySelector('#novosearch');

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
      const el = this.shadowRoot.querySelector(this.getElementId(item.name));
      el.style.display = 'block';
    })

  }

  hideAll() {
    this.data.forEach(item => {
      const el = this.shadowRoot.querySelector(this.getElementId(item.name));
      el.style.display = 'none';
    })
  }


  getElementId(name) {
    const searchRegExp = /\s/g;
    const replaceWith = '-';
    const id = '#novo-' + name.replace(searchRegExp, replaceWith);
    return id;
  }

}));
