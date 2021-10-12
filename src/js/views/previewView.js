import icons from "url:../../img/icons.svg";
import View from "./view";

class PreviewView extends View {
  _parentElement = "";

  _generateMarkupPreview(recipe) {
    const id = window.location.hash.slice(1);
    const previewLink = recipe.id === id ? "preview__link--active" : "";

    return `
        <li class="preview">
        <a class="preview__link ${previewLink}" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.image}" alt="${
      recipe.title
    }" crossOrigin="anonymous"/>
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
            <div class="preview__user-generated ${recipe.key ? "" : "hidden"}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
            </div>
          </div>
        </a>
      </li>
      `;
  }
}

export default PreviewView;
