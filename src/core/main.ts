import {FoundItemType, RefreshResultParams} from "../types.ts";
import {
    changeIndex,
    container,
    createComponents,
    createFoundItem,
    foundItemListContainer,
    highlightFoundItems, overlay,
    searchInput
} from "./dom-utils.ts";
import {bindGlobalKeyEvents} from "./events.ts";

export const initTabSpot = async () => {
    createComponents();

    bindGlobalKeyEvents();
};

export const toggleSpotSearch = async () => {
    if (!container) {
        return;
    }

    if (container.style.display === 'block') {
        hideSpotSearch();
    } else {
        showSpotSearch();
    }
};

export const refreshResults = async (
    {tabs, bookmarks}: Partial<RefreshResultParams>
) => {
    foundItemListContainer.innerHTML = '';

    if (tabs) {
        foundItemListContainer.style.display = 'block';

        tabs.forEach((tab) => {
            const foundItem = createFoundItem(tab, FoundItemType.TAB);

            foundItemListContainer.appendChild(foundItem);
        });

        document.body.appendChild(container);

        highlightFoundItems();

        searchInput.focus();
    }

    if (bookmarks) {
        foundItemListContainer.style.display = 'block';

        bookmarks.forEach((bookmark) => {
            const foundItem = createFoundItem(bookmark, FoundItemType.BOOKMARK);

            foundItemListContainer.appendChild(foundItem);
        });

        document.body.appendChild(container);

        highlightFoundItems();

        searchInput.focus();
    }
};

export const showSpotSearch = () => {
    overlay.style.display = 'block';
    container.style.display = 'block';
    searchInput.focus();
};

export const hideSpotSearch = () => {
    if (!window.location.href.endsWith('spot-search-manager.html')) {
        overlay.style.display = 'none';
        container.style.display = 'none';
    }

    foundItemListContainer.style.display = 'none';
    searchInput.value = '';
    changeIndex(-1);
    foundItemListContainer.innerHTML = '';
};
