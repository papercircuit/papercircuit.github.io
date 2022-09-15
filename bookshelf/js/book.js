function Book(author, language, subject, title) {
  this.author = author;
  this.language = language;
  this.subject = subject;
  this.title = title;
  // Empty array to hold user comments
  this.comments = [];
  // Set every book to NOT be a favorite by default
  this.favorite = false;


  this.render = () => {
    const favoriteBooks = document.querySelector('.favorite-books');
    const ul = Object.assign(document.createElement("ul"), { className: 'book' });
    const li1 = Object.assign(document.createElement("li"),
      { className: 'book-text1' });;
    const li2 = Object.assign(document.createElement("li"),
      { className: 'book-text2' });;
    const li3 = Object.assign(document.createElement("li"), { className: 'book-text3' });
    const li4 = Object.assign(document.createElement("li"), { className: 'book-text4' });
    const li5 = Object.assign(document.createElement("li"), { className: 'book-text5' });

  // FAV BUTTON

    const favButton = Object.assign(document.createElement("button"), { className: 'fav-button' });

    favButton.addEventListener('click', () => {
      this.favorite = !this.favorite;
      if (this.favorite) {
        ul.classList.add('fav');
        favoriteBooks.appendChild(ul);
      } else {
        ul.classList.remove('fav');
        favoriteBooks.removeChild(ul);
      }
    });

  // COMMENT BUTTON

    const commentButton = Object.assign(document.createElement("button"), { className: 'comment-button' });

    //When comment-button is clicked, a text input field should appear that is limited to 280 characters.
    commentButton.addEventListener('click', () => {
      const commentInput = Object.assign(document.createElement("input"), { className: 'comment-input' });
      const submitButton = Object.assign(document.createElement("button"), { className: 'submit-button' });

      submitButton.addEventListener('click', () => {
        this.addComment(commentInput.value);
        li5.textContent = commentInput.value;
        commentInput.value = '';
        ul.removeChild(commentInput);
        ul.removeChild(submitButton);
      });

      submitButton.textContent = 'Submit';
      commentInput.setAttribute('type', 'text');
      commentInput.setAttribute('maxlength', '280');
      commentInput.setAttribute('placeholder', 'Add a comment');
      ul.appendChild(commentInput);
      ul.appendChild(submitButton);
    });

  // REMOVE BUTTON

    // When the remove-button is clicked, the book should be removed from the bookshelf, but remain in the array of books
    const removeButton = Object.assign(document.createElement("button"), { className: 'remove-button' });

    removeButton.addEventListener('click', () => {
      const counterElement = document.querySelector('.counter');
      const index = bookshelf.books.indexOf(this);
      // Remove book by adding a class of 'hidden'
      ul.classList.toggle('hidden');
      // Counter -1 for every book removed
      counter--;
      // Update counter
      counterElement.textContent = `Number of visible books: ${counter}`;
    });

    // Set the text content of each li to the corresponding property of the book

    li1.textContent = `TITLE: ${this.title}`;
    li2.textContent = `AUTHOR: ${this.author}`;
    li3.textContent = `SUBJECT: ${this.subject}`;
    li4.textContent = `LANGUAGE: ${this.language}`;
    li5.textContent = `COMMENTS: ${this.comments}`;

    // Set the button text content
    favButton.textContent = "FAV/UNFAV📔";
    commentButton.textContent = "WRITE A COMMENT 📝";
    removeButton.textContent = "REMOVE 🗑";

    // Append the li's and buttons to the ul
    ul.append(li1, li2, li3, li4, li5, favButton, commentButton, removeButton);
    return ul;
  };

  this.addComment = function (comment) {
    this.comments.push(comment);
  };

}

