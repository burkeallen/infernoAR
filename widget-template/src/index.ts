import axios from 'axios'
import {Header, Slides} from './header'
// @ts-ignore
import styles from './styles.scss'
import {Body} from './body';
import {Footer} from './footer';

interface Config {
  title?: string;
  url?: string;
}

class NovoWidget {
  private config: Config;
  private widget: Element;

  constructor() {
    this.widget = window['landingPageEl'].querySelector('novo-widget');
    this.config = this.getConfig();
    this.loadStyles();
  }

  init() {
    const protocol = this.isHTTPS() ? 'https://' : 'http://';
    const URL = protocol + this.config.url + this.config.title;
    axios.get(URL).then(res => {
      this.build(res.data);
    });
  }

  loadStyles() {
    const style = document.createElement('style');
    style.textContent = styles;
    window['landingPageEl'].appendChild(style);
  }

  getConfig(): Config {
    let config: Config = {
      title: '',
      url: '',
    };
    const names = this.widget.getAttributeNames();
    names.forEach(tag => {
      const property = tag.replace('data-', '');
      config[property] = this.widget.getAttribute(tag);
    })
    console.log(config);
    return config;
  }

  build(data: any) {
    const slides: Slides = [
      {
        image: 'https://studio304nextechar.freetls.fastly.net/infernoAR/avc/assets/placeholder/banner1.jpg'
      },
      {
        image: 'https://studio304nextechar.freetls.fastly.net/infernoAR/avc/assets/placeholder/banner2.jpg'
      },
      {
        image: 'https://studio304nextechar.freetls.fastly.net/infernoAR/avc/assets/placeholder/banner3.png'
      }
    ]

    const title = `<h1>${this.config.title}</h1>`;
    this.widget.innerHTML = title;

    const header = new Header(this.widget, slides);
    this.widget.innerHTML += header.build(data);
    header.init();

    const body = new Body();
    this.widget.innerHTML += body.build();

    const footer = new Footer();
    this.widget.innerHTML += footer.build();


  }

  private isHTTPS() {
    return window.location.protocol === 'https:';
  }

}

export {NovoWidget}

const widget = new NovoWidget();
widget.init();

