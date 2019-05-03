import { ActiveOnCondition } from '../../node_modules/toolbox-v2/src/toolbox/components/active-on-condition/base';
import { Scroll } from '../../node_modules/toolbox-v2/src/toolbox/utils/cached-vectors/scroll';
import { renderLoop } from '../../node_modules/toolbox-v2/src/toolbox/utils/render-loop';
import { getVisibleDistanceFromRoot } from '../../node_modules/toolbox-v2/src/toolbox/utils/dom/position/vertical/get-visible-distance-from-root';
import { max } from '../../node_modules/toolbox-v2/src/toolbox/utils/array/max';

class Nav {
  private sections_: HTMLElement[];
  private navLinks_: HTMLElement[];
  private sectionToNavLink_: Map<HTMLElement, HTMLElement>;

  constructor() {
    this.sections_ = Array.from(document.querySelectorAll('.section'));
    this.navLinks_ = Array.from(document.querySelectorAll('.nav__link'));

    this.sectionToNavLink_ = new Map();
    // Explicitly map sections to respective nav links
    this.sections_.map((section, sectionIndex) => {
      this.sectionToNavLink_.set(section, this.navLinks_[sectionIndex]);
    });
  }

  public init(): void {
    this.update_();
  }

  private static scoreFn_(section: HTMLElement): number {
    if (Math.sign(getVisibleDistanceFromRoot(section)) === -1) {
      return getVisibleDistanceFromRoot(section);
    }
  }

  private update_(): void {
    renderLoop.scrollMeasure(() => {
      renderLoop.scrollCleanup(() => {
        this.update_();
      });

      const activeElement = max<HTMLElement>(this.sections_, Nav.scoreFn_);

      renderLoop.anyMutate(() => {
        const navLinksToDeactivate = this.navLinks_.filter(
          navLink => navLink !== activeNavLink
        );
        navLinksToDeactivate.forEach(navLink => {
          // Select the specific class instead of class at index of 1
          navLink.classList.remove(`${navLink.classList[1]}--active`);
        });
        const activeNavLink = this.sectionToNavLink_.get(activeElement);
        if (activeNavLink) {
          // Select the specific class instead of class at index of 1
          activeNavLink.classList.add(`${activeNavLink.classList[1]}--active`);
        }
      });
    });
  }
}

export { Nav };
