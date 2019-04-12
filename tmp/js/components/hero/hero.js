import { ScrollEffect } from "../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base";
import { Tween } from "../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween";
import { DistanceFunction } from "../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function";
var Hero = (function () {
    function Hero() {
        this.scrollEffect_ = null;
        this.tween_ = null;
        this.blocks = Array.from(document.querySelectorAll(".block"));
        this.num = 0;
    }
    Hero.prototype.startScrollEffect = function () {
        var _this = this;
        this.blocks.forEach(function (block) {
            _this.scrollEffect_ = new ScrollEffect(block, {
                effects: [
                    new Tween([
                        [_this.num, "transform: translateY(100%)"],
                        [1, "transform: translateY(0)"]
                    ])
                ],
                getDistanceFunction: DistanceFunction.DOCUMENT_SCROLL,
                startDistance: 0,
                endDistance: function endDistance() {
                    return window.innerHeight;
                }
            });
            _this.num += 0.25;
        });
    };
    return Hero;
}());
export { Hero };
