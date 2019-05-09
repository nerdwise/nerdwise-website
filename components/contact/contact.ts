class Contact {
  private contactTopics_: HTMLElement[];
  private contactForms_: HTMLFormElement[];
  constructor() {
    this.contactTopics_ = Array.from(
      document.querySelectorAll('.contact__topic')
    );
    this.contactForms_ = Array.from(
      document.querySelectorAll('.contact__form')
    );
  }

  init(): void {
    this.onClick();
    this.submitForm();
  }

  removeRevealClasses(): void {
    this.contactForms_.map((form, formIndex) => {
      form.classList.remove(`contact__form--${formIndex + 1}--reveal`);
    });
    this.contactTopics_.map(topic => {
      topic.classList.remove('contact__topic--active');
    });
  }

  onClick(): void {
    this.contactTopics_.map((topic, topicIndex) => {
      topic.addEventListener('click', () => {
        this.removeRevealClasses();
        const form = document.querySelector(
          `.contact__form--${topicIndex + 1}`
        );
        form.classList.add(`contact__form--${topicIndex + 1}--reveal`);
        topic.classList.add('contact__topic--active');
      });
    });
  }

  submitForm(): void {
    this.contactForms_.forEach(form => {
      form.addEventListener('submit', e => {
        const data = new FormData(form);

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

        e.preventDefault();
      });
    });
  }
}

export { Contact };
