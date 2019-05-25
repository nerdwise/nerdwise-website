import { Accordion } from 'toolbox/components/accordion/base';
import { ScrollLockService } from 'toolbox/components/scroll-lock-service/scroll-lock-service';

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

  public init(): void {
    this.openModalOnClick_();
    this.accordion_();
  }

  private openModal_(): void {
    this.modal_.classList.add('display');
    this.whyUsContent_.classList.add('hide');
    ScrollLockService.getSingleton().lockScroll();
  }

  private closeModal_(): void {
    this.modal_.classList.remove('display');
    this.whyUsContent_.classList.remove('hide');
    ScrollLockService.getSingleton().unlockScroll();
  }

  private openModalOnClick_(): void {
    this.button_.addEventListener('click', () => {
      this.openModal_();
    });
    this.closeModalOnClick_();
  }

  private closeModalOnClick_(): void {
    window.addEventListener('click', event => {
      if (event.target == this.modal_) {
        this.closeModal_();
      }
    });
    const x: HTMLElement = document.querySelector('.modal__x');
    x.addEventListener('click', () => {
      this.closeModal_();
    });
  }

  private accordion_(): void {
    new Accordion(this.modalContent_, {
      contentSelector: 'modal__answer',
      itemSelector: 'modal__item',
      toggleSelector: 'modal__question'
    });
  }
}

export { WhyUs };
