import { Blocks } from '../components/blocks/blocks';
import { About } from '../components/about/about';
import { Hero } from '../components/hero/hero';
import { Contact } from '../components/contact/contact';
import { SkewedSection } from '../components/skewed-section/skewed-section';
import { WhyUs } from '../components/why-us/why-us';
import {initNav} from "./ts-inits/init-nav";

const blocks = new Blocks();
blocks.init();

initNav();

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
