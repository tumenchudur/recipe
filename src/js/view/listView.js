import { elements } from "./base";
export const renderItem = (item) => {
    const Html = `
    <li class="shopping__item">
        <p class="shopping__description">${item}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>

    `;
    elements.listDiv.insertAdjacentHTML("beforeend", Html);
};
export const clearItems = () => {
    elements.listDiv.innerHTML = "";
};