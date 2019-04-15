import { Blocks } from '../components/blocks/blocks';
import { Nav } from '../components/nav/nav';
var blocks = new Blocks();
blocks.startScrollEffect(-window.innerHeight, 0);
var nav = new Nav();
nav.darkNav();
