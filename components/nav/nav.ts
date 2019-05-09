import {renderLoop} from '../../node_modules/toolbox-v2/src/toolbox/utils/render-loop';
import {getVisibleDistanceFromRoot} from '../../node_modules/toolbox-v2/src/toolbox/utils/dom/position/vertical/get-visible-distance-from-root';
import {max} from '../../node_modules/toolbox-v2/src/toolbox/utils/iterable-iterator/max';
import {forEach} from '../../node_modules/toolbox-v2/src/toolbox/utils/iterable-iterator/for-each';
import {toggleClass} from '../../node_modules/toolbox-v2/src/toolbox/utils/dom/class/toggle-class';

class CssClass {
  public static ACTIVE = 'nav__link--active';
}

class Nav {
  private sectionToNavLink_: Map<Element, Element>;

  constructor(sectionLinkMap: Map<Element, Element>) {
    this.sectionToNavLink_ = sectionLinkMap;
  }

  public init(): void {
    this.update_();
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
            toggleClass(navLink, CssClass.ACTIVE, navLink === activeNavLink);
          });
      });
    });
  }
}

export {Nav};
