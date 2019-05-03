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

    const sectionToNavLink = new Map();
    // Explicitly map sections to respective nav links
    this.sections_.map((section, sectionIndex) => {
      sectionToNavLink.set(section, this.navLinks_[sectionIndex]);
    });
  }

  public init(): void {
    this.update_();
  }

  private static scoreFn_(section: HTMLElement): number {
    // Ignore positive values
    return getVisibleDistanceFromRoot(section);
  }

  private update_(): void {
    renderLoop.scrollMeasure(() => {
      renderLoop.scrollCleanup(() => {
        this.update_();
      });

      const activeElement = max<HTMLElement>(this.sections_, Nav.scoreFn_);

      renderLoop.anyMutate(() => {
        // Map.get activeElement and add css classes
      });
    });
  }
}

export { Nav };
