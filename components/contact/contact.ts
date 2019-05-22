class Contact {
  private contactTopics_: HTMLElement[];
  private contactForms_: HTMLFormElement[];
  private buttons_: HTMLElement[];

  constructor() {
    this.contactTopics_ = Array.from(
      document.querySelectorAll('.contact__topic')
    );
    this.contactForms_ = Array.from(
      document.querySelectorAll('.contact__form')
    );
    this.buttons_ = Array.from(document.querySelectorAll('.form__button'));
  }

  init(): void {
    this.onClick();
    this.submitForm();
  }

  removeRevealClasses(): void {
    this.contactForms_.forEach((form, formIndex) => {
      form.classList.remove(`contact__form--reveal`);
    });
    this.contactTopics_.forEach(topic => {
      topic.classList.remove('contact__topic--active');
    });
  }

  onClick(): void {
    this.contactTopics_.forEach((topic, topicIndex) => {
      topic.addEventListener('click', () => {
        this.removeRevealClasses();
        const form = document.querySelector(
          `.contact__form--${topicIndex + 1}`
        );
        form.classList.add(`contact__form--reveal`);
        topic.classList.add('contact__topic--active');
      });
    });
  }

  submitForm(): void {
    this.contactForms_.forEach(form => {
      form.addEventListener('submit', e => {
        let mappedInput: string[] = [];
        Array.from(form).map((input: HTMLInputElement) => {
          if (input.name && input.value !== undefined) {
            mappedInput.push(`${input.name}=${input.value}`);
          }
          return mappedInput;
        });
        const data = mappedInput.join('&');

        const xhr = new XMLHttpRequest();
        xhr.open('POST', form.action, true);
        xhr.setRequestHeader(
          'Accept',
          'application/xml, text/xml, */*; q=0.01'
        );
        xhr.setRequestHeader(
          'Content-type',
          'application/x-www-form-urlencoded; charset=UTF-8'
        );
        xhr.send(data);

        xhr.onreadystatechange = () => {
          if (xhr.readyState == 4) {
            this.buttons_.forEach(button => {
              const cssClass = button.classList;
              const modifiedCssClass = `${cssClass}--success`;
              button.classList.add(modifiedCssClass);
              button.innerHTML = 'Message Sent';
            });
          }
        };

        e.preventDefault();
      });
    });
  }
}

export { Contact };
