require("@babel/polyfill");

import Search from "./model/search";
import * as searchView from "./view/searchView";
import Recipe from "./model/recipe";
import List from "./model/list";
import * as listView from "./view/listView";
import { elements, renderLoader, clearLoader } from "./view/base";
import {
    renderRecipe,
    clearRecipe,
    highlightSelectedRecipe,
} from "./view/recipeView";
import Likes from "./model/like";

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
//** recipe details in my basket */
const controlList = () => {
    // Create My recipe MODEl
    state.list = new List();

    listView.clearItems();

    state.recipe.ingredients.forEach((e) => {
        const item = state.list.addItem(e);
        listView.renderItem(item);
    });
};

const controlLike = () => {
    // 1) create like model
    if (!state.likes) state.likes = new Likes();
    // 2) Get id from recipe on tha page
    const currentId = state.recipe.id;
    // 3) Check recipe if it is liked
    if (state.likes.isLiked(currentId)) {
        // 4) if it is liked, unlike recipe
        state.likes.deleteLike(currentId);
        console.log(state.likes);
    } else {
        // 5) if it is unliked, like recipe
        console.log(state.likes);
        state.likes.addLike(
            currentId,
            state.recipe.title,
            state.recipe.publisher,
            state.recipe.img_url
        );
    }
};

["hashchange", "load"].forEach((e) =>
    window.addEventListener(e, controllerRecipe)
);
elements.recipeDiv.addEventListener("click", (e) => {
    if (e.target.matches(".recipe__btn, .recipe__btn *")) {
        controlList();
    } else if (e.target.matches(".recipe__love, .recipe__love *")) {
        controlLike();
    }
});
elements.listDiv.addEventListener("click", (e) => {
    // dataItemid
    const id = e.target.closest(".shopping__item").dataset.itemid;
    // delete item from model

    state.list.deleteItem(id);

    // Remove items from display
    listView.removeItem(id);
});