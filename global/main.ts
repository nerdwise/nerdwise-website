import { Blocks } from '../components/blocks/blocks';
import { Nav } from '../components/nav/nav';
import { About } from '../components/about/about';
import { Hero } from '../components/hero/hero';
import { Contact } from '../components/contact/contact';
import { SkewedSection } from '../components/skewed-section/skewed-section';
import { WhyUs } from '../components/why-us/why-us';

const blocks = new Blocks();
blocks.init();

const nav = new Nav();
nav.init();

const about = new About();
about.blockReveal();

const hero = new Hero();
hero.init();

const contact = new Contact();
contact.onClick();

const skewedSection = new SkewedSection();
skewedSection.startScrollEffect();

const whyUs = new WhyUs();
whyUs.init();
