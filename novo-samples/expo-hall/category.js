<!-- Category Selection and Search -->

function ntarGetItemList() {
  return landingPageEl.querySelectorAll('.ntar-directory-card');
}

function ntarRefreshFilters() {
  let cards = ntarGetItemList();
  let noResultsDiv = landingPageEl.querySelector('#ntar-no-category-results');
  let resultsCount = 0;
  for (let x = 0; x < cards.length; x++) {
    if (x < ntarDirectoryList.length) {
      if (ntarCategoryList.includes(ntarDirectoryList[x].category)) {
        cards[x].style.display = 'none';
      } else {
        cards[x].style.display = 'block';
        resultsCount = resultsCount + 1;
      }
    } else {
      cards[x].style.display = 'none';
    }
  }
  if (resultsCount === 0) {
    noResultsDiv.classList.add('is-active');
  } else {
    noResultsDiv.classList.remove('is-active');
  }
}

function ntarToggleCategoryFilter(categoryNumber) {
  const ntarCategoryButton = landingPageEl.querySelector('#ntar-cat-btn-' + categoryNumber);
  if (ntarCategoryList.includes(ntarDirectoryCategories[categoryNumber].filter)) {
    ntarCategoryList.splice(
      ntarCategoryList.indexOf(ntarDirectoryCategories[categoryNumber].filter),
      1
    );
    ntarCategoryButton.classList.remove('ntar-is-active');
  } else {
    ntarCategoryList.push(ntarDirectoryCategories[categoryNumber].filter);
    ntarCategoryButton.classList.add('ntar-is-active');
  }
  ntarRefreshFilters();
}

function ntarResetCategoryFilter() {
  ntarCategoryList = [];
  const buttons = landingPageEl.querySelectorAll('.ntar-category-btn');
  buttons.forEach(button => {
    button.classList.remove('ntar-is-active');
  });
  ntarRefreshFilters();
}

function ntarInitializeCategories() {
  console.log('ntarDirectoryCategories', ntarDirectoryCategories);
  const buttons = landingPageEl.querySelectorAll('.ntar-category-btn');
  for (let x = 0; x < buttons.length; x++) {
    if (x < ntarDirectoryCategories.length) {
      buttons[x].innerText = ntarDirectoryCategories[x].name.toUpperCase();
      buttons[x].id = 'ntar-cat-btn-' + x;
    } else {
      buttons[x].style.display = 'none';
    }
  }
}

function ntarInitializeDirectory() {
  const cards = ntarGetItemList();
  console.log('ntarDirectoryList', ntarDirectoryList);
  for (let x = 0; x < cards.length; x++) {
    if (x < ntarDirectoryList.length) {
      cards[x].id = 'ntar-dir-' + x;
      let img = landingPageEl.querySelector('#ntar-dir-' + x + ' div img');
      img.src = ntarDirectoryList[x].img;
    } else {
      cards[x].style.display = 'none';
    }
  }
}


function ntarExhibSearchUpdate() {
  // Get Elements
  const ntarExhibSearchDiv = landingPageEl.querySelector('.ntar-directory-search');
  const ntarExhibSearchInput = landingPageEl.querySelector('#exhib-search');

  if (ntarCategoryList !== []) {
    ntarResetCategoryFilter();
  }

  let resultCount = 0;
  const exhibCards = ntarGetItemList();
  const noResultsDiv = landingPageEl.querySelector('#ntar-no-search-results');
  const searchString = ntarExhibSearchInput.value.toLowerCase();

  // Set Input Status
  if (searchString === '') {
    ntarExhibSearchDiv.classList.remove('is-active');
  } else {
    ntarExhibSearchDiv.classList.add('is-active');
  }

  // Filter Directory
  ntarDirectoryList.forEach( (item, index) => {
    if (
      item.brand.toLowerCase().includes(searchString) ||
      item.keywords.toLowerCase().includes(searchString)
    ) {
      exhibCards[index].style.display = 'block';
      resultCount += 1;
    } else {
      exhibCards[index].style.display = 'none';
    }
  });

  // Display No Result Div
  if (resultCount === 0) {
    noResultsDiv.classList.add('is-active');
  } else {
    noResultsDiv.classList.remove('is-active');
  }
}

function ntarClearExhibSearch() {
  const ntarExhibSearchInput = landingPageEl.querySelector('#exhib-search');
  ntarExhibSearchInput.value = '';
  ntarExhibSearchUpdate();
}


ntarInitializeCategories();
setTimeout(ntarInitializeDirectory, 250);

