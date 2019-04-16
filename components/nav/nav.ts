import { ScrollEffect } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import { Tween } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween';
import { DistanceFunction } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function';
import { ActiveOnCondition } from '../../node_modules/toolbox-v2/src/toolbox/components/active-on-condition/base';
import { Scroll } from '../../node_modules/toolbox-v2/src/toolbox/utils/cached-vectors/scroll';

class Nav {
  private scrollEffect_: ScrollEffect = null;
  private scrollWatcher_: ActiveOnCondition = null;
  private sectionWatcher_: ActiveOnCondition = null;
  private hero_: HTMLElement;
  private navBackground_: HTMLElement;
  private about_: HTMLElement;
  private projects_: HTMLElement;
  private workflow_: HTMLElement;
  private contact_: HTMLElement;

  constructor() {
    this.hero_ = document.querySelector('.hero');
    this.navBackground_ = document.querySelector('.nav__background');
    this.about_ = document.querySelector('#about');
    this.projects_ = document.querySelector('#projects');
    this.workflow_ = document.querySelector('#workflow');
    this.contact_ = document.querySelector('#contact');
  }

  lightNav(): void {
    this.scrollWatcher_ = new ActiveOnCondition(
      'nav',
      () => {
        return Scroll.getSingleton().getPosition().y > 20;
      },
      'light'
    );
  }

  currentSection(): void {
    const sections = ['about', 'projects', 'workflow', 'contact'];
    const sectionElements = [
      this.about_,
      this.projects_,
      this.workflow_,
      this.contact_
    ];

    sections.map((section, sectionIndex) => {
      this.sectionWatcher_ = new ActiveOnCondition(
        `nav__link--${section}`,
        () => {
          return (
            Scroll.getSingleton().getPosition().y >
              sectionElements[sectionIndex].offsetTop - 30 &&
            Scroll.getSingleton().getPosition().y <
              sectionElements[sectionIndex + 1].offsetTop - 30
          );
        },
        'active'
      );
    });
  }

  init(): void {
    this.lightNav();
    this.currentSection();
  }
}

export { Nav };
