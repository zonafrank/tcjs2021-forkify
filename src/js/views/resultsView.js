import PreviewView from "./previewView";

class ResultsView extends PreviewView {
  _parentElement = document.querySelector(".results");
  _errorMessage = "🔥 No recipes found for your query. Please try again. 🔥";
  _message = "";

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }
}

export default new ResultsView();
