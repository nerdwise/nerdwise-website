import { loadImage } from '../../node_modules/toolbox-v2/src/toolbox/utils/loading/load-image';

class Projects {
  private projectImages_: HTMLImageElement[];

  constructor() {
    this.projectImages_ = [];
  }

  init(): void {
    this.projectImages_ = Array.from(
      document.querySelectorAll('img.project__image')
    );
    this.lazyLoad_();
  }

  private lazyLoad_(): void {
    this.projectImages_.forEach(image => {
      const imageUrl: string = image.dataset.src;
      loadImage(imageUrl).then(() => {
        image.src = imageUrl;
      });
    });
  }
}

export { Projects };
