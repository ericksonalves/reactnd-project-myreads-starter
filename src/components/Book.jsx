import React from 'react';
import BookshelfChanger from './BookshelfChanger';

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

export default Book;
