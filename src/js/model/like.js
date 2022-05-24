export default class Likes {
    constructor(id) {
        this.likes = [];
    }
    addLike(id, title, author, img) {
        const like = { id, title, author, img };
        this.likes.push(like);
        return like;
    }
    deleteLike(id) {
        // find index of given id
        const index = this.likes.findIndex((el) => el.id === id);

        // delete
        this.likes.splice(index, 1);
    }
    isLiked(id) {
        return this.likes.findIndex((el) => el.id === id) !== -1;
    }
    getNumberOfliks() {
        return this.likes.length;
    }
}