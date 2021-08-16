class Book {
  constructor(authors, id, status, thumbnailUrl, title) {
    this.authors = authors;
    this.id = id;
    this.status = status;
    this.thumbnailUrl = thumbnailUrl;
    this.title = title;
  }

  getAuthors() {
    return this.authors;
  }

  getId() {
    return this.id;
  }

  getStatus() {
    return this.status;
  }

  getThumbnailUrl() {
    return `url('${this.thumbnailUrl}')`;
  }

  getTitle() {
    return this.title;
  }
}

export default Book;