import React from 'react';
import PropTypes from 'prop-types';
import Book from '../components/Book';
import * as BooksRepository from '../repositories/BooksRepository';
import * as BookUtils from '../utils/BookUtils';

class Search extends React.Component {
  state = {
    books: [],
    query: '',
    bookshelvesBooks: []
  };

  componentDidMount() {
    BooksRepository.getAll()
      .then((books) => this.updateBookshelvesBooks(books));
  }

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
    let bookshelvesBooks = this.state.bookshelvesBooks;

    if (BookUtils.anyMatchingId(bookshelvesBooks, book.getId())) {
      const previousBookshelvesBooks = bookshelvesBooks.filter(
        (bookshelvesBook) => bookshelvesBook.getId() !== book.getId());
      book.status = shelf;
      bookshelvesBooks = [...previousBookshelvesBooks, book];
    } else {
      bookshelvesBooks = [...bookshelvesBooks, book];
    }
    this.updateBookshelvesBooks(bookshelvesBooks);

    BooksRepository.update(book, shelf);
    this.applyStatuses(this.state.books, bookshelvesBooks);
  };

  handleOnChange = (event) => {
    event.preventDefault();
    this.updateQuery(event.target.value);
    this.searchData(event.target.value);
  };

  searchData(query) {
    if (query.trim().length > 0) {
      BooksRepository.search(query.trim())
        .then((books) => this.applyStatuses(books, this.state.bookshelvesBooks));
    } else {
      this.updateBooks([]);
    }
  }

  updateBooks = (books) => {
    this.setState({
      books: books
    });
  };

  updateBookshelvesBooks = (books) => {
    this.setState({
      bookshelvesBooks: books
    });
  }

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

Search.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default Search;
