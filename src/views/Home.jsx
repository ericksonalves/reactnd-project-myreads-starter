import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from '../components/Bookshelf';

const Home = (props) => {
  const {
    currentlyReadingBooks,
    handleOnBookshelfChanged,
    header,
    readBooks,
    wantToReadBooks } = props;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>{header}</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf
            books={currentlyReadingBooks}
            onBookshelfChanged={handleOnBookshelfChanged}
            title='Currently Reading' />
          <Bookshelf
            books={wantToReadBooks}
            onBookshelfChanged={handleOnBookshelfChanged}
            title='Want to Read' />
          <Bookshelf
            books={readBooks}
            onBookshelfChanged={handleOnBookshelfChanged}
            title='Read' />
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
