import { Blocks } from '../components/blocks/blocks';
import { About } from '../components/about/about';
import { Hero } from '../components/hero/hero';
import { Contact } from '../components/contact/contact';
import { SkewedSection } from '../components/skewed-section/skewed-section';
import { WhyUs } from '../components/why-us/why-us';
import { initNav } from './ts-inits/init-nav';
import { onDomContentLoad } from 'toolbox/utils/dom/on-dom-content-load';
import { forEach } from 'toolbox/utils/node-list/for-each';
import { LazyLoadedBackgroundImage } from 'toolbox/components/lazy-loaded-image/lazy-loaded-background-image';
import { generateContentfulImageUrl } from 'toolbox/utils/contentful/generate-contentful-image-url';

const blocks = new Blocks();
const about = new About();
const hero = new Hero();
const contact = new Contact();
const skewedSection = new SkewedSection();
const whyUs = new WhyUs();

forEach(document.querySelectorAll('.lazy-load'), image => {
  LazyLoadedBackgroundImage.fireAndForget(
    <HTMLImageElement>image,
    generateContentfulImageUrl((<HTMLImageElement>image).dataset.src),
    {
      getLoadedCssClass: image => {
        return `${image.classList[0]}--reveal`;
      }
    }
  );
});

// No need to use the returned promise
const _unused = onDomContentLoad(() => {
  blocks.init();
  initNav();
  about.init();
  hero.init();
  contact.init();
  skewedSection.startScrollEffect();
  whyUs.init();
});
