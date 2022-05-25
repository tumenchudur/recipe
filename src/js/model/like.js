export default class Likes {
    constructor(id) {
        this.readDataFromLocalStorage();
        if (!this.likes) this.likes = [];
    }
    addLike(id, title, author, img) {
        const like = { id, title, author, img };
        this.likes.push(like);
        this.saveDataToLocalStorage();
        return like;
    }
    deleteLike(id) {
        // find index of given id
        const index = this.likes.findIndex((el) => el.id === id);

        // delete
        this.likes.splice(index, 1);
        this.saveDataToLocalStorage();
    }
    isLiked(id) {
        return this.likes.findIndex((el) => el.id === id) !== -1;
    }
    getNumberOfLikes() {
        return this.likes.length;
    }
    saveDataToLocalStorage() {
        localStorage.setItem("likes", JSON.stringify(this.likes));
    }
    readDataFromLocalStorage() {
        this.likes = JSON.parse(localStorage.getItem("likes"));
    }
}