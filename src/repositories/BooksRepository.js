import * as BooksAPI from '../services/BooksAPI';
import Book from '../models/Book';
import * as StringUtils from '../utils/StringUtils';

export const get = (bookId) =>
  BooksAPI.get(bookId)
  .then((rawBook) => toBook(rawBook))

export const getAll = () =>
  BooksAPI.getAll()
  .then((rawBooks) =>
    rawBooks.map(
      (rawBook) => toBook(rawBook)
    )
  )

export const update = (book, shelf) =>
  BooksAPI.update(book, shelf)

export const search = (query) =>
  BooksAPI.search(query)
  .then((rawBooks) =>
    rawBooks && !rawBooks.error ?
    rawBooks.map(
      (rawBook) => toBook(rawBook)
    ) : []
  )

const toBook = (rawBook) =>
  new Book(
    StringUtils.join(rawBook.authors, ', '),
    rawBook.id,
    rawBook.shelf ? rawBook.shelf : 'none',
    rawBook.imageLinks ? rawBook.imageLinks.thumbnail : '',
    rawBook.title
  );