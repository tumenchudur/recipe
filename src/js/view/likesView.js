import { elements } from "./base";

export const toggleLikeBtn = (isLiked) => {
    const icon = isLiked ? "icon-heart" : "icon-heart-outlined";
    document
        .querySelector(".recipe__love use")
        .setAttribute("href", `img/icons.svg#${icon}`);
};

export const toggleLikeMenu = (numberOfLikes) => {
    elements.likesMenu.style.visibility =
        numberOfLikes > 0 ? "visible" : "hidden";
};

export const renderLike = (like) => {
    const html = `
                    <li>
                        <a class="likes__link" href="#${like.id}">
                            <figure class="likes__fig">
                                <img src="${like.img}" alt="${like.title}">
                            </figure>
                            <div class="likes__data">
                                <h4 class="likes__name">${like.title}</h4>
                                <p class="likes__author">${like.author}</p>
                            </div>
                        </a>
                    </li>
                `;
    elements.likesList.insertAdjacentHTML("beforeend", html);
};
export const deleteLike = (id) => {
    const unlike = document.querySelector(
        `.likes__link[href*="#${id}"]`
    ).parentElement;
    if (unlike) {
        console.log(unlike);
        unlike.parentElement.removeChild(unlike);
    }
};