import icons from "url:../../img/icons.svg";

export default class View {
  _data;
  _errorMessage = "🔥 Oops! Something went wrong. 🔥";
  _message = "";
  _markup = "";
  /**
   *
   * @param {Object | Object[]} data The data to be rendered
   * @returns {undefined}
   */
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    this._markup = this._generateMarkup();
    this._reRender();
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // Create DOM from markup
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    newElements.forEach((el, i) => {
      const curEl = curElements[i];
      // Update changed text
      if (!el.isEqualNode(curEl) && el.firstChild?.nodeValue.trim() !== "") {
        curEl.textContent = el.textContent;
      }

      // Update changed attributes
      if (!el.isEqualNode(curEl)) {
        Array.from(el.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _reRender() {
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", this._markup);
  }

  renderSpinner() {
    this._markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> 
  `;

    this._reRender();
  }

  renderError(message = this._errorMessage) {
    const previousMarkup = this._parentElement.innerHTML;
    this._markup = `
      <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> 
    `;
    this._reRender();
    setTimeout(() => {
      this._markup = previousMarkup;
      this._reRender();
    }, 3000);
  }

  renderMessage(message = this._message) {
    this._markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._reRender();
  }
}
