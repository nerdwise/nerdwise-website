import { ScrollEffect } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import { Tween } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween';
import { DistanceFunction } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function';
import { ActiveOnCondition } from '../../node_modules/toolbox-v2/src/toolbox/components/active-on-condition/base';
import { Scroll } from '../../node_modules/toolbox-v2/src/toolbox/utils/cached-vectors/scroll';

class Nav {
  private scrollEffect_: ScrollEffect = null;
  private scrollWatcher_: ActiveOnCondition = null;
  private hero_: HTMLElement;
  private navBackground_: HTMLElement;

  constructor() {
    this.hero_ = document.querySelector('.hero');
    this.navBackground_ = document.querySelector('.nav__background');
  }

  slideNav(): void {
    this.scrollEffect_ = new ScrollEffect(this.hero_, {
      effects: [
        new Tween([[0, 'width: 0'], [1, 'width: 100vw']], {
          styleTarget: this.navBackground_
        })
      ],
      getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP,
      startDistance: () => 0,
      endDistance: window.innerHeight / 4
    });
  }

  darkNav(): void {
    this.scrollWatcher_ = new ActiveOnCondition(
      'nav',
      () => {
        return Scroll.getSingleton().getPosition().y > window.innerHeight / 4;
      },
      'dark'
    );
  }

  init(): void {
    this.slideNav();
    this.darkNav();
  }
}

export { Nav };
