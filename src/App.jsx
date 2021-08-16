import React from 'react';
import { Route } from 'react-router-dom';
import Home from './views/Home';
import Search from './views/Search';
import * as BooksRepository from './repositories/BooksRepository';
import './App.css';

class BooksApp extends React.Component {
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
      <div className="app">
        <Route
          exact path='/'
          render={() => (
            <Home
              currentlyReadingBooks={this.state.currentlyReadingBooks}
              handleOnBookshelfChanged={this.handleOnBookshelfChanged}
              header='MyReads'
              readBooks={this.state.readBooks}
              wantToReadBooks={this.state.wantToReadBooks} />
          )} />

        <Route
          path='/search'
          render={({ history }) => (
            <Search onClose={() => {
              history.push('/');
              this.fetchData();
            }} />
          )} />
      </div>
    )
  }
}

export default BooksApp;
