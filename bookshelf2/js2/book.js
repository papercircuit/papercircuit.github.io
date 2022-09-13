function Book(title, author, subject, language){
    this.title = title;
    this.author = author;
    this.subject = subject;
    this.language = language;

    // this.fav = function() {
    //     this.addClass('fav')
    // }

    this.render = function() {
        // Create a ul for each book element a
        const bookElement = Object.assign(document.createElement("ul"), { className: 'book-element' });

        // Set each book element's draggable attribute to true.
        bookElement.setAttribute('draggable', true);
        bookElement.setAttribute('ondragstart', 'onDragStart(event)');
        bookElement.setAttribute('ondragover', 'null');
        bookElement.setAttribute('class', 'book-element example-draggable');
        bookElement.setAttribute('id', 'draggable-1');


        // Create list element for each property of a book and assign classes using Object.assign(source, target) method.

        const li = Object.assign(document.createElement("li"),
        { className: 'book-text1' });;
        const li2 = Object.assign(document.createElement("li"),
        { className: 'book-text2' });;
        const li3 = Object.assign(document.createElement("li"), { className: 'book-text3' });
        const li4 = Object.assign(document.createElement("li"), { className: 'book-text4' });
        const removeButton = Object.assign(document.createElement("button"), { className: 'remove-button' });
        removeButton.setAttribute('onclick', 'this.parentNode.remove()');

        const favButton = Object.assign(document.createElement("button"), { className: 'fav-button' });
        favButton.setAttribute('onclick', 'this.parentNode.classList.add("fav")');

        // const unfavButton = Object.assign(document.createElement("button"), { className: 'unfav-button' });
        // favButton.setAttribute('onclick', 'this.parentNode.classList.remove("fav")');

        // Add in text content from book properties. One per li. Four li per book.
        li.textContent = `${this.title}`;
        li2.textContent = `${this.author}`;
        li3.textContent = `${this.subject}`;
        li4.textContent = `${this.language}`;

        removeButton.textContent = "REMOVE";
        favButton.textContent = "FAV";
        // unfavButton.textContent = "UN-FAV";

        // Append li's to bookElement ul
        bookElement.append(li);
        bookElement.append(li2);
        bookElement.append(li3);
        bookElement.append(li4);
        bookElement.append(removeButton)
        bookElement.append(favButton);
        // bookElement.append(unfavButton);
        return bookElement;
    }
}