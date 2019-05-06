import { ScrollEffect } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import { Tween } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween';
import { DistanceFunction } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function';

const START_DEGREE = 2;
const END_DEGREE = -0.3;

function getTanFromDegrees(degrees: number): number {
  return Math.tan((degrees * Math.PI) / 180);
}

const START_TRANSLATE = getTanFromDegrees(Math.abs(START_DEGREE)) * 50;
const END_TRANSLATE = -getTanFromDegrees(Math.abs(END_DEGREE)) * 50;

const BLOCK_KEYFRAMES: [number, string][] = [
  [0, `transform: skewY(${START_DEGREE}deg) translateY(${START_TRANSLATE}vw)`],
  [0.75, `height: 1rem;`],
  [
    1,
    `height: 7vh; transform: skewY(${END_DEGREE}deg) translateY(${END_TRANSLATE}vw)`
  ]
];

const BLOCK_BACKGROUND_KEYFRAMES: [number, string][] = [
  [0, `transform: translateX(0)`],
  [1, `transform: translateX(-75%)`]
];

const NEXT_BLOCK_BACKGROUND_KEYFRAMES: [number, string][] = [
  [0, `opacity: 0`],
  [1, `opacity: 1`]
];

class Blocks {
  private readonly blockSpacers_: HTMLElement[];
  private readonly nextBlockBackgrounds_: HTMLElement[];
  private readonly blocksContainers_: HTMLElement[];

  constructor() {
    this.blockSpacers_ = <HTMLElement[]>(
      Array.from(document.querySelectorAll('.block-spacer'))
    );
    this.nextBlockBackgrounds_ = <HTMLElement[]>(
      Array.from(document.querySelectorAll('.block__background--next'))
    );
    this.blocksContainers_ = <HTMLElement[]>(
      Array.from(document.querySelectorAll('.block'))
    );
  }

  public init() {
    this.startScrollEffect_();
    this.crossFadeScrollEffect_();
  }

  private static getBlockTweens_(blockSpacer: HTMLElement): Tween[] {
    const block = <HTMLElement>blockSpacer.nextElementSibling;
    const blockBackground = <HTMLElement>(
      block.querySelector('.block__background')
    );
    return [
      new Tween(BLOCK_BACKGROUND_KEYFRAMES, { styleTarget: blockBackground }),
      new Tween(BLOCK_KEYFRAMES, { styleTarget: block })
    ];
  }

  private startScrollEffect_(): void {
    this.blockSpacers_.forEach(blocksContainer => {
      new ScrollEffect(blocksContainer, {
        effects: Blocks.getBlockTweens_(blocksContainer),
        getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP,
        startDistance: () => -window.innerHeight,
        endDistance: 0
      });
    });
  }

  private crossFadeScrollEffect_(): void {
    this.blocksContainers_.forEach((blocksContainer, index) => {
      const nextBlockBackground: HTMLElement = blocksContainer.querySelector(
        '.block__background--next'
      );

      const nextBlocksContainer: HTMLElement = document.querySelector(
        `.block--${index + 2}`
      );

      if (index === this.blocksContainers_.length - 1) {
        return;
      }

      new ScrollEffect(nextBlocksContainer, {
        effects: [
          new Tween(NEXT_BLOCK_BACKGROUND_KEYFRAMES, {
            styleTarget: nextBlockBackground
          })
        ],
        getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP,
        startDistance: () => -window.innerHeight / 4,
        endDistance: () =>
          -getTanFromDegrees(Math.abs(START_DEGREE)) * 50 -
          blocksContainer.clientHeight
      });
    });
  }
}

export { Blocks };
