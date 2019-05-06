import { ActiveOnCondition } from '../../node_modules/toolbox-v2/src/toolbox/components/active-on-condition/base';
import { renderLoop } from '../../node_modules/toolbox-v2/src/toolbox/utils/render-loop';
import { getVisibleDistanceFromRoot } from '../../node_modules/toolbox-v2/src/toolbox/utils/dom/position/vertical/get-visible-distance-from-root';
import { max } from '../../node_modules/toolbox-v2/src/toolbox/utils/array/max';
import { ScrollEffect } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import { Tween } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween';

const SECTION_FILL_COLORS: {}[] = [
  {
    light: '$logo-light-fill-color--pink',
    dark: '$logo-dark-fill-color--pink'
  },
  {
    light: '$logo-light-fill-color--orange',
    dark: '$logo-dark-fill-color--orange'
  },
  {
    light: '$logo-light-fill-color--yellow',
    dark: '$logo-dark-fill-color--yellow'
  },
  {
    light: '$logo-light-fill-color--cyan',
    dark: '$logo-dark-fill-color--cyan'
  }
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
          new Tween([[1, `fill: `]], {
            // Can't set style target as SVGPathElement?
            styleTarget: this.logoLight_
          })
        ]
      });
    });
  }
}

export { Nav };
