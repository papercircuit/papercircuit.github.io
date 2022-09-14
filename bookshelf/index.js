const bookList = document.querySelector("#app");
const bookshelf = new Bookshelf();
const userInputTitle = document.querySelector(".userInputTitle");
const userInputAuthor = document.querySelector(".userInputAuthor");
const userInputSubject = document.querySelector(".userInputSubject");
const userInputLanguage = document.querySelector(".userInputLanguage");
const userSubmitBtn = document.querySelector(".userSubmitBtn");
const hider = document.querySelector(".hider");

// Load in book data
for (const bookInfo of bookData) {
  const book = new Book(
    bookInfo.author,
    bookInfo.language,
    bookInfo.subject,
    bookInfo.title
  );
  bookshelf.addBook(book);
}

const render = () => {
  bookList.replaceChildren(bookshelf.render());
};

// Render the first time the page loads
bookshelf.filterVisibleBooks(() => true);
bookshelf.sortVisibleBooks((a, b) => a.title.localeCompare(b.title));
render();

//#endregion Initialization

// --------------------------
//#region Searching
// --------------------------

const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".searchBtn");


searchBtn.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase();
  const searchFn = (b) => {
    if (query.includes("the") === true) {
      query.replace("the", "");
    }
    return b.title.toLowerCase().includes(query);
  };

  bookshelf.filterVisibleBooks(searchFn);
  render();
});

//#endregion Searching
// --------------------------


// --------------------------
//#region User Input Custom Book
// --------------------------


userSubmitBtn.addEventListener("click", () => {
  // Set variables to user input
  const title = userInputTitle.value;
  const author = userInputAuthor.value;
  const language = userInputLanguage.value;
  const subject = userInputSubject.value;

  // Create new book with user input
  const userBook = new Book(title, author, language, subject);
  // Add new book to bookshelf
  bookshelf.addBook(userBook);
  // Render new book
  render();
});


//--------------------------SORTING--------------------------

const sortBy = document.querySelector(".sortBy");

sortBy.addEventListener("change", () => {
  const query = sortBy.value;
  let sortFn;

  if (query === "titleaz") {
    sortFn = (a, b) => a.title.localeCompare(b.title);
  } else if (query === "titleza") {
    sortFn = (a, b) => b.title.localeCompare(a.title);
  } else if (query === "authoraz") {
    sortFn = (a, b) => a.author[0].localeCompare(b.author);
  } else if (query === "authorza") {
    sortFn = (a, b) => b.author[0].localeCompare(a.author);
  } else if (query === "language") {
    sortFn = (a, b) => a.language.localeCompare(b.language);
  } else if (query === "subject") {
    sortFn = (a, b) => a.subject[0].localeCompare(b.subject);
  }

  bookshelf.sortVisibleBooks(sortFn);
  render();
});



// --------------------------POPUP--------------------------

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function hideBody() {
  hider.classList.toggle('hidden');
}