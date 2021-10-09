import View from "./view";

class SearchView extends View {
  _parentElem = document.querySelector(".search");

  _clearInput() {
    this._parentElem.querySelector(".search__field").value = "";
  }

  getQuery() {
    const result = this._parentElem.querySelector(".search__field").value;
    this._clearInput();
    return result;
  }

  addHandlerSearch(handler) {
    this._parentElem.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
