import { ScrollEffect } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import { Tween } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween';
import { DistanceFunction } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function';
import { NumericRange } from '../../node_modules/toolbox-v2/src/toolbox/utils/math/numeric-range';
import { CubicBezier } from '../../node_modules/toolbox-v2/src/toolbox/utils/math/cubic-bezier';
var Hero = (function () {
    function Hero() {
        this.scrollEffect_ = null;
        this.blocksContainer_ = document.querySelector('.blocks');
        this.blocks_ = Array.from(document.querySelectorAll('.block'));
    }
    Hero.prototype.startScrollEffect = function () {
        var easingARange = new NumericRange(1, 0);
        var easingBRange = new NumericRange(.36, 0);
        var easingCRange = new NumericRange(0, .36);
        var easingDRange = new NumericRange(0, 1);
        var blockRange = new NumericRange(0, this.blocks_.length - 1);
        var blockKeyframes = [
            [0, 'transform: translateY(0)'],
            [1, 'transform: translateY(-100vh)']
        ];
        var blockTweens = this.blocks_.map(function (block, blockIndex) {
            var blockPercent = blockRange.getValueAsPercent(blockIndex);
            var easingAValue = easingARange.getPercentAsValue(blockPercent);
            var easingBValue = easingBRange.getPercentAsValue(blockPercent);
            var easingCValue = easingCRange.getPercentAsValue(blockPercent);
            var easingDValue = easingDRange.getPercentAsValue(blockPercent);
            return new Tween(blockKeyframes, {
                styleTarget: block,
                easingFunction: CubicBezier.getFunction(easingAValue, easingBValue, easingCValue, easingDValue)
            });
        });
        this.scrollEffect_ =
            new ScrollEffect(this.blocksContainer_, {
                effects: blockTweens,
                getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP,
                startDistance: function () { return -window.innerHeight; },
                endDistance: 0,
            });
    };
    return Hero;
}());
export { Hero };
