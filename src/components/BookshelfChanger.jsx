import React from 'react';

const BookshelfChanger = (props) => {
  const { book, onBookshelfChanged } = props;

  const handleOnChange = (event) => {
    onBookshelfChanged(book, event.target.value);
  };

  return (
    <div className="book-shelf-changer">
      <select
        onChange={handleOnChange}
        value={book.status}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default BookshelfChanger;
