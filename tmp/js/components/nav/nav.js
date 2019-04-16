import { ScrollEffect } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import { Tween } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween';
import { DistanceFunction } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function';
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
    Nav.prototype.slideNav = function () {
        this.scrollEffect_ = new ScrollEffect(this.hero_, {
            effects: [
                new Tween([[0, 'width: 0'], [1, 'width: 100vw']], {
                    styleTarget: this.navBackground_
                })
            ],
            getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP,
            startDistance: function () { return 0; },
            endDistance: window.innerHeight / 4
        });
    };
    Nav.prototype.darkNav = function () {
        this.scrollWatcher_ = new ActiveOnCondition('nav', function () {
            return Scroll.getSingleton().getPosition().y > window.innerHeight / 4;
        }, 'dark');
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
        this.slideNav();
        this.darkNav();
        this.currentSection();
    };
    return Nav;
}());
export { Nav };
