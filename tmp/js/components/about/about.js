import { ActiveOnCondition } from '../../node_modules/toolbox-v2/src/toolbox/components/active-on-condition/base';
import { Scroll } from '../../node_modules/toolbox-v2/src/toolbox/utils/cached-vectors/scroll';
var About = (function () {
    function About() {
        this.blockWatcher_ = null;
        this.profiles_ = Array.from(document.querySelectorAll('.profile'));
    }
    About.prototype.blockReveal = function () {
        var _this = this;
        this.profiles_.map(function (frame, frameIndex) {
            _this.blockWatcher_ = new ActiveOnCondition("profile--" + (frameIndex + 1), function () {
                return (Scroll.getSingleton().getPosition().y >
                    frame.offsetTop - window.innerHeight / 2);
            }, 'reveal');
        });
    };
    return About;
}());
export { About };
