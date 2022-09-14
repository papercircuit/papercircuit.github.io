const removeBtn = document.querySelector('.remove-btn');

function Bookshelf(books = []) {
  this.books = books;
  this.visibleBooks = books;

  this.addBook = function (book) {
    this.visibleBooks.unshift(book);
  };

  // Hide book when remove button is clicked

  this.removeBook = function (book) {
    const index = this.books.indexOf(book);
    this.visibleBooks.splice(index, 1);
  };




  // this.removeBook = function (book) {
  //   // Find a book with the same title
  //   const idx = this.books.map((b) => b.title).indexOf(book.title);
  //   if (idx !== -1) {
  //     this.books.splice(idx, 1);
  //     return book;
  //   } else {
  //     return null;
  //   }
  // };


  this.render = function () {
    document.querySelector('#app');
    let counter = 0;
    const counterElement = document.querySelector('.counter');
    const ul = Object.assign(document.createElement("ul"), { className: "bookshelf" });
    const books = this.visibleBooks.map((b) => b.render());
    ul.replaceChildren(...books);
    books.forEach(element => {
      counter++;
      counterElement.textContent = counter;
    });
   
    return ul;
  };

  // This allows us to maintain the original list of books
  this.filterVisibleBooks = function (criteria) {
    this.visibleBooks = this.books.filter(criteria);
  };

  this.sortVisibleBooks = function (sortFn) {
    this.visibleBooks.sort(sortFn);
  };
}
