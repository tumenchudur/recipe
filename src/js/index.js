require("@babel/polyfill");
import Search from "./model/search";
import * as searchView from "./view/searchView";
import Recipe from "./model/recipe";
import { elements, renderLoader, clearLoader } from "./view/base";
import {
    renderRecipe,
    clearRecipe,
    highlightSelectedRecipe,
} from "./view/recipeView";

/**
 * Web App төлөв
 * -Хайлтын query, үр дүн
 * -Тухайи үзүүлж буй жор
 * -Liked жорууд
 * -Захиалгын жорын найрлаганууд
 */

const state = {};

const controlSearch = async() => {
    // 1) Get input from user
    const query = searchView.getInput();

    if (query) {
        // 2) Create new search object
        state.search = new Search(query);
        // 3) UI section
        searchView.clearSearchQuery();
        searchView.clearSearchResult();
        renderLoader(elements.searchResultDiv);

        // 4) DoSearch
        await state.search.doSearch();
        // 5) Display result
        clearLoader();
        state.search.result === undefined ?
            alert("Couldn't find anything") :
            searchView.renderRecipes(state.search.result);
    }
};

elements.searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    controlSearch();
});
elements.pageButtons.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-inline");

    if (btn) {
        searchView.clearSearchResult();
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.renderRecipes(state.search.result, goToPage);
    }
});
/**
 *Recipe controller
 */
const controllerRecipe = async() => {
    // 1) get id from URL
    const id = window.location.hash.replace("#", "");

    if (id) {
        // 2) Create Recipe Model
        state.recipe = new Recipe(id);
        // 3) UI
        clearRecipe();
        renderLoader(elements.recipeDiv);
        await highlightSelectedRecipe(id);
        // 4) get Recipe
        await state.recipe.getRecipe();
        // 5) Display info
        clearLoader();
        state.recipe.calcTime();
        state.recipe.calcPortion();
        // 6) Display recipe

        renderRecipe(state.recipe);
    }
};
[`hashchange`, `load`].forEach((e) =>
    window.addEventListener(e, controllerRecipe)
);