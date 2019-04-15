import { Blocks } from '../components/blocks/blocks';
import { Nav } from '../components/nav/nav';

const blocks = new Blocks();
blocks.startScrollEffect(-window.innerHeight, 0);

const nav = new Nav();
nav.darkNav();
