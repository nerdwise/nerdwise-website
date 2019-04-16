import { ActiveOnCondition } from '../../node_modules/toolbox-v2/src/toolbox/components/active-on-condition/base';
import { Scroll } from '../../node_modules/toolbox-v2/src/toolbox/utils/cached-vectors/scroll';

class About {
  private blockWatcher_: ActiveOnCondition = null;
  private frame_: HTMLElement;

  constructor() {
    this.frame_ = document.querySelector('.profile__frame');
  }

  blockReveal(): void {
    this.blockWatcher_ = new ActiveOnCondition(
      'profile__frame',
      () => {
        return (
          Scroll.getSingleton().getPosition().y >
          this.frame_.offsetTop - window.innerHeight / 5
        );
      },
      'reveal'
    );
  }
}

export { About };
