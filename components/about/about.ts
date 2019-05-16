import { ScrollEffect } from 'toolbox/components/scroll-effect/base';
import { Tween } from 'toolbox/components/scroll-effect/effects/tween/tween';
import { DistanceFunction } from 'toolbox/components/scroll-effect/distance-function';
import { map } from 'toolbox/utils/node-list/map';
import { loadImage } from 'toolbox/utils/loading/load-image';

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
  private readonly profiles_: NodeListOf<Element>;
  private scrollEffect_: ScrollEffect = null;
  private aboutImages_: HTMLImageElement[];

  constructor() {
    this.profiles_ = document.querySelectorAll('.profile');
    this.aboutImages_ = Array.from(
      document.querySelectorAll('.profile__image')
    );
  }

  init(): void {
    this.blockReveal_();
    this.lazyLoad_();
  }

  private blockReveal_(): void {
    map(this.profiles_, profile => {
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

  private lazyLoad_(): void {
    this.aboutImages_.forEach(image => {
      const imageUrl: string = image.dataset.src;
      loadImage(imageUrl).then(() => {
        image.src = imageUrl;
      });
    });
  }
}

export { About };
