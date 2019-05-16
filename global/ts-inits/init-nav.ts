import {Nav} from "../../components/nav/nav";
import {map} from "toolbox/utils/node-list/map";

function initNav() {
  const sections = document.querySelectorAll('.section');
  const sectionNavLinkPairs =
    map<Element, [Element, Element]>(
      sections,
      (section) => {
        const target = (<HTMLElement>section).dataset.target;
        return [section, document.querySelector(`.${target}`)];
      });
  const sectionsToNavLinks = new Map(sectionNavLinkPairs);

  const nav = new Nav(sectionsToNavLinks);
  nav.init();
}

export {initNav};
