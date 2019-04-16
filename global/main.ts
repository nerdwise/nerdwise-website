import { Blocks } from '../components/blocks/blocks';
import { Nav } from '../components/nav/nav';
import { About } from '../components/about/about';

const blocks = new Blocks();
blocks.startScrollEffect(-window.innerHeight, 0);

const nav = new Nav();
nav.init();

const about = new About();
about.blockReveal();
