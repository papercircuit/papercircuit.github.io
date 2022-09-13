const app = document.querySelector("#bookshelf");
const freshBookshelf = new Bookshelf();


// Load in book data
for (const bookInfo of bookData) {
    const book = new Book(
        bookInfo.author,
        bookInfo.language,
        bookInfo.subject,
        bookInfo.title
    );
    freshBookshelf.addBook(book);
}

const sort = () => {
    // Remove list if it exists
    const existingBookshelf = document.querySelector(".bookshelf-element");
    if (existingBookshelf != null) {
        document.querySelector(".bookshelf-element").remove();

        // Create a new bookshelf object
        const freshBookshelf = new Bookshelf();
        for (const bookInfo of bookData) {
            const book = new Book(
                bookInfo.author,
                bookInfo.language,
                bookInfo.subject,
                bookInfo.title
            );

            freshBookshelf.addBook(book);
        }

    }
    app.append(freshBookshelf.render());
}


// Add the ul to the main app interface
// app.append(freshBookshelf.render())





