// Copyright 2020 NovoLogic, Inc.
/**
 * @author Burke Allen - NovoLogic, Inc.
 */

class NovoSponsor {
  constructor() {
    this.landingPageEl = (typeof landingPageEl === 'undefined') ? document : landingPageEl;
    this.featureContainer = null;
    this.standardContainer = null;
    this.featureGridContainer = null;
    this.standardGridContainer = null;
    this.featureGrid = null;
    this.standardGrid = null;
    this.init();
  }

  init() {
    this.featureContainer = this.landingPageEl.querySelector('#novo-featured-container');
    this.standardContainer = this.landingPageEl.querySelector('#novo-standard-container');
    this.featureGrid = new NovoGrid(this.featureContainer);
    this.standardGrid = new NovoGrid(this.standardContainer);
    this.featureGridContainer = this.featureGrid.buildGrid();
    this.standardGridContainer = this.standardGrid.buildGrid();
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
    const title = this.landingPageEl.createElement('h1');
    title.innerHTML = "Featured";
    this.featureContainer.appendChild(title);
    this.featureContainer.appendChild(this.featureGridContainer);

    featured.forEach(item => {
      const sponsor = this.featureGrid.buildSponsorCard(item);
      sponsor.id = this.setElementId(item.name);
      this.featureGridContainer.appendChild(sponsor);
    });
  }

  displayStandard(standard) {
    const title = this.landingPageEl.createElement('h1');
    title.innerHTML = "Exhibitors";
    this.standardContainer.appendChild(title);
    this.standardContainer.appendChild(this.standardGridContainer);

    standard.forEach(item => {
      const sponsor = this.standardGrid.buildSponsorCard(item);
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

}
