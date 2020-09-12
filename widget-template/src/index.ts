import axios from 'axios'

import styles from './styles.scss'
import {Header, Slides} from './header'
import {Body} from './body';
import {Footer} from './footer';

interface Config {
  debug?: string;
  title?: string;
  url?: string;
}

class NovoWidget {
  private config: Config;
  private readonly widget: Element;
  private readonly debug: boolean

  constructor() {
    this.widget = window['landingPageEl'].querySelector('novo-widget');
    this.config = this.getConfig();
    this.debug = this.config.debug.toString().toLowerCase() === 'true';
    this.loadStyles();
  }

  init() {
    const protocol = this.isHTTPS() ? 'https://' : 'http://';
    const URL = protocol + this.config.url + this.config.title;
    if(this.debug) {
      console.log('URL', URL);
    }
    axios.get(URL).then(res => {
      if (this.debug) {
        console.log('data', res.data);
      }
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
    if (this.debug) {
      console.log('config', config);
    }
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

