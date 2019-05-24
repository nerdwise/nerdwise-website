import { renderLoop } from 'toolbox/utils/render-loop';
import { getVisibleDistanceFromRoot } from 'toolbox/utils/dom/position/vertical/get-visible-distance-from-root';
import { max } from 'toolbox/utils/iterable-iterator/max';
import { forEach } from 'toolbox/utils/iterable-iterator/for-each';
import { toggleClass } from 'toolbox/utils/dom/class/toggle-class';
import { ScrollEffect } from 'toolbox/components/scroll-effect/base';
import { Tween } from 'toolbox/components/scroll-effect/effects/tween/tween';
import { DistanceFunction } from 'toolbox/components/scroll-effect/distance-function';

enum CssClass {
  NAV_CONTENT = 'nav__content',
  ACTIVE_NAV_LINK = 'nav__link--active',
  NAV_BRAND = 'nav__brand',
  BLOCK = 'block'
}

class Nav {
  private readonly sectionToNavLink_: Map<Element, Element>;
  private readonly firstBlock_: Element;
  private readonly navBrand_: HTMLElement;
  private readonly navContent_: HTMLElement;
  private readonly navMenu_: HTMLElement;
  private readonly mobileNav_: HTMLElement;
  private readonly mobileNavLink_: HTMLElement[];
  private readonly nav_: HTMLElement;

  constructor(sectionLinkMap: Map<Element, Element>) {
    this.sectionToNavLink_ = sectionLinkMap;
    this.firstBlock_ = document.querySelector(`.${CssClass.BLOCK}`);
    this.navBrand_ = document.querySelector(`.${CssClass.NAV_BRAND}`);
    this.navContent_ = document.querySelector(`.${CssClass.NAV_CONTENT}`);
    this.navMenu_ = document.querySelector('.nav__menu');
    this.mobileNav_ = document.querySelector('.nav__content--mobile');
    this.mobileNavLink_ = Array.from(
      document.querySelectorAll('.nav__link--mobile')
    );
    this.nav_ = document.querySelector('.nav');
  }

  public init(): void {
    this.update_();
    this.expandMobileNavOnClick_();
    this.closeMobileNavOnLinkClick_();

    new ScrollEffect(this.navBrand_, {
      effects: [
        new Tween([[0, 'opacity: 0'], [1, 'opacity: 1']], {
          styleTarget: this.navBrand_
        })
      ],
      getDistanceFunction: DistanceFunction.DOCUMENT_SCROLL,
      startDistance: () => window.innerHeight * 0.1,
      endDistance: window.innerHeight * 0.5
    });

    new ScrollEffect(this.firstBlock_, {
      effects: [
        new Tween(
          [
            [0, 'opacity: 0; transform: translateY(-100%)'],
            [1, 'opacity: 1; transform: translateY(0)']
          ],
          {
            styleTarget: this.navContent_
          }
        ),
        new Tween(
          [
            [0, 'opacity: 0; transform: translateY(-100%)'],
            [1, 'opacity: 1; transform: translateY(0)']
          ],
          {
            styleTarget: this.navMenu_
          }
        )
      ],
      getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP,
      startDistance: -100,
      endDistance: 0
    });
  }

  private static scoreFn_(section: Element): number {
    const distance = getVisibleDistanceFromRoot(<HTMLElement>section);
    return distance < 0 ? distance : Number.NEGATIVE_INFINITY;
  }

  private getSections_() {
    return this.sectionToNavLink_.keys();
  }

  private getNavLinks_() {
    return this.sectionToNavLink_.values();
  }

  private update_(): void {
    renderLoop.scrollMeasure(() => {
      renderLoop.scrollCleanup(() => {
        this.update_();
      });

      const activeElement = max<Element>(this.getSections_(), Nav.scoreFn_);
      const activeNavLink = this.sectionToNavLink_.get(activeElement);

      renderLoop.anyMutate(() => {
        forEach(this.getNavLinks_(), navLink => {
          toggleClass(
            navLink,
            CssClass.ACTIVE_NAV_LINK,
            navLink === activeNavLink
          );
        });
      });
    });
  }

  private expandMobileNavOnClick_(): void {
    this.navMenu_.addEventListener('click', () => {
      this.mobileNav_.classList.toggle('display-nav');
      this.navMenu_.classList.toggle('x');
    });
  }

  private closeMobileNavOnLinkClick_(): void {
    this.mobileNavLink_.forEach(link => {
      link.addEventListener('click', () => {
        this.mobileNav_.classList.toggle('display-nav');
        this.navMenu_.classList.toggle('x');
      });
    });
  }
}

export { Nav };
