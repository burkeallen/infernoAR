// Copyright 2020 NovoLogic, Inc.
/**
 * @author Burke Allen - NovoLogic, Inc.
 */
window.NovoSponsor = (window.NovoSponsor || (class NovoSponsor {
  constructor(config) {
    this.config = config;
    this.shadowRoot = config.shadowRoot;
    this.container = this.shadowRoot.querySelector(config.container);
    this.featureContainer = null;
    this.standardContainer = null;
    this.featureGridContainer = null;
    this.standardGridContainer = null;
    this.featuredTitle = config.featuredTitle ? config.featuredTitle : 'Featured';
    this.standardTitle = config.standardTitle ? config.standardTitle : 'Others';
    this.init();
  }

  init() {
    const sponsorContainer = this.createContainer('novo-sponsor-container');
    this.featureContainer = this.createContainer('novo-featured-container');
    this.featureContainer.innerHTML = '<h1>' + this.featuredTitle + '</h1>';
    const featureGrid = this.buildGrid('novo-grid');

    this.config.sponsors.forEach(item => {
      if (item.featured) {
        const sponsor = this.buildSponsorCard(item);
        sponsor.id = this.setElementId(item.name);
        featureGrid.appendChild(sponsor);
      }
    });
    this.featureContainer.appendChild(featureGrid);


    // standard grid
    this.standardContainer = this.createContainer('novo-standard-container');
    this.standardContainer.innerHTML = '<h1>' + this.standardTitle + '</h1>';

    const standardGrid = this.buildGrid('novo-grid');

    this.config.sponsors.forEach(item => {
      if (!item.featured) {
        const sponsor = this.buildSponsorCard(item);
        sponsor.id = this.setElementId(item.name);
        standardGrid.appendChild(sponsor);
      }
    });
    this.standardContainer.appendChild(standardGrid);

    sponsorContainer.appendChild(this.featureContainer);
    sponsorContainer.appendChild(this.standardContainer);

    this.container.appendChild(sponsorContainer);

  }

  createContainer(id) {
    const sponsorContainer = document.createElement('div');
    sponsorContainer.id = id;
    return sponsorContainer;
  }

  displayList(data) {
    const featured = data.filter(item => {
      return item.featured;
    });

    const standard = data.filter(item => {
      return !item.featured;
    });

    this.displayFeatured(featured);
    this.displayStandard(standard);

  }

  displayFeatured(featured) {
    const title = document.createElement('h1');
    title.innerText = this.featuredTitle;
    this.featureContainer.appendChild(title);
    this.featureContainer.appendChild(this.featureGridContainer);

    featured.forEach(item => {
      const sponsor = this.buildSponsorCard(item);
      sponsor.id = this.setElementId(item.name);
      this.featureGridContainer.appendChild(sponsor);
    });
  }

  displayStandard(standard) {
    const title = document.createElement('h1');
    title.innerText = this.standardTitle;
    this.standardContainer.appendChild(title);
    this.standardContainer.appendChild(this.standardGridContainer);

    standard.forEach(item => {
      const sponsor = this.buildSponsorCard(item);
      sponsor.id = this.setElementId(item.name);
      this.standardGridContainer.appendChild(sponsor);
    });
  }

  setElementId(name) {
    const searchRegExp = /\s/g;
    const replaceWith = '-';
    const id = 'novo-' + name.replace(searchRegExp, replaceWith);
    return id;
  }

  buildGrid(className) {
    const grid = document.createElement('div');
    grid.className = className;
    return grid;
  }

  buildSponsorCard(item) {
    const card = document.createElement('article');
    const cardInfoHover = document.createElement('div');
    const cardDesc = document.createElement('div');
    const cardImg = document.createElement('div');
    const cardLink = document.createElement('a');
    const cardImgHover = document.createElement('div');
    const cardInfo = document.createElement('div');
    const cardCategory = document.createElement('span');
    const cardTitle = document.createElement('h3');

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
      card.className += ' novo-large-sponsor';
    }
    if (item.size.toLowerCase() === 'medium') {
      card.className += ' novo-medium-sponsor';
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
    cardLink.href = item.url ? item.url : '#';
    cardLink.target = '_blank';

    cardImg.style.backgroundImage = 'url("' + item.thumbnail + '")';
    cardImgHover.style.backgroundImage = 'url("' + item.thumbnail + '")';

    return card;
  }


}));
