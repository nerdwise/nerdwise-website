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

const SKEWED_SECTION_KEYFRAMES: [number, string][] = [
  [0, `transform: skewY(${START_DEGREE}deg) translateY(${START_TRANSLATE}vw)`],
  [1, `transform: skewY(${END_DEGREE}deg) translateY(${END_TRANSLATE}vw)`]
];

const SKEWED_SECTION_CONTENT_KEYFRAMES: [number, string][] = [
  [0, `transform: skewY(-2deg)`],
  [1, `transform: skewY(.3deg)`]
];

class SkewedSection {
  private readonly skewedSections_: HTMLElement[];

  constructor() {
    this.skewedSections_ = <HTMLElement[]>(
      Array.from(document.querySelectorAll('.skewed-section'))
    );
  }

  private static getSkewedSectionTweens_(skewedSection: HTMLElement): Tween[] {
    const skewedSectionContent = <HTMLElement>(
      skewedSection.querySelector('.skewed-section__content')
    );
    return [
      new Tween(SKEWED_SECTION_KEYFRAMES, { styleTarget: skewedSection }),
      new Tween(SKEWED_SECTION_CONTENT_KEYFRAMES, {
        styleTarget: skewedSectionContent
      })
    ];
  }

  public startScrollEffect(): void {
    this.skewedSections_.forEach(skewedSection => {
      new ScrollEffect(skewedSection, {
        effects: SkewedSection.getSkewedSectionTweens_(skewedSection),
        getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP,
        startDistance: () => -window.innerHeight,
        endDistance: 0
      });
    });
  }
}

export { SkewedSection };
