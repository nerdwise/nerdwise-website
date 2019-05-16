import { ScrollEffect } from 'toolbox/components/scroll-effect/base';
import { Tween } from 'toolbox/components/scroll-effect/effects/tween/tween';
import { DistanceFunction } from 'toolbox/components/scroll-effect/distance-function';

const START_DEGREE = 2;
const END_DEGREE = -0.3;

enum CssClass {
  BLOCK = 'block',
  SECTION = 'skewed-section',
  CONTENT = 'skewed-section__content',
}

function getTanFromDegrees(degrees: number): number {
  return Math.tan((degrees * Math.PI) / 180);
}

function getPreviousBlock(currentBlock: Element): Element {
  const siblings = Array.from(currentBlock.parentElement.children);
  return siblings
    .slice(0, siblings.indexOf(currentBlock))
    .reverse()
    .find((element) => element.classList.contains(CssClass.BLOCK));
}

// TODO(Angus): Extract getNextBlock
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
      Array.from(document.querySelectorAll(`.${CssClass.SECTION}`))
    );
  }

  private static getSkewedSectionTweens_(skewedSection: HTMLElement): Tween[] {
    const skewedSectionContent = <HTMLElement>(
      skewedSection.querySelector(`.${CssClass.CONTENT}`)
    );
    return [
      new Tween(SKEWED_SECTION_KEYFRAMES, { styleTarget: skewedSection }),
      new Tween(SKEWED_SECTION_CONTENT_KEYFRAMES, {
        styleTarget: skewedSectionContent
      })
    ];
  }

  public startScrollEffect(): void {
    this.skewedSections_.forEach((skewedSection) => {
      const previousBlock = getPreviousBlock(skewedSection);
      if (!previousBlock) {
        return;
      }
      new ScrollEffect(
        previousBlock,
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
