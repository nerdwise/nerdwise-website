import { ActiveOnCondition } from '../../node_modules/toolbox-v2/src/toolbox/components/active-on-condition/base';
import { Scroll } from '../../node_modules/toolbox-v2/src/toolbox/utils/cached-vectors/scroll';
var Nav = (function () {
    function Nav() {
        this.scrollEffect_ = null;
        this.sectionWatcher_ = null;
        this.hero_ = document.querySelector('.hero');
        this.navBackground_ = document.querySelector('.nav__background');
        this.about_ = document.querySelector('#about');
        this.projects_ = document.querySelector('#projects');
        this.workflow_ = document.querySelector('#workflow');
        this.contact_ = document.querySelector('#contact');
    }
    Nav.prototype.currentSection = function () {
        var _this = this;
        var sections = ['workflow', 'projects', 'about', 'contact'];
        var sectionElements = [
            this.workflow_,
            this.projects_,
            this.about_,
            this.contact_
        ];
        sections.map(function (section, sectionIndex) {
            _this.sectionWatcher_ = new ActiveOnCondition("nav__link--" + section, function () {
                return (Scroll.getSingleton().getPosition().y >
                    sectionElements[sectionIndex].offsetTop - 30 &&
                    Scroll.getSingleton().getPosition().y <
                        sectionElements[sectionIndex + 1].offsetTop - 30);
            }, 'active');
        });
    };
    Nav.prototype.init = function () {
        this.currentSection();
    };
    return Nav;
}());
export { Nav };
