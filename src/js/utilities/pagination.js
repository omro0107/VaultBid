export function setupPagination(currentPage, totalPages, loadListings) {
  const prevPageBtn = document.getElementById('prev-page');
  const nextPageBtn = document.getElementById('next-page');

  prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      console.log(`Previous page clicked. Current page: ${currentPage}`); 
      loadListings(currentPage);
    }
  });

  nextPageBtn.addEventListener('click', () => {
    console.log('Next page button clicked');
    if (currentPage < totalPages) {
      currentPage++;
      console.log(`Loading listings for page: ${currentPage}`);
      loadListings(currentPage);
    }
  });
}