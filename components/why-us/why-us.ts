import { Accordion } from 'toolbox/components/accordion/base';

class WhyUs {
  private readonly modal_: HTMLElement;
  private readonly button_: HTMLElement;
  private readonly whyUsContent_: HTMLElement;
  private readonly modalContent_: HTMLElement;

  constructor() {
    this.modal_ = document.querySelector('.modal');
    this.button_ = document.querySelector('.why-us__button');
    this.whyUsContent_ = document.querySelector('.why-us__content');
    this.modalContent_ = document.querySelector('.modal__content');
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

  accordion(): void {
    new Accordion(this.modalContent_, {
      contentSelector: 'modal__answer',
      itemSelector: 'modal__item',
      toggleSelector: 'modal__question'
    });
  }

  init(): void {
    this.openModal();
    this.accordion();
  }
}

export { WhyUs };
