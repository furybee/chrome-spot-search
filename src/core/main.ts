import {RefreshResultParams} from "../types.ts";
import {
    changeIndex,
    container,
    createComponents,
    createFoundItem,
    foundItemListContainer,
    highlightFoundItems,
    searchInput
} from "./dom-utils.ts";
import {bindGlobalKeyEvents} from "./events.ts";

export const initTabSpot = async () => {
    createComponents();

    bindGlobalKeyEvents();
};

export const refreshResults = async (
    {tabs, bookmarks}: Partial<RefreshResultParams>
) => {
    foundItemListContainer.innerHTML = '';

    if (tabs) {
        foundItemListContainer.style.display = 'block';

        tabs.forEach((tab) => {
            const foundItem = createFoundItem(tab, 'tab');

            foundItemListContainer.appendChild(foundItem);
        });

        document.body.appendChild(container);

        highlightFoundItems();

        searchInput.focus();
    }

    if (bookmarks) {
        foundItemListContainer.style.display = 'block';

        bookmarks.forEach((bookmark) => {
            const foundItem = createFoundItem(bookmark, 'bookmark');

            foundItemListContainer.appendChild(foundItem);
        });

        document.body.appendChild(container);

        highlightFoundItems();

        searchInput.focus();
    }
};

export const showSpotSearch = () => {
    container.style.display = 'block';
    searchInput.focus();
};

export const hideSpotSearch = () => {
    if (!window.location.href.endsWith('spot-search-manager.html')) {
        container.style.display = 'none';
    }
    foundItemListContainer.style.display = 'none';
    searchInput.value = '';
    changeIndex(-1);
    foundItemListContainer.innerHTML = '';
};
