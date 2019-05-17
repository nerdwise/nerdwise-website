import { ScrollEffect } from 'toolbox/components/scroll-effect/base';
import { Tween } from 'toolbox/components/scroll-effect/effects/tween/tween';
import { DistanceFunction } from 'toolbox/components/scroll-effect/distance-function';
import { map } from 'toolbox/utils/node-list/map';
import { loadImage } from 'toolbox/utils/loading/load-image';

const INFO_KEYFRAMES: [number, string][] = [
  [0, 'transform: translateY(50%); opacity: 0'],
  [1, 'transform: translateY(0); opacity: 1']
];

const BLOCK_KEYFRAMES: [number, string][] = [
  [0.5, 'transform: translateY(0)'],
  [1, 'transform: translateY(-100%)']
];

const FRAME_KEYFRAMES: [number, string][] = [
  [0, 'transform: translateY(100%)'],
  [0.5, 'transform: translateY(0)']
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
    this.lazyLoad_();
    this.blockReveal_();
  }

  private blockReveal_(): void {
    map(this.profiles_, profile => {
      const info: HTMLElement = profile.querySelector('.profile__info');
      const block: HTMLElement = profile.querySelector('.profile__block');
      const frame: HTMLElement = profile.querySelector('.profile__frame');

      this.scrollEffect_ = new ScrollEffect(profile, {
        effects: [
          new Tween(INFO_KEYFRAMES, { styleTarget: info }),
          new Tween(BLOCK_KEYFRAMES, { styleTarget: block }),
          new Tween(FRAME_KEYFRAMES, { styleTarget: frame })
        ],
        getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP,
        startDistance: () => -window.innerHeight / 2,
        endDistance: -window.innerHeight / 3
      });
    });
  }

  private lazyLoad_(): void {
    this.profiles_.forEach(profile => {
      const block: HTMLElement = profile.querySelector('.profile__block');

      const image: HTMLImageElement = profile.querySelector('.profile__image');
      const imageUrl: string = image.dataset.src;

      loadImage(imageUrl).then(() => {
        image.src = imageUrl;
        block.className += ` ${block.className}--reveal`;
      });
    });
  }
}

export { About };
