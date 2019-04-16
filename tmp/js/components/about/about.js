import { ActiveOnCondition } from '../../node_modules/toolbox-v2/src/toolbox/components/active-on-condition/base';
import { Scroll } from '../../node_modules/toolbox-v2/src/toolbox/utils/cached-vectors/scroll';
var About = (function () {
    function About() {
        this.blockWatcher_ = null;
        this.frames_ = Array.from(document.querySelectorAll('.profile__frame'));
    }
    About.prototype.blockReveal = function () {
        var _this = this;
        this.frames_.map(function (frame) {
            _this.blockWatcher_ = new ActiveOnCondition('profile__frame', function () {
                return (Scroll.getSingleton().getPosition().y >
                    frame.offsetTop - window.innerHeight / 5);
            }, 'reveal');
        });
    };
    return About;
}());
export { About };
