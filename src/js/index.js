require("@babel/polyfill");
import Search from "./model/search";

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
    const query = "pizza";
    if (query) {
        // 2) Create new search object
        state.search = new Search(query);
        // 3) UI section
        // 4) DoSearch
        await state.search.doSearch();
        // 5) Display result
        console.log(state.search.result);
    }
};

document.querySelector(".search").addEventListener("submit", (e) => {
    e.preventDefault();
    controlSearch();
});