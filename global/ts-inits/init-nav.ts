import {Nav} from "../../components/nav/nav";

function initNav() {
  const sections = Array.from(document.querySelectorAll('.section'));
  const sectionNavLinkPairs =
    <[Element, Element][]>sections.map(
      (section) => {
        const target = (<HTMLElement>section).dataset.target;
        return [section, document.querySelector(`.${target}`)];
      });
  const sectionsToNavLinks = new Map(sectionNavLinkPairs);

  const nav = new Nav(sectionsToNavLinks);
  nav.init();
}

export {initNav};
