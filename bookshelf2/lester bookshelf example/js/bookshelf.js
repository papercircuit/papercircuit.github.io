function Bookshelf(books = []) {
  this.books = books;

  this.addBook = function (book) {
    this.books.push(book);
  };

  this.removeBook = function (book) {
    // Find a book with the same title
    const idx = this.books.map((b) => b.title).indexOf(book.title);
    if (idx !== -1) {
      this.books.splice(idx, 1);
      return book;
    } else {
      return null;
    }
  };

  /* CHANGE RENDER! THIS IS A TEMPLATE */
  this.render = function () {
    const ul = document.createElement("ul");
    for (const book of this.books) {
      ul.append(book.render());
    }
    return ul;
  };
}
