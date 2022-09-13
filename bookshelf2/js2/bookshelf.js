function Bookshelf(books = []) {
    // Properties
    this.books = books;
    this.fav = fav;

    // Methods 
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

    this.render = function () {
        const list = Object.assign(document.createElement("ul"), { className: "bookshelf-element" });
        for (const book of this.books) {
            const bookElement = book.render();
            list.append(bookElement)
        }
        return list;
    };

    this.fav = function () {
        const favList = Object.assign(document.createElement("ul"), { className: "fav" });
        for (const book of this.books) {

        }
    };

}

const fav = () => {}
