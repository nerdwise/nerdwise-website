class Contact {
  private contactTopics_: HTMLElement[];
  private contactForms_: HTMLElement[];
  constructor() {
    this.contactTopics_ = Array.from(
      document.querySelectorAll('.contact__topic')
    );
    this.contactForms_ = Array.from(
      document.querySelectorAll('.contact__form')
    );
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
}

export { Contact };
