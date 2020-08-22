// Copyright 2020 NovoLogic, Inc.
/**
 * @author Burke Allen - NovoLogic, Inc.
 */

class NovoGrid {
  constructor() {
    this.landingPageEl = (typeof landingPageEl === 'undefined') ? document : landingPageEl;
  }

  buildGrid() {
    const grid = this.landingPageEl.createElement('div');
    grid.className = 'novo-grid'
    return grid;
  }

  buildSponsorCard(item) {
    const card = this.landingPageEl.createElement('article');
    const cardInfoHover = this.landingPageEl.createElement('div');
    const cardDesc = this.landingPageEl.createElement('span');
    const cardImg = this.landingPageEl.createElement('div');
    const cardLink = this.landingPageEl.createElement('a');
    const cardImgHover = this.landingPageEl.createElement('div');
    const cardInfo = this.landingPageEl.createElement('div');
    const cardCategory = this.landingPageEl.createElement('span');
    const cardTitle = this.landingPageEl.createElement('h3');

    card.appendChild(cardInfoHover);
    cardInfoHover.appendChild(cardDesc);
    card.appendChild(cardImg);
    card.appendChild(cardLink);
    cardLink.appendChild(cardImgHover);
    card.appendChild(cardInfo);
    cardInfo.appendChild(cardCategory);
    cardInfo.appendChild(cardTitle);

    card.className = 'novo-card';
    if (item.size.toLowerCase() === 'large') {
      card.style.gridColumn = 'span 2';
    }
    cardInfoHover.className = 'novo-card-info-hover';
    cardDesc.className = 'novo-card-desc';
    cardImg.className = 'novo-card-img';
    cardLink.className = 'novo-card-link';
    cardImgHover.className = 'novo-card-img-hover';
    cardInfo.className = 'novo-card-info';
    cardCategory.className = 'novo-card-category';
    cardTitle.className = 'novo-card-title';

    cardDesc.innerText = item.description;
    cardCategory.innerText = item.category;
    cardTitle.innerText = item.name;
    cardLink.href =  item.url ? item.url : '#';
    cardLink.target = '_blank';

    cardImg.style.backgroundImage = 'url("' + item.thumbnail + '")';
    cardImgHover.style.backgroundImage = 'url("' + item.thumbnail + '")';

    return card;
  }

}
