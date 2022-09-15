// Using constructor to create a new object called ShortStories
// ShortStories extends Book 
// ShortStories has a new property called pageCount


function ShortStories (author, language, subject, title, pageCount) {
  Book.call(this, author, language, subject, title);
  // ShortStories are 100 pages or less
  this.pageCount = pageCount;
}

