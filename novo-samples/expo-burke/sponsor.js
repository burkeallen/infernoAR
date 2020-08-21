class NovoSponsor {
  constructor() {
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
    const parent = document.querySelector('#novo-featured-container');
    const title = document.createElement('h1');
    title.innerHTML = "Featured";
    parent.appendChild(title);

    featured.forEach(item => {
      const sponsor = document.createElement('h3');
      sponsor.id = this.setElementId(item.name);
      sponsor.innerHTML = item.name;
      parent.appendChild(sponsor)
    });
  }

  displayStandard(standard) {
    const parent = document.querySelector('#novo-sponsor-list-container');
    const title = document.createElement('h1');
    title.innerHTML = "Exhibitors";
    parent.appendChild(title);

    standard.forEach(item => {
      const sponsor = document.createElement('h3');
      sponsor.innerHTML = item.name;
      sponsor.id = this.setElementId(item.name);
      parent.appendChild(sponsor)
    });
  }

  setElementId(name) {
    const searchRegExp = /\s/g;
    const replaceWith = '-';
    const id = 'novo-' + name.replace(searchRegExp, replaceWith);
    console.log('element id ', id);
    return id;
  }

}
