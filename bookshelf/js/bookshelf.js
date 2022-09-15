const removeBtn = document.querySelector('.remove-btn');
let counter = 0;
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

  this.render = function () {
    document.querySelector('#app');
    // Set counter to 0 for every render
    counter = 0;
    const counterElement = document.querySelector('.counter');
    const ul = Object.assign(document.createElement("ul"), { className: "bookshelf" });
    const books = this.visibleBooks.map((b) => b.render());
    ul.replaceChildren(...books);
    books.forEach(element => {
      counter++;
      counterElement.textContent = `Number of visible books: ${counter}`;
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
