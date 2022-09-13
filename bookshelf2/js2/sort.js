const sortButton = document.getElementById('sort-button');
const sortInput = document.getElementById('sort-method')
const sortSelection = sortInput.options[sortInput.selectedIndex];

document.getElementById('title-A-Z').value = sortSelection.value;


function sortArray(e) {
    let sorted = [];
    const sortInput = e.target.value;

    // Sort by title A-Z
    if (sortInput === "title-A-Z") {
        sorted = Bookdata.sort((a, b) => a.title.localeCompare(b.title));

        // Clear bookshelf
        freshBookshelf.books = [];
        console.log("Sorted by title A-Z", sorted)
        log.textContent = JSON.stringify(sorted);

        for (const bookInfo of sorted) {
            const book = new Book(
                bookInfo.author,
                bookInfo.language,
                bookInfo.subject,
                bookInfo.title
            );
            freshBookshelf.addBook(book);
        }
    
    };
    // Sort by title A-Z
    if (sortInput === "title-A-Z") {
        sorted = bookData.sort((a, b) => b.title.localeCompare(a.title));

        // Clear bookshelf
        freshBookshelf.books = [];
        console.log("Sorted by title Z-A", sorted)
        log.textContent = JSON.stringify(sorted);

        for (const bookInfo of sorted) {
            const book = new Book(
                bookInfo.author,
                bookInfo.language,
                bookInfo.subject,
                bookInfo.title
            );
            freshBookshelf.addBook(book);
        }
    
    };
    // Sort by author-A-Z
    if (sortInput === "author-A-Z") {
        sorted = bookData.map(bookData.sort((a, b) => a.author.localeCompare(b.author)));

        // Clear bookshelf
        freshBookshelf.books = [];
        console.log("Sorted by author A-Z", sorted)
        log.textContent = JSON.stringify(sorted);

        for (const bookInfo of sorted) {
            const book = new Book(
                bookInfo.author,
                bookInfo.language,
                bookInfo.subject,
                bookInfo.title
            );
            freshBookshelf.addBook(book);
        }
  
    };
    // Sort by author Z-A
    if (sortInput === "author-Z-A") {
        sorted = bookData.sort((a, b) => b.author.localeCompare(a.author));

        // Clear bookshelf
        freshBookshelf.books = [];
        console.log("Sorted by author Z-A", sorted)
        log.textContent = JSON.stringify(sorted);

        for (const bookInfo of sorted) {
            const book = new Book(
                bookInfo.author,
                bookInfo.language,
                bookInfo.subject,
                bookInfo.title
            );
            freshBookshelf.addBook(book);
        }
       
    };

    app.replaceChildren(freshBookshelf.render());

}


