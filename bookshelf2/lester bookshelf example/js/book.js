function Book(author, language, subject, title) {
  this.author = author;
  this.language = language;
  this.subject = subject;
  this.title = title;

  /* CHANGE RENDER! THIS IS A TEMPLATE */
  this.render = () => {
    const li = document.createElement('li');
    li.textContent = this.title;
    return li; 
  }
};
