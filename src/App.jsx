import React from 'react';
import { Route } from 'react-router-dom';
import Home from './views/Home';
import Search from './views/Search';
import './App.css';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route
          exact path='/'
          component={Home} />

        <Route
          path='/search'
          render={({ history }) => (
            <Search onClose={() => {
              history.push('/');
            }} />
          )} />
      </div>
    )
  }
}

export default BooksApp;
