import { ScrollEffect } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import { Tween } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween';
import { DistanceFunction } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function';
import { ActiveOnCondition } from '../../node_modules/toolbox-v2/src/toolbox/components/active-on-condition/base';
import { Scroll } from '../../node_modules/toolbox-v2/src/toolbox/utils/cached-vectors/scroll';

class Nav {
  private scrollEffect_: ScrollEffect = null;
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

  currentSection(): void {
    const sections = ['workflow', 'projects', 'about', 'contact'];
    const sectionElements = [
      this.workflow_,
      this.projects_,
      this.about_,
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
    this.currentSection();
  }
}

export { Nav };
