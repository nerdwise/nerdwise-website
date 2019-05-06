import { renderLoop } from '../../node_modules/toolbox-v2/src/toolbox/utils/render-loop';
import { getVisibleDistanceFromRoot } from '../../node_modules/toolbox-v2/src/toolbox/utils/dom/position/vertical/get-visible-distance-from-root';
import { max } from '../../node_modules/toolbox-v2/src/toolbox/utils/array/max';
import { ScrollEffect } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import { Tween } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween';
import { DistanceFunction } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function';

const SECTION_FILL_COLORS: [string, string][] = [
  ['$logo-light-fill-color--pink', '$logo-dark-fill-color--pink'],
  ['$logo-light-fill-color--orange', '$logo-dark-fill-color--orange'],
  ['$logo-light-fill-color--yellow', '$logo-dark-fill-color--yellow'],
  ['$logo-light-fill-color--cyan', '$logo-dark-fill-color--cyan']
];

class Nav {
  private sections_: HTMLElement[];
  private navLinks_: HTMLElement[];
  private sectionToNavLink_: Map<HTMLElement, HTMLElement>;
  private logoLight_: SVGPathElement;

  constructor() {
    this.sections_ = Array.from(document.querySelectorAll('.section'));
    this.navLinks_ = Array.from(document.querySelectorAll('.nav__link'));
    this.logoLight_ = document.querySelector('.logo__light');

    this.sectionToNavLink_ = new Map();
    // Explicitly map sections to respective nav links
    this.sections_.map((section, sectionIndex) => {
      this.sectionToNavLink_.set(section, this.navLinks_[sectionIndex]);
    });
  }

  public init(): void {
    this.update_();
    this.logoTween_();
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

  private logoTween_(): void {
    this.sections_.forEach((section, index) => {
      const nextSection: HTMLElement = this.sections_[index + 1];

      if (index === this.sections_.length - 1) {
        return;
      }

      new ScrollEffect(nextSection, {
        effects: [
          new Tween(
            [[0, `fill: auto`], [1, `fill: ${SECTION_FILL_COLORS[index][0]}`]],
            {
              styleTarget: this.logoLight_
            }
          )
        ],
        getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP,
        startDistance: () => -window.innerHeight / 4,
        endDistance: 0
      });
    });
  }
}

export { Nav };
