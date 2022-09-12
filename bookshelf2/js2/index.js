function bookshelfApp() {
    // Initialize bookshelf app
    this.init = function () {

        //Create a new bookshelf object and pass in bookData.
        this.freshBookshelf = new Bookshelf(bookData)
    }

    // Generate DOM

    this.render = function () {
        // Select the main bookshelf element 
        const app = document.querySelector("#bookshelf");

        // Create a ul for each shelf (in this case 1)
        const list = Object.assign(document.createElement("ul"), { className: "bookshelf-element" });


        // Loop through booksData passed in to new Bookshelf()
        for (const book of this.freshBookshelf.books) {

            // Create a ul for each book element a
            const bookElement = Object.assign(document.createElement("ul"), { className: 'book-element' });

            // Set each book element's draggable attribute to true.
            bookElement.setAttribute('draggable', true);
            bookElement.setAttribute('ondragstart', 'onDragStart(event)');
            bookElement.setAttribute('class', 'book-element example-draggable');
            bookElement.setAttribute('id', 'draggable-1');

            // Create list element for each property of a book and assign classes using Object.assign(source, target) method.

            const li = Object.assign(document.createElement("li"), { className: 'book-text1' });
            const li2 = Object.assign(document.createElement("li"), { className: 'book-text2' });
            const li3 = Object.assign(document.createElement("li"), { className: 'book-text3' });
            const li4 = Object.assign(document.createElement("li"), { className: 'book-text4' });

            // Add in text content from book properties. One per li. Four li per book.
            li.textContent = `${book.title}`;
            li2.textContent = `${book.author}`;
            li3.textContent = `${book.subject}`;
            li4.textContent = `${book.language}`;

            // Append li's to booksElement ul
            bookElement.append(li);
            bookElement.append(li2);
            bookElement.append(li3);
            bookElement.append(li4);

            // Append booksElement ul to list ul
            list.append(bookElement);

        }

        // Add the ul to the main app interface
        app.append(list)

    }

    // Do this when a BookshelfApp is created.
    this.init();
}



const newBookshelfApp = new bookshelfApp();
console.log(newBookshelfApp.render())
