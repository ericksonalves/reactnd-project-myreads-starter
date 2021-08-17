export const anyMatchingId = (books, id) => {
  const res = books.filter((book) => book.getId() === id).length;
  console.log(res);
  return res > 0;
};

export const filterByStatus = (books, status) => {
  return books.filter((book) => book.getStatus() === status);
};

export const toIdSet = (books) => {
  return new Set(books.map((book) => book.getId()));
};