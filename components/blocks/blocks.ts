import { ScrollEffect } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import { Tween } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween';
import { DistanceFunction } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function';

const BLOCK_KEYFRAMES: [number, string][] = [
  [0.75, `height: 1rem; transform: skewY(2deg)`],
  [1, `height: 6vh; transform: skewY(-.3deg)`]
];

const BLOCK_BACKGROUND_KEYFRAMES: [number, string][] = [
  [0, `transform: translateX(0)`],
  [1, `transform: translateX(-75%)`]
];

class Blocks {
  private readonly blockSpacers_: HTMLElement[];

  constructor() {
    this.blockSpacers_ =
      <HTMLElement[]>Array.from(document.querySelectorAll('.block-spacer'));
  }

  private static getBlockTweens_(blockSpacer: HTMLElement): Tween[] {
    const block = <HTMLElement>(blockSpacer.nextElementSibling);
    const blockBackground =
      <HTMLElement>(block.querySelector('.block__background'));
    return [
      new Tween(BLOCK_BACKGROUND_KEYFRAMES, {styleTarget: blockBackground}),
      new Tween(BLOCK_KEYFRAMES, {styleTarget: block}),
    ];
  }

  public startScrollEffect(): void {
    this.blockSpacers_.forEach((blocksContainer) => {
      new ScrollEffect(
        blocksContainer,
        {
          effects: Blocks.getBlockTweens_(blocksContainer),
          getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP,
          startDistance: () => -window.innerHeight,
          endDistance: 0
        });
    });
  }
}

export { Blocks };
