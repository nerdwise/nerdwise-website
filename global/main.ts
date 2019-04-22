import { Blocks } from '../components/blocks/blocks';
import { Nav } from '../components/nav/nav';
import { About } from '../components/about/about';
import { Hero } from '../components/hero/hero';

const blocks = new Blocks();
blocks.startScrollEffect();

const nav = new Nav();
nav.init();

const about = new About();
about.blockReveal();

const hero = new Hero();
hero.tweenHeader();
