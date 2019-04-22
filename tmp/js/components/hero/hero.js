import { ScrollEffect } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import { Tween } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween';
import { DistanceFunction } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function';
var Hero = (function () {
    function Hero() {
        this.scrollEffect_ = null;
        this.header_ = document.querySelector('.hero__heading');
    }
    Hero.prototype.tweenHeader = function () {
        this.scrollEffect_ = new ScrollEffect(this.header_, {
            effects: [
                new Tween([
                    [0, 'opacity: 1; transform: scale(1)'],
                    [1, 'opacity: 0; transform: scale(0.9)']
                ])
            ],
            getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER,
            startDistance: function () { return 0; },
            endDistance: window.innerHeight / 3
        });
    };
    return Hero;
}());
export { Hero };
