import {ScrollEffect} from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import {Tween} from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween';
import {DistanceFunction} from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function';

class CssClass {
  public static BLOCK: string = 'block';
}

const START_DEGREE = 2;
const END_DEGREE = -0.3;
const COLOR_TWEEN_END_FUDGE_FACTOR = .05

function generateColorTweenEndDistanceFn(block: HTMLElement): () => number {
  console.log('Yo', block);
  return () => {
    const fudgeAmount = COLOR_TWEEN_END_FUDGE_FACTOR * window.innerWidth;
    const angleOffset = -getTanFromDegrees(Math.abs(END_DEGREE)) * 50;
    console.log(angleOffset - block.clientHeight);
    return angleOffset - block.clientHeight - fudgeAmount;
  };
}

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
    `height: 7vh; ` +
    `transform: skewY(${END_DEGREE}deg) translateY(${END_TRANSLATE}vw)`
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
  private readonly blocks_: HTMLElement[];

  constructor() {
    this.blocks_ =
      Array.from(document.querySelectorAll(`.${CssClass.BLOCK}`));
    console.log('BLOCKS!', `.${CssClass.BLOCK}`, this.blocks_);
  }

  public init() {
    this.startScrollEffect_();
    this.crossFadeScrollEffect_();
  }

  private startScrollEffect_(): void {
    this.blocks_.forEach((block) => {
      const blockBackground = <HTMLElement>(
        block.querySelector('.block__background')
      );
      new ScrollEffect(block, {
        effects: [
          new Tween(
            BLOCK_BACKGROUND_KEYFRAMES, {styleTarget: blockBackground})
        ],
        getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP,
        startDistance: () => -window.innerHeight,
        endDistance: generateColorTweenEndDistanceFn(block),
      });
      new ScrollEffect(block, {
        effects: [new Tween(BLOCK_KEYFRAMES, {styleTarget: block})],
        getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP,
        startDistance: () => -window.innerHeight,
        endDistance: 0
      });
    });
  }

  private crossFadeScrollEffect_(): void {
    this.blocks_.forEach((blocksContainer, index) => {
      const nextBlockBackground: HTMLElement = blocksContainer.querySelector(
        '.block__background--next'
      );

      const nextBlocksContainer: HTMLElement = document.querySelector(
        `.block--${index + 2}`
      );

      if (index === this.blocks_.length - 1) {
        return;
      }

      new ScrollEffect(nextBlocksContainer, {
        effects: [
          new Tween(
            NEXT_BLOCK_BACKGROUND_KEYFRAMES, {styleTarget: nextBlockBackground})
        ],
        getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP,
        startDistance: () => -window.innerHeight / 4,
        endDistance:
          generateColorTweenEndDistanceFn(nextBlocksContainer),
      });
    });
  }
}

export {Blocks};
