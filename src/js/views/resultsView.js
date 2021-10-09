import View from "./view";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "🔥 No recipes found for your query. Please try again. 🔥";
  _message = "";

  _generateMarkupPreview(recipe) {
    const id = window.location.hash.slice(1);
    const previewLink = recipe.id === id ? "preview__link--active" : "";

    return `
        <li class="preview">
        <a class="preview__link ${previewLink}" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.image}" alt="${recipe.title}" crossOrigin="anonymous"/>
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
            <div class="preview__user-generated">
            </div>
          </div>
        </a>
      </li>
      `;
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }
}

export default new ResultsView();
