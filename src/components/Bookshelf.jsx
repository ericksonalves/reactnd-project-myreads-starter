import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import BookModel from '../models/Book';

const Bookshelf = (props) => {
  const { books, onBookshelfChanged, title } = props;

  const handleOnBookshelfChanged = (book, shelf) => {
    onBookshelfChanged(book, shelf);
  };

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book
              book={book}
              key={book.getId()}
              onBookshelfChanged={handleOnBookshelfChanged} />
          ))}
        </ol>
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  books: PropTypes.arrayOf(PropTypes.instanceOf(BookModel)).isRequired,
  onBookshelfChanged: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default Bookshelf;
