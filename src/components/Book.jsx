import React from 'react';
import PropTypes from 'prop-types';
import BookshelfChanger from './BookshelfChanger';
import BookModel from '../models/Book';

const Book = (props) => {
  const { book, onBookshelfChanged } = props;

  const handleOnBookshelfChanged = (book, shelf) => {
    onBookshelfChanged(book, shelf);
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: `${book.getThumbnailUrl()}` }} />
          <BookshelfChanger
            book={book}
            onBookshelfChanged={handleOnBookshelfChanged} />
        </div>
        <div className="book-title">{book.getTitle()}</div>
        <div className="book-authors">{book.getAuthors()}</div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.instanceOf(BookModel).isRequired,
  onBookshelfChanged: PropTypes.func.isRequired
};

export default Book;
