import { ScrollEffect } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import { Tween } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween';
import { DistanceFunction } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function';

const SKEWED_SECTION_KEYFRAMES: [number, string][] = [
  [0, `transform: skewY(2deg) translateY(2.1rem)`],
  [1, `transform: skewY(-.3deg) translateY(0rem)`]
];

const SKEWED_SECTION_CONTENT_KEYFRAMES: [number, string][] = [
  [0, `transform: skewY(-2deg)`],
  [1, `transform: skewY(.3deg)`]
];

class SkewedSection {
  private readonly skewedSections_: HTMLElement[];

  constructor() {
    this.skewedSections_ =
      <HTMLElement[]>Array.from(document.querySelectorAll('.skewed-section'));
  }

  private static getSkewedSectionTweens_(skewedSection: HTMLElement): Tween[] {
    const skewedSectionContent =
      <HTMLElement>(skewedSection.querySelector('.skewed-section__content'));
    return [
      new Tween(SKEWED_SECTION_KEYFRAMES, {styleTarget: skewedSection}),
      new Tween(SKEWED_SECTION_CONTENT_KEYFRAMES, {styleTarget: skewedSectionContent}),
    ];
  }

  public startScrollEffect(): void {
    this.skewedSections_.forEach((skewedSection) => {
      new ScrollEffect(
        skewedSection,
        {
          effects: SkewedSection.getSkewedSectionTweens_(skewedSection),
          getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP,
          startDistance: () => -window.innerHeight,
          endDistance: 0
        });
    });
  }
}

export { SkewedSection };
