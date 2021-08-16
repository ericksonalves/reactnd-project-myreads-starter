import React from 'react';
import Book from '../components/Book';
import * as BooksRepository from '../repositories/BooksRepository';
import * as BookUtils from '../utils/BookUtils';

class Search extends React.Component {
  state = {
    books: [],
    query: ''
  };

  applyStatuses = (allBooks, bookshelvesBooks) => {
    const currentlyReading = BookUtils.filterByStatus(bookshelvesBooks, 'currentlyReading');
    const read = BookUtils.filterByStatus(bookshelvesBooks, 'read');
    const wantToRead = BookUtils.filterByStatus(bookshelvesBooks, 'wantToRead');

    const currentlyReadingSet = BookUtils.toIdSet(currentlyReading);
    const readSet = BookUtils.toIdSet(read);
    const wantToReadSet = BookUtils.toIdSet(wantToRead);

    allBooks.forEach(book => {
      if (currentlyReadingSet.has(book.getId())) {
        book.status = 'currentlyReading';
      } else if (readSet.has(book.getId())) {
        book.status = 'read';
      } else if (wantToReadSet.has(book.getId())) {
        book.status = 'wantToRead';
      }
    });

    this.updateBooks(allBooks);
  };

  handleOnBookshelfChanged = (book, shelf) => {
    BooksRepository.update(book, shelf)
      .then(() => this.fetchData());
  };

  handleOnChange = (event) => {
    event.preventDefault();
    this.updateQuery(event.target.value);
  };

  handleOnKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.fetchData();
    }
  };

  fetchData() {
    let searchedBooks = undefined;

    BooksRepository.search(this.state.query)
      .then((books) => searchedBooks = books)
      .then(() => BooksRepository.getAll())
      .then((books) => this.applyStatuses(searchedBooks, books));
  }

  updateBooks = (books) => {
    this.setState({
      books: books
    });
  };

  updateQuery = (query) => {
    this.setState({
      query: query
    });
  };

  render() {
    const { onClose } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={onClose}>Close</button>
          <div className="search-books-input-wrapper">
            <input
              onChange={this.handleOnChange}
              onKeyDown={this.handleOnKeyDown}
              type="text"
              placeholder="Search by title or author"
              value={this.state.query} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book) => (
              <Book
                book={book}
                key={book.getId()}
                onBookshelfChanged={this.handleOnBookshelfChanged} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
