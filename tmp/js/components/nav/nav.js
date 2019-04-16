import { ActiveOnCondition } from '../../node_modules/toolbox-v2/src/toolbox/components/active-on-condition/base';
import { Scroll } from '../../node_modules/toolbox-v2/src/toolbox/utils/cached-vectors/scroll';
var Nav = (function () {
    function Nav() {
        this.scrollEffect_ = null;
        this.scrollWatcher_ = null;
        this.sectionWatcher_ = null;
        this.hero_ = document.querySelector('.hero');
        this.navBackground_ = document.querySelector('.nav__background');
        this.about_ = document.querySelector('#about');
        this.projects_ = document.querySelector('#projects');
        this.workflow_ = document.querySelector('#workflow');
        this.contact_ = document.querySelector('#contact');
    }
    Nav.prototype.lightNav = function () {
        this.scrollWatcher_ = new ActiveOnCondition('nav', function () {
            return Scroll.getSingleton().getPosition().y > 20;
        }, 'light');
    };
    Nav.prototype.currentSection = function () {
        var _this = this;
        var sections = ['about', 'projects', 'workflow', 'contact'];
        var sectionElements = [
            this.about_,
            this.projects_,
            this.workflow_,
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
        this.lightNav();
        this.currentSection();
    };
    return Nav;
}());
export { Nav };
