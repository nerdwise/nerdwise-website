class WhyUs {
  private modal_: HTMLElement;
  private button_: HTMLElement;

  constructor() {
    this.modal_ = document.querySelector('.modal');
    this.button_ = document.querySelector('.why-us__button');
  }

  openModal(): void {
    this.button_.addEventListener('click', () => {
      this.modal_.classList.add('display');
    });
    this.closeModal();
  }

  closeModal(): void {
    window.addEventListener('click', event => {
      if (event.target == this.modal_) {
        this.modal_.classList.remove('display');
      }
    });
    const x: HTMLElement = document.querySelector('.modal__x');
    x.addEventListener('click', () => {
      this.modal_.classList.remove('display');
    });
  }

  init(): void {
    this.openModal();
  }
}

export { WhyUs };
