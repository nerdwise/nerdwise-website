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
        const data = [].slice
          .call(form)
          .map((input: HTMLInputElement) => {
            return 'value' in input && input.name
              ? input.name +
                  '=' +
                  (input.value === undefined ? '' : input.value)
              : '';
          })
          .join('&');

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
