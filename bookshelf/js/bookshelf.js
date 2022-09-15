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
    let englishCounter = 0;
    // Get counter elements
    const counterElement = document.querySelector('.counter');
    const englishCounterElement = document.querySelector('.englishCounter');
    const ul = Object.assign(document.createElement("ul"), { className: "bookshelf" });
    const bookHTMLElements = this.visibleBooks.map((b) => b.render());
    ul.replaceChildren(...bookHTMLElements);



    this.visibleBooks.forEach(element => {
      // Counter +1 for every book rendered
      counter++;
      // Update counter
      counterElement.textContent = `Number of matching books: ${counter}`;
      englishCounterElement.textContent = `Number of English books: ${englishCounter}`
      // If element.language is English, englishCounter +1
      console.log(element);
      if(element.language == "en") {

        englishCounter++;
      }
      
      englishCounterElement.textContent = `Number of English books: ${englishCounter}`;
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
