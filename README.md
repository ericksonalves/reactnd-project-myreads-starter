
# MyReads Project

In the MyReads project, you will find a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read.

## How to run

To get started, please:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Project Structure
```bash
├── README.md - # This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms.
├── package.json # npm package manager file.
├── public # Public folder.
│   ├── favicon.ico
│   └── index.html
└── src
    ├── components # This is the list of components used in the app.
    │   ├── Book.js
    │   ├── Bookshelf.js
    │   └── BookshelfChanger.js
    ├── icons # Helpful images.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── models # This is the representation of the models used in the app.
    │   ├── Book.js
    ├── repositories # This is the data provider that consumes the API and parses the result.
    │   ├── BookRepository.js
    ├── services # This is the API communicator.
    │   ├── BooksAPI.js
    ├── utils # These are the utils used in the app.
    │   ├── BookUtils.js
    │   ├── StringUtils.js
    ├── views # This is the list of pages in the app.
    │   ├── Home.js
    │   ├── Search.js
    ├── App.css # Styles.
    ├── App.js # This is the root of the app.
    ├── App.test.js # Used for testing.
    ├── index.css # Global styles.
    └── index.js # It is used for DOM rendering only.
```

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap do not come back with any results.

