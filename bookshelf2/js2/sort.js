// --------------------------
//#region Sorting
// --------------------------

const sortBy = document.querySelector(".sortBy");

// NOTE: This only sorts by the titles of the books!
sortBy.addEventListener("change", () => {
  const query = sortBy.value;
  let sortFn;

  if (query === "titleaz") {
    sortFn = (a, b) => a.title.localeCompare(b.title);
  } else if (query === "titleza") {
    sortFn = (a, b) => b.title.localeCompare(a.title);
  }

  bookshelf.sortVisibleBooks(sortFn);
  render();
});

//#endregion Sorting
