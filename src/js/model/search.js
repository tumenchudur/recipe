import axios from "axios";
import { elements } from "../view/base";

export default class search {
    constructor(query) {
        this.query = query;
    }
    async doSearch() {
        try {
            let result = await axios(
                "https://forkify-api.herokuapp.com/api/search?q=" + this.query
            );

            this.result = result.data.recipes;
            return this.result;
        } catch {
            console.log("error");
        }
    }
}