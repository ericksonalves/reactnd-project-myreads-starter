import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from '../components/Bookshelf';
import * as BooksRepository from '../repositories/BooksRepository';
import * as BookUtils from '../utils/BookUtils';

class Home extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    BooksRepository.getAll()
      .then((books) => this.updateBooks(books));
  }

  handleOnBookshelfChanged = (book, shelf) => {
    BooksRepository.update(book, shelf)
      .then(() => this.fetchData());
  };

  updateBooks(books) {
    this.setState({
      books: books
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
              books={BookUtils.filterByStatus(this.state.books, 'currentlyReading')}
              onBookshelfChanged={this.handleOnBookshelfChanged}
              title='Currently Reading' />
            <Bookshelf
              books={BookUtils.filterByStatus(this.state.books, 'wantToRead')}
              onBookshelfChanged={this.handleOnBookshelfChanged}
              title='Want to Read' />
            <Bookshelf
              books={BookUtils.filterByStatus(this.state.books, 'read')}
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
