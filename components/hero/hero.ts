import { ScrollEffect } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import { Tween } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween';
import { DistanceFunction } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function';
import {NumericRange} from '../../node_modules/toolbox-v2/src/toolbox/utils/math/numeric-range';
import {CubicBezier} from '../../node_modules/toolbox-v2/src/toolbox/utils/math/cubic-bezier';

class Hero {
  private readonly blocksContainer_: HTMLElement;
  private scrollEffect_: ScrollEffect = null;
  private blocks_: HTMLElement[];

  constructor() {
    this.blocksContainer_ = document.querySelector('.blocks');
    this.blocks_ = Array.from(document.querySelectorAll('.block'));
  }

  startScrollEffect(): void {

    const easingARange = new NumericRange(1, 0);
    const easingBRange = new NumericRange(.36, 0);
    const easingCRange = new NumericRange(0, .36);
    const easingDRange = new NumericRange(0, 1);

    const blockRange = new NumericRange(0, this.blocks_.length - 1);

    const blockKeyframes: [number, string][] =
        [
          [0, 'transform: translateY(0)'],
          [1, 'transform: translateY(-100vh)']
        ];
    const blockTweens =
      this.blocks_.map((block, blockIndex) => {
        const blockPercent = blockRange.getValueAsPercent(blockIndex);
        const easingAValue = easingARange.getPercentAsValue(blockPercent);
        const easingBValue = easingBRange.getPercentAsValue(blockPercent);
        const easingCValue = easingCRange.getPercentAsValue(blockPercent);
        const easingDValue = easingDRange.getPercentAsValue(blockPercent);

        return new Tween(
          blockKeyframes,
          {
            styleTarget: block,
            easingFunction:
              CubicBezier.getFunction(
                easingAValue, easingBValue, easingCValue, easingDValue)
          }
        )
      });

    this.scrollEffect_ =
      new ScrollEffect(
        this.blocksContainer_,
        {
          effects: blockTweens,
          getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP,
          startDistance: () => -window.innerHeight,
          endDistance: 0,
        });
  }
}

export { Hero };
