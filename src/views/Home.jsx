import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from '../components/Bookshelf';
import * as BooksRepository from '../repositories/BooksRepository';

class Home extends React.Component {
  state = {
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: []
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    BooksRepository.getAll()
      .then((books) => this.updateState(books));
  }

  handleOnBookshelfChanged = (book, shelf) => {
    BooksRepository.update(book, shelf)
      .then(() => this.fetchData());
  };

  updateState(books) {
    const wantToReadBooks = books.filter((book) => book.status === 'wantToRead');
    const currentlyReadingBooks = books.filter((book) => book.status === 'currentlyReading');
    const readBooks = books.filter((book) => book.status === 'read');

    this.setState({
      wantToReadBooks: wantToReadBooks,
      currentlyReadingBooks: currentlyReadingBooks,
      readBooks: readBooks
    });
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              books={this.state.currentlyReadingBooks}
              onBookshelfChanged={this.handleOnBookshelfChanged}
              title='Currently Reading' />
            <Bookshelf
              books={this.state.wantToReadBooks}
              onBookshelfChanged={this.handleOnBookshelfChanged}
              title='Want to Read' />
            <Bookshelf
              books={this.state.readBooks}
              onBookshelfChanged={this.handleOnBookshelfChanged}
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
}

export default Home;
