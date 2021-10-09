import icons from "url:../../img/icons.svg";
import View from "./view";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    let markup;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currentPage = this._data.page;
    const nextPage = currentPage < numPages ? currentPage + 1 : numPages;
    const prevPage = currentPage > 1 ? currentPage - 1 : currentPage;

    if (numPages === 1) {
      return "";
    } else if (numPages > 1 && currentPage === 1) {
      return `
        <button data-goto="${nextPage}" class="btn--inline pagination__btn--next">
          <span>Page ${nextPage}</span>
          <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    } else if (numPages > 1 && currentPage === numPages) {
      return `
        <button data-goto="${prevPage}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${prevPage}</span>
        </button>
      `;
    } else {
      return `
      <button data-goto="${prevPage}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-left"></use>
          </svg>
          <span>Page ${prevPage}</span>
        </button>
        <button data-goto="${nextPage}" class="btn--inline pagination__btn--next">
          <span>Page ${nextPage}</span>
          <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    this._markup = markup;
  }

  addHandlerPagination(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      handler(+btn.dataset.goto);
    });
  }
}

export default new PaginationView();
