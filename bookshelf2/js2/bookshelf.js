function Bookshelf(books) {
    // Properties
    this.books = books;

    // Methods 
    // Unsure about usage of this.
    this.addBook = function (book) {
        this.books.push(book);
    };

    // Unsure about usage of this.
    this.removeBook = function (book) {
        // Check if given book is in the books array. 

        // Find the index of the book in this.books.
        const index = this.books.indexOf(book);
        if (index != -1) {
            // Remove book at index of this.books[i]
            this.books.splice(index, 1);
            return book;
        } else { // If the book was not found.
            return null;
        }
    }

    this.render = function () {
        const list = document.createElement("ul");
        for (const book of this.books) {
            const bookElement = book.render();
            list.append(bookElement)
        }
    }
}
