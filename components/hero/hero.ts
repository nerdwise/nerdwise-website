import { ScrollEffect } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import { Tween } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween';
import { DistanceFunction } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function';

class Hero {
  private readonly header_: HTMLElement;
  private scrollEffect_: ScrollEffect = null;
  private particles_: HTMLVideoElement;

  constructor() {
    this.header_ = document.querySelector('.hero__heading');
    this.particles_ = document.querySelector('.hero__video');
  }

  tweenHeader(): void {
    this.scrollEffect_ = new ScrollEffect(this.header_, {
      effects: [
        new Tween([
          [0, 'opacity: 1; transform: scale(1) rotate(0deg) translateY(0)'],
          [
            1,
            'opacity: 0; transform: scale(0.9) rotateX(3deg) translateY(10vh)'
          ]
        ])
      ],
      getDistanceFunction: DistanceFunction.DOCUMENT_SCROLL,
      startDistance: () => 0,
      endDistance: window.innerHeight / 3
    });
  }

  init(): void {
    this.tweenHeader();
  }
}

export { Hero };
