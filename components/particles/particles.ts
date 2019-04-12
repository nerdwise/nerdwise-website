import particlesJS from "particles.js";

class Particles {
  constructor() {}

  startParticles() {
    particlesJS.load("particles-js", "./particles.json", function() {
      console.log("callback - particles-js config loaded");
    });
  }
}

export { Particles };
