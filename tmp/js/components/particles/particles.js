import particlesJS from "particles.js";
var Particles = (function () {
    function Particles() {
    }
    Particles.prototype.startParticles = function () {
        particlesJS.load("particles-js", "./particles.json", function () {
            console.log("callback - particles-js config loaded");
        });
    };
    return Particles;
}());
export { Particles };
