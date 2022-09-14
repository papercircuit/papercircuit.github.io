const input = document.querySelector('search');
const log = document.querySelector('log');
// const sort = document.querySelector('sort-method');
// sort.addEventListener('select', sortArray);

function searchArray(e) {
  let filtered = [];
  const input = e.target.value.toLowerCase();
  if (input) {
    filtered = bookData.filter((el) => {
      return Object.values(el).some((val) =>
        String(val).toLowerCase().includes(input));
    });
    
    // Clear bookshelf
    freshBookshelf.books = [];
    console.log("filtered", filtered)
    log.textContent = JSON.stringify(filtered);

    for (const bookInfo of filtered) {
      const book2 = new Book(
        bookInfo.author,
        bookInfo.language,
        bookInfo.subject,
        bookInfo.title
      );
      freshBookshelf.addBook(book2);
    }
  
  }
  app.replaceChildren(freshBookshelf.render());
 
}


