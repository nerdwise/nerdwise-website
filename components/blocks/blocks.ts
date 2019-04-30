import { ScrollEffect } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import { Tween } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween';
import { DistanceFunction } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function';

const START_DEGREE = 2;
const END_DEGREE = -.3;

function getTanFromDegrees(degrees: number): number {
  return Math.tan(degrees * Math.PI/180);
}

const START_TRANSLATE = getTanFromDegrees(Math.abs(START_DEGREE)) * 50;
const END_TRANSLATE = -getTanFromDegrees(Math.abs(END_DEGREE)) * 50;

const BLOCK_KEYFRAMES: [number, string][] = [
  [0, `transform: skewY(${START_DEGREE}deg) translateY(${START_TRANSLATE}vw)`],
  [0.75, `height: 1rem;`],
  [1, `height: 7vh; transform: skewY(${END_DEGREE}deg) translateY(${END_TRANSLATE}vw)`]
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
