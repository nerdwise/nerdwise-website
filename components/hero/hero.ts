import { ScrollEffect } from "../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base";
import { Tween } from "../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween";
import { DistanceFunction } from "../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function";

class Hero {
  private scrollEffect_: ScrollEffect = null;
  private tween_: Tween = null;
  blocks: HTMLElement[] = Array.from(document.querySelectorAll(".block"));
  num: number = 0;
  constructor() {}

  startScrollEffect(): void {
    this.blocks.forEach(block => {
      this.scrollEffect_ = new ScrollEffect(block, {
        effects: [
          new Tween([
            [this.num, "transform: translateY(100%)"],
            [1, "transform: translateY(0)"]
          ])
        ],
        getDistanceFunction: DistanceFunction.DOCUMENT_SCROLL,
        startDistance: 0,
        endDistance: function endDistance() {
          return window.innerHeight;
        }
      });
      this.num += 0.25;
    });
  }
}

export { Hero };
