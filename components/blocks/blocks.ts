import { ScrollEffect } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import { Tween } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween';
import { DistanceFunction } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function';

const ROTATION_ANGLE = 10;
const SCALE = 1.05;

const BLOCK_KEYFRAMES: [number, string][] = [
  [0, `transform: translateX(0)`],
  [1, `transform: translateX(-50%)`]
];

class Blocks {
  private readonly blocksContainers_: HTMLElement[];
  private scrollEffect_: ScrollEffect = null;

  constructor() {
    this.blocksContainers_ =
      <HTMLElement[]>Array.from(document.querySelectorAll('.block-spacer'));
  }

  private static getBlockTween_(block: HTMLElement): Tween {
    return new Tween(BLOCK_KEYFRAMES, {styleTarget: block});
  }

  private getBlockTweens_(blocksContainer: HTMLElement): Tween[] {
    return [Blocks.getBlockTween_((<HTMLElement>blocksContainer.nextElementSibling).querySelector('.block__background'))];
  }

  public startScrollEffect(): void {
    this.blocksContainers_.forEach(blocksContainer => {
      this.scrollEffect_ = new ScrollEffect(blocksContainer, {
        effects: this.getBlockTweens_(blocksContainer),
        getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP,
        startDistance: () => -window.innerHeight,
        endDistance: 0
      });
    });
  }
}

export { Blocks };
