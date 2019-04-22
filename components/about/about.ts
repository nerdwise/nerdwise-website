import { ActiveOnCondition } from '../../node_modules/toolbox-v2/src/toolbox/components/active-on-condition/base';
import { Scroll } from '../../node_modules/toolbox-v2/src/toolbox/utils/cached-vectors/scroll';

class About {
  private blockWatcher_: ActiveOnCondition = null;
  private profiles_: HTMLElement[];

  constructor() {
    this.profiles_ = Array.from(document.querySelectorAll('.profile'));
  }

  blockReveal(): void {
    this.profiles_.map((frame, frameIndex) => {
      this.blockWatcher_ = new ActiveOnCondition(
        `profile--${frameIndex + 1}`,
        () => {
          return (
            Scroll.getSingleton().getPosition().y >
            frame.offsetTop - window.innerHeight / 2
          );
        },
        'reveal'
      );
    });
  }
}

export { About };
