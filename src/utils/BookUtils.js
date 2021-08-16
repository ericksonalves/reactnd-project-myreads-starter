export const filterByStatus = (books, status) => {
  return books.filter((book) => book.status === status);
};

export const toIdSet = (books) => {
  return new Set(books.map((book) => book.getId()));
};