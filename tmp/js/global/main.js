import { Blocks } from '../components/blocks/blocks';
import { Nav } from '../components/nav/nav';
import { About } from '../components/about/about';
var blocks = new Blocks();
blocks.startScrollEffect(-window.innerHeight, 0);
var nav = new Nav();
nav.init();
var about = new About();
about.blockReveal();
