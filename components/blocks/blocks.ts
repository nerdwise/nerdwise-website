import {ScrollEffect} from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import {Tween} from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween';
import {DistanceFunction} from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function';
import {forEach} from '../../node_modules/toolbox-v2/src/toolbox/utils/node-list/for-each';

enum CssClass {
  BLOCK = 'block',
  BLOCK_BACKGROUND = 'block__background',
  BLOCK_BACKGROUND_NEXT = 'block__background--next',
}

const START_DEGREE = 2;
const END_DEGREE = -0.3;
const COLOR_TWEEN_END_FUDGE_FACTOR = .05;

function generateColorTweenEndDistanceFn(block: Element): () => number {
  return () => {
    const fudgeAmount = COLOR_TWEEN_END_FUDGE_FACTOR * window.innerWidth;
    const angleOffset = -getTanFromDegrees(Math.abs(END_DEGREE)) * 50;
    return angleOffset - block.clientHeight - fudgeAmount;
  };
}

function getNextBlock(currentBlock: Element): Element {
  let next = currentBlock.nextElementSibling;
  while (next) {
    if (next.classList.contains(CssClass.BLOCK)) {
      return next;
    }
    next = next.nextElementSibling;
  }
  return null;
}

function getTanFromDegrees(degrees: number): number {
  return Math.tan((degrees * Math.PI) / 180);
}

const START_TRANSLATE = getTanFromDegrees(Math.abs(START_DEGREE)) * 50;
const END_TRANSLATE = -getTanFromDegrees(Math.abs(END_DEGREE)) * 50;

const SKEW_KEYFRAMES: [number, string][] = [
  [0, `transform: skewY(${START_DEGREE}deg) translateY(${START_TRANSLATE}vw)`],
  [0.75, `height: 1rem;`],
  [
    1,
    `height: 7vh; ` +
    `transform: skewY(${END_DEGREE}deg) translateY(${END_TRANSLATE}vw)`
  ]
];

const TRANSLATE_BACKGROUND_KEYFRAMES: [number, string][] = [
  [0, `transform: translateX(0)`],
  [1, `transform: translateX(-75%)`]
];

const NEXT_BACKGROUND_KEYFRAMES: [number, string][] = [
  [0, `opacity: 0`],
  [1, `opacity: 1`]
];

class Blocks {
  private readonly blocks_: NodeListOf<Element>;

  constructor() {
    this.blocks_ = document.querySelectorAll(`.${CssClass.BLOCK}`);
  }

  public init() {
    this.startScrollEffect_();
    this.crossFadeScrollEffect_();
  }

  private startScrollEffect_(): void {
    forEach<Element>(
      this.blocks_,
      (block) => {
        const background =
          <HTMLElement>(block.querySelector(`.${CssClass.BLOCK_BACKGROUND}`));
        new ScrollEffect(block, {
          effects: Blocks.getBackgroundTweens_(background),
          getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP,
          startDistance: () => -window.innerHeight,
          endDistance: generateColorTweenEndDistanceFn(block),
        });
        new ScrollEffect(block, {
          effects: Blocks.getSkewTweens_(<HTMLElement>block),
          getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP,
          startDistance: () => -window.innerHeight,
          endDistance: 0
        });
      });
  }

  private static getCrossFadeTweens_(nextBackground: HTMLElement): Tween[] {
    return [
      new Tween(NEXT_BACKGROUND_KEYFRAMES, {styleTarget: nextBackground})];
  }

  private static getBackgroundTweens_(background: HTMLElement): Tween[] {
    return [
      new Tween(TRANSLATE_BACKGROUND_KEYFRAMES, {styleTarget: background})];
  }

  private static getSkewTweens_(block: HTMLElement): Tween[] {
    return [new Tween(SKEW_KEYFRAMES, {styleTarget: block})];
  }

  private crossFadeScrollEffect_(): void {
    this.blocks_.forEach((block) => {
      const nextBlock: Element = getNextBlock(block);
      if (!nextBlock) {
        return;
      }

      const nextBlockBackground: HTMLElement =
        block.querySelector(`.${CssClass.BLOCK_BACKGROUND_NEXT}`);

      new ScrollEffect(nextBlock, {
        effects: Blocks.getCrossFadeTweens_(nextBlockBackground),
        getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP,
        startDistance: () => -window.innerHeight / 4,
        endDistance: generateColorTweenEndDistanceFn(nextBlock),
      });
    });
  }
}

export {Blocks};
