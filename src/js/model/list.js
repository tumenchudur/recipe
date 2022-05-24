import uniqueId from "uniqid";
export default class List {
    constructor() {
        this.items = [];
    }
    deleteItem(id) {
        // find index of given id
        const index = this.items.findIndex((el) => el.id === id);

        // delete
        this.items.splice(index, 1);
    }
    addItem(item) {
        let newItem = {
            id: uniqueId(),
            item,
        };

        this.items.push(newItem);
        return newItem;
    }
}