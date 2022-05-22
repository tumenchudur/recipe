require("@babel/polyfill");
import Search from "./model/search";
import * as searchView from "./view/searchView";
import { elements } from "./view/base";
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
        // 4) DoSearch
        await state.search.doSearch();
        // 5) Display result
        state.search.result === undefined ?
            alert("Couldn't find anything") :
            searchView.renderRecipes(state.search.result);
    }
};

document.querySelector(".search").addEventListener("submit", (e) => {
    e.preventDefault();
    controlSearch();
});