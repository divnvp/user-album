export function createPagiable(collection = [], currentPage = 0, rowsPerPage = 4) {
  let from = (currentPage * rowsPerPage) - rowsPerPage;
  let to = (currentPage * rowsPerPage);
  return collection.slice(from, to);
}