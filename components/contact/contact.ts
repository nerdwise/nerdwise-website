class Contact {
  private readonly contactTopics_: HTMLElement[];
  private readonly contactForms_: HTMLFormElement[];
  private readonly buttons_: HTMLElement[];
  private readonly formFields_: HTMLInputElement[];
  private readonly message_: HTMLElement;
  private submitted_: boolean;

  constructor() {
    this.contactTopics_ = Array.from(
      document.querySelectorAll('.contact__topic')
    );
    this.contactForms_ = Array.from(
      document.querySelectorAll('.contact__form')
    );
    this.buttons_ = Array.from(document.querySelectorAll('.form__button'));
    this.formFields_ = Array.from(
      document.querySelectorAll('.form__field__control')
    );
    this.message_ = document.querySelector('.message');
    this.submitted_ = false;
  }

  public init(): void {
    this.onClick_();
    this.submitForm_();
  }

  private removeRevealClasses_(): void {
    this.contactForms_.forEach((form, formIndex) => {
      form.classList.remove(`contact__form--reveal`);
    });
    this.contactTopics_.forEach(topic => {
      topic.classList.remove('contact__topic--active');
    });
  }

  private onClick_(): void {
    this.contactTopics_.forEach((topic, topicIndex) => {
      topic.addEventListener('click', () => {
        if (this.submitted_ === false) {
          this.removeRevealClasses_();
          const form = document.querySelector(
            `.contact__form--${topicIndex + 1}`
          );
          form.classList.add(`contact__form--reveal`);
          topic.classList.add('contact__topic--active');
        }
      });
    });
  }

  private submitForm_(): void {
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
            form.classList.remove('contact__form--reveal');
            this.message_.classList.add(
              `${this.message_.classList[0]}--reveal`
            );
            this.submitted_ = true;
            this.contactTopics_.forEach(topic => {
              topic.classList.add(`${topic.classList[0]}--disabled`);
              topic.classList.remove('contact__topic--active');
            });
          }
        };

        e.preventDefault();
      });
    });
  }
}

export { Contact };
