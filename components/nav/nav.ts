import { ActiveOnCondition } from '../../node_modules/toolbox-v2/src/toolbox/components/active-on-condition/base';
import { Scroll } from '../../node_modules/toolbox-v2/src/toolbox/utils/cached-vectors/scroll';
import { renderLoop } from '../../node_modules/toolbox-v2/src/toolbox/utils/render-loop';
import { getVisibleDistanceFromRoot } from '../../node_modules/toolbox-v2/src/toolbox/utils/dom/position/vertical/get-visible-distance-from-root';
import { max } from '../../node_modules/toolbox-v2/src/toolbox/utils/array/max';

class Nav {
  private sections_: HTMLElement[];
  private navLinks_: HTMLElement[];

  constructor() {
    this.sections_ = Array.from(document.querySelectorAll('.section'));
    this.navLinks_ = Array.from(document.querySelectorAll('.nav__link'));
  }

  currentSection(): void {
    const sectionToNavLink = new Map();
    this.sections_.map((section, sectionIndex) => {
      sectionToNavLink.set(section, this.navLinks_[sectionIndex]);
    });

    const scoreFn = (section: HTMLElement): number => {
      return getVisibleDistanceFromRoot(section);
    };

    this.sections_.forEach(section => {
      renderLoop.scrollMeasure(() => {
        max<HTMLElement>(this.sections_, scoreFn);
      });
    });
  }

  init(): void {
    this.currentSection();
  }
}

export { Nav };
