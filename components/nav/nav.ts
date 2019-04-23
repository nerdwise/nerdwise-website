import { ActiveOnCondition } from '../../node_modules/toolbox-v2/src/toolbox/components/active-on-condition/base';
import { Scroll } from '../../node_modules/toolbox-v2/src/toolbox/utils/cached-vectors/scroll';

const SECTIONS = ['workflow', 'projects', 'about', 'contact'];

class Nav {
  private readonly about_: HTMLElement;
  private readonly projects_: HTMLElement;
  private readonly workflow_: HTMLElement;
  private readonly contact_: HTMLElement;
  private sectionWatcher_: ActiveOnCondition = null;
  private hero_: HTMLElement;
  private navBackground_: HTMLElement;

  constructor() {
    this.hero_ = document.querySelector('.hero');
    this.navBackground_ = document.querySelector('.nav__background');
    this.about_ = document.querySelector('#about');
    this.projects_ = document.querySelector('#projects');
    this.workflow_ = document.querySelector('#workflow');
    this.contact_ = document.querySelector('#contact');
  }

  getElementYPosition(sectionIndex: number): number {
    const SECTION_ELEMENTS = [
      this.workflow_,
      this.projects_,
      this.about_,
      this.contact_
    ];

    if (typeof SECTION_ELEMENTS[sectionIndex] === 'undefined') {
      return 999999;
    } else {
      return SECTION_ELEMENTS[sectionIndex].offsetTop - 30;
    }
  }

  currentSection(): void {
    SECTIONS.map((section, sectionIndex) => {
      this.sectionWatcher_ = new ActiveOnCondition(
        `nav__link--${section}`,
        () => {
          return (
            Scroll.getSingleton().getPosition().y >
              this.getElementYPosition(sectionIndex) &&
            Scroll.getSingleton().getPosition().y <
              this.getElementYPosition(sectionIndex + 1)
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
