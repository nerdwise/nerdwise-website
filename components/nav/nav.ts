import { ActiveOnCondition } from '../../node_modules/toolbox-v2/src/toolbox/components/active-on-condition/base';
import { Scroll } from '../../node_modules/toolbox-v2/src/toolbox/utils/cached-vectors/scroll';

class Nav {
  private scrollWatcher_: ActiveOnCondition = null;

  constructor() {}

  darkNav(): void {
    this.scrollWatcher_ = new ActiveOnCondition(
      'nav',
      () => {
        return Scroll.getSingleton().getPosition().y > window.innerHeight - 30;
      },
      'dark'
    );
  }
}

export { Nav };
