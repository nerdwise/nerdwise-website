import {renderLoop} from '../../node_modules/toolbox-v2/src/toolbox/utils/render-loop';
import {getVisibleDistanceFromRoot} from '../../node_modules/toolbox-v2/src/toolbox/utils/dom/position/vertical/get-visible-distance-from-root';
import {max} from '../../node_modules/toolbox-v2/src/toolbox/utils/iterable-iterator/max';
import {forEach} from '../../node_modules/toolbox-v2/src/toolbox/utils/iterable-iterator/for-each';
import {toggleClass} from '../../node_modules/toolbox-v2/src/toolbox/utils/dom/class/toggle-class';
import {ScrollEffect} from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import {Tween} from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween';
import {DistanceFunction} from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function';

enum CssClass {
  NAV_CONTENT = 'nav__content',
  ACTIVE_NAV_LINK = 'nav__link--active',
  BLOCK = 'block',
}

class Nav {
  private readonly sectionToNavLink_: Map<Element, Element>;
  private readonly firstBlock_: Element;
  private readonly navContent_: HTMLElement;

  constructor(sectionLinkMap: Map<Element, Element>) {
    this.sectionToNavLink_ = sectionLinkMap;
    this.firstBlock_ = document.querySelector(`.${CssClass.BLOCK}`);
    this.navContent_ = document.querySelector(`.${CssClass.NAV_CONTENT}`);
  }

  public init(): void {
    this.update_();

    new ScrollEffect(
      this.firstBlock_,
      {
        effects: [
          new Tween(
            [[0, 'opacity: 0'], [1, 'opacity: 1']],
            {styleTarget: this.navContent_})],
        getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP,
        startDistance: -100,
        endDistance: 0,
      }
    );
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
        forEach(
          this.getNavLinks_(),
          (navLink) => {
            toggleClass(navLink, CssClass.ACTIVE_NAV_LINK, navLink === activeNavLink);
          });
      });
    });
  }
}

export {Nav};
