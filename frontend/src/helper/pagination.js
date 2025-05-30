export default function paginationHelper(totalPages, currentPage) {
    let pageNumbers = [];
  
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {

      pageNumbers.push(1);
     if (currentPage > 3) {
        pageNumbers.push("...");
      }
  
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
  
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      } if (currentPage < totalPages - 2) {
        pageNumbers.push("...");
      } if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
  
    return pageNumbers;
  }