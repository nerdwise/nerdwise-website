import { ActiveOnCondition } from '../../node_modules/toolbox-v2/src/toolbox/components/active-on-condition/base';
import { Scroll } from '../../node_modules/toolbox-v2/src/toolbox/utils/cached-vectors/scroll';

class About {
  private blockWatcher_: ActiveOnCondition = null;
  private frames_: HTMLElement[];

  constructor() {
    this.frames_ = Array.from(document.querySelectorAll('.profile__frame'));
  }

  blockReveal(): void {
    this.frames_.map(frame => {
      this.blockWatcher_ = new ActiveOnCondition(
        'profile__frame',
        () => {
          return (
            Scroll.getSingleton().getPosition().y >
            frame.offsetTop - window.innerHeight / 5
          );
        },
        'reveal'
      );
    });
  }
}

export { About };
