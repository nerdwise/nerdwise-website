class WhyUs {
  private modal_: HTMLElement;
  private button_: HTMLElement;
  private whyUsContent_: HTMLElement;

  constructor() {
    this.modal_ = document.querySelector('.modal');
    this.button_ = document.querySelector('.why-us__button');
    this.whyUsContent_ = document.querySelector('.why-us__content');
  }

  openModal(): void {
    this.button_.addEventListener('click', () => {
      this.modal_.classList.add('display');
      this.whyUsContent_.classList.add('hide');
    });
    this.closeModal();
  }

  closeModal(): void {
    window.addEventListener('click', event => {
      if (event.target == this.modal_) {
        this.modal_.classList.remove('display');
        this.whyUsContent_.classList.remove('hide');
      }
    });
    const x: HTMLElement = document.querySelector('.modal__x');
    x.addEventListener('click', () => {
      this.modal_.classList.remove('display');
      this.whyUsContent_.classList.remove('hide');
    });
  }

  init(): void {
    this.openModal();
  }
}

export { WhyUs };
