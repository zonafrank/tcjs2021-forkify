import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model";
import bookmarksView from "./views/bookmarksView";
import paginationView from "./views/paginationView";
import recipeView from "./views/recipeView";
import resultsView from "./views/resultsView";
import searchView from "./views/searchView";

///////////////////////////////////////

const controlRecipe = async function () {
  const id = window.location.hash.slice(1);
  if (!id) return;

  try {
    recipeView.renderSpinner();
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    await model.loadRecipe(id);
    // 02. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
    alert(error);
    console.log(error);
  }
};

const controlSearchResult = async function () {
  try {
    // 01. Get search query
    const query = searchView.getQuery();

    if (!query) return;
    // 02. Load search result
    await model.loadSearchResults(query);

    // 03. Render result
    resultsView.renderSpinner();
    resultsView.render(model.getSearchResultsPage());

    // 04. Render pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlServings = function (servings) {
  // Update the recipe servings
  if (Object.keys(model.state.recipe).length === 0) return;
  model.updateServings(servings);
  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlPagination = function (pageVal) {
  resultsView.render(model.getSearchResultsPage(pageVal));
  paginationView.render(model.state.search);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerPagination(controlPagination);
};

init();
