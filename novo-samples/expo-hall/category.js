<!-- Category Selection and Search -->

let ntarCategoryList = [];

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
  const buttons = landingPageEl.querySelectorAll('.ntar-category-btn');
  for (let x = 0; x < buttons.length; x++) {
    if (x < ntarDirectoryCategories.length) {
      buttons[x].innerText = ntarDirectoryCategories[x].name.toUpperCase();
      buttons[x].id = 'ntar-cat-btn-' + x;
      // ntarCategoryList.push(ntarDirectoryCategories[x].filter);
    } else {
      buttons[x].style.display = 'none';
    }
  }
}

function ntarInitializeDirectory() {
  const cards = ntarGetItemList();
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

// after document is loaded initialize the categories
document.addEventListener("DOMContentLoaded", function(event) {
  ntarInitializeCategories();
  setTimeout(ntarInitializeDirectory, 250);
});

<!-- ./ Category Selection and Search -->
