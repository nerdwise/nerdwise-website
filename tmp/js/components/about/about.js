import { ActiveOnCondition } from '../../node_modules/toolbox-v2/src/toolbox/components/active-on-condition/base';
import { Scroll } from '../../node_modules/toolbox-v2/src/toolbox/utils/cached-vectors/scroll';
var About = (function () {
    function About() {
        this.blockWatcher_ = null;
        this.frame_ = document.querySelector('.profile__frame');
    }
    About.prototype.blockReveal = function () {
        var _this = this;
        this.blockWatcher_ = new ActiveOnCondition('profile__frame', function () {
            return (Scroll.getSingleton().getPosition().y >
                _this.frame_.offsetTop - window.innerHeight / 5);
        }, 'reveal');
    };
    return About;
}());
export { About };
