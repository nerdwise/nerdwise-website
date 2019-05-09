import { ScrollEffect } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import { Tween } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween';
import { DistanceFunction } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function';

const FRAME_KEYFRAMES: [number, string][] = [
  [0, 'transform: scaleY(0)'],
  [1, 'transform: scaleY(1)']
];

const IMAGE_KEYFRAMES: [number, string][] = [
  [0.5, 'transform: scaleY(0)'],
  [1, 'transform: scaleY(1)']
];

const INFO_KEYFRAMES: [number, string][] = [
  [0, 'transform: translateY(50%); opacity: 0'],
  [1, 'transform: translateY(0); opacity: 1']
];

class About {
  private scrollEffect_: ScrollEffect = null;
  private profiles_: HTMLElement[];

  constructor() {
    this.profiles_ = Array.from(document.querySelectorAll('.profile'));
  }

  blockReveal(): void {
    this.profiles_.map(profile => {
      const frame: HTMLElement = profile.querySelector('.profile__frame');
      const image: HTMLElement = profile.querySelector('.profile__image');
      const info: HTMLElement = profile.querySelector('.profile__info');

      this.scrollEffect_ = new ScrollEffect(frame, {
        effects: [
          new Tween(FRAME_KEYFRAMES, { styleTarget: frame }),
          new Tween(IMAGE_KEYFRAMES, { styleTarget: image }),
          new Tween(INFO_KEYFRAMES, { styleTarget: info })
        ],
        getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP,
        startDistance: () => -window.innerHeight / 2,
        endDistance: -window.innerHeight / 3
      });
    });
  }
}

export { About };
