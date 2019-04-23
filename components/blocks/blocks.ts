import { ScrollEffect } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import { Tween } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween';
import { DistanceFunction } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function';
import { NumericRange } from '../../node_modules/toolbox-v2/src/toolbox/utils/math/numeric-range';
import { CubicBezier } from '../../node_modules/toolbox-v2/src/toolbox/utils/math/cubic-bezier';

const EASING_A_RANGE = new NumericRange(.8, 0);
const EASING_B_RANGE = new NumericRange(0.2, 0);
const EASING_C_RANGE = new NumericRange(0, 0.2);
const EASING_D_RANGE = new NumericRange(0, .8);

const ROTATION_ANGLE = 10;
const SCALE = 1.05;

const BLOCK_KEYFRAMES: [number, string][] = [
  [0, `transform: scaleX(${SCALE}) translateY(5vh) skewY(-${ROTATION_ANGLE}deg) rotate(${ROTATION_ANGLE}deg)`],
  [0.225, `transform: scaleX(.9) translateY(-15vh) skewY(-${ROTATION_ANGLE * (2/3)}deg) rotate(${ROTATION_ANGLE * .25}deg)`],
  [0.45, `transform: scaleX(1) translateY(-35vh) skewY(-${ROTATION_ANGLE * (1/3)}deg) rotate(-${ROTATION_ANGLE * .5}deg)`],
  [.9, `transform: scaleX(1.1) translateY(-75vh) skewY(${ROTATION_ANGLE * (1/3)}deg) rotate(0deg)`]
];

class Blocks {
  private readonly blocksContainers_: HTMLElement[];
  private scrollEffect_: ScrollEffect = null;

  constructor() {
    this.blocksContainers_ =
      <HTMLElement[]>Array.from(document.querySelectorAll('.blocks'));
  }

  private static getBlocksFromContainer_(
    blocksContainer: HTMLElement
  ): HTMLElement[] {
    return <HTMLElement[]>Array.from(
      blocksContainer.querySelectorAll('.block'));
  }

  private static getBlockTween_(
    blockRange: NumericRange,
    blockIndex: number,
    block: HTMLElement
  ): Tween {
    const blockPercent = blockRange.getValueAsPercent(blockIndex);
    const easingAValue = EASING_A_RANGE.getPercentAsValue(blockPercent);
    const easingBValue = EASING_B_RANGE.getPercentAsValue(blockPercent);
    const easingCValue = EASING_C_RANGE.getPercentAsValue(blockPercent);
    const easingDValue = EASING_D_RANGE.getPercentAsValue(blockPercent);

    return new Tween(BLOCK_KEYFRAMES, {
      styleTarget: block,
      easingFunction: CubicBezier.getFunction(
        easingAValue,
        easingBValue,
        easingCValue,
        easingDValue
      )
    });
  }

  private getBlockTweens_(blocksContainer: HTMLElement): Tween[] {
    const blocks = Blocks.getBlocksFromContainer_(blocksContainer);

    const blockRange = new NumericRange(0, blocks.length - 1);

    return blocks.map((block, blockIndex) => {
      return Blocks.getBlockTween_(blockRange, blockIndex, block);
    });
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
