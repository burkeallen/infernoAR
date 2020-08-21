class NovoSearchBar {
  constructor(data, title, placeholder) {
    this.data = data;
    console.log(this.data);
    this.init(title, placeholder);
  }

  search() {
    const input = document.querySelector('#novosearch');
    const searchString = input.value.toLowerCase();

    const listData = this.data.filter(item => {
      return item.category.toLowerCase().includes(searchString)
        || item.name.toLowerCase().includes(searchString)
        || item.description.toLowerCase().includes(searchString);
    });
    console.log('searchResults', listData);
    return listData;
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
