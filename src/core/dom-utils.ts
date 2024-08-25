import {styles} from "./styles.ts";
import {BookmarkInterface, TabInterface} from "../types.ts";
import {_chromeGroupColor} from "../helpers/chrome-color.ts";
import {hideSpotSearch} from "./main.ts";

export let container: HTMLDivElement;
export let searchInput: HTMLInputElement;
export let foundItemListContainer: HTMLDivElement;
let currentIndex = -1;

export const changeIndex = (index: number) => {
    currentIndex = index;
};

export const createComponents = () => {
    createContainer();
    createSearchInput();
    createFoundItemListContainer();

    container.appendChild(searchInput);
    container.appendChild(foundItemListContainer);

    document.body.appendChild(container);
    document.head.appendChild(document.createElement('style')).textContent = styles;
}

const createContainer = () => {
    container = document.createElement('div');
    container.id = 'item-list-container';
    container.className = 'ts-container';

    return container;
};

const createSearchInput = () => {
    searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.placeholder = 'Search tabs, bookmarks...';
    searchInput.className = 'ts-search-input';

    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.trim().toLowerCase();

        if (filter.length === 0) {
            foundItemListContainer.innerHTML = '';
            return;
        }

        setTimeout(async () => {
            await chrome.runtime.sendMessage({
                action: 'tabSpot:refresh',
                title: searchInput.value.trim().toLowerCase(),
            });
        });

        searchInput.focus();
    });

    searchInput.addEventListener('keydown', (event) => {
        const foundItems: HTMLDivElement[] = Array.from(foundItemListContainer.querySelectorAll('.ts-found-item'));

        if (foundItems.length === 0) {
            currentIndex = -1;
            foundItemListContainer.innerHTML = '';

            return;
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            currentIndex = (currentIndex + 1) % foundItems.length;

            highlightSelectedItem(foundItems);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            currentIndex = (currentIndex - 1 + foundItems.length) % foundItems.length;

            highlightSelectedItem(foundItems);
        } else if (event.key === 'Enter') {
            event.preventDefault();

            if (currentIndex >= 0 && currentIndex < foundItems.length) {
                foundItems[currentIndex].click();
            } else if (currentIndex === -1 && foundItems.length > 0) {
                foundItems[0].click();
            }
        } else {
            currentIndex = 0;
        }
    });

    return searchInput;
};

const createFoundItemListContainer = () => {
    foundItemListContainer = document.createElement('div');
    foundItemListContainer.id = 'found-item-list-container';
    foundItemListContainer.className = 'ts-found-item-list-container';

    return foundItemListContainer;
};

export const highlightFoundItems = () => {
    const foundItems: HTMLDivElement[] = foundItemListContainer.querySelectorAll('.ts-found-item') as unknown as HTMLDivElement[];

    highlightSelectedItem(foundItems);
};

const highlightSelectedItem = (foundItems: HTMLDivElement[]) => {
    foundItems.forEach((item) => {
        item.style.backgroundColor = 'transparent';
    });

    if (currentIndex === -1) {
        changeIndex(0);
    }
    if (currentIndex >= 0 && currentIndex < foundItems.length) {
        foundItems[currentIndex].style.backgroundColor = '#4f5d75';
        foundItems[currentIndex].scrollIntoView({block: 'nearest'});
    }
};

export const createFoundItem = (foundItem: TabInterface | BookmarkInterface, type: string) => {
    const foundItemElement = document.createElement('div');
    foundItemElement.className = 'ts-found-item';

    const foundItemGroupTitle = document.createElement('span');

    if (type === 'tab' && foundItem.groupTitle) {
        foundItemGroupTitle.textContent = foundItem.groupTitle;
        foundItemGroupTitle.className = 'ts-item-group-title';
        foundItemGroupTitle.style.backgroundColor = _chromeGroupColor(foundItem.groupColor);
    }

    const foundItemTitle = document.createElement('span');
    foundItemTitle.className = 'ts-found-item-title';
    foundItemTitle.textContent = foundItem.title;

    const foundItemUrl = document.createElement('div');
    foundItemUrl.className = 'ts-found-item-url';
    foundItemUrl.textContent = foundItem.url;

    if (type === 'tab' && foundItem.favIconUrl) {
        const foundItemImg = document.createElement('img');
        foundItemImg.src = foundItem.favIconUrl;
        foundItemImg.className = 'ts-found-item-img';

        foundItemElement.appendChild(foundItemImg);
    } else {
        const foundItemImg = document.createElement('div');
        foundItemImg.className = 'ts-found-item-img';

        if (type === 'bookmark') {
            foundItemImg.innerHTML =
                '<svg style="display: block; width: 18px; height: 18px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">' +
                '  <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />' +
                '</svg>';
        }

        foundItemElement.appendChild(foundItemImg);
    }

    const foundItemTextGroup = document.createElement('div');
    const foundItemText1 = document.createElement('div');
    const foundItemText2 = document.createElement('div');

    foundItemText1.appendChild(foundItemGroupTitle);
    foundItemText1.appendChild(foundItemTitle);
    foundItemText2.appendChild(foundItemUrl);

    foundItemTextGroup.appendChild(foundItemText1);
    foundItemTextGroup.appendChild(foundItemText2);

    foundItemElement.appendChild(foundItemTextGroup);

    foundItemElement.addEventListener('click', async () => {
        hideSpotSearch();

        if (type === 'tab') {
            await chrome.runtime.sendMessage({
                action: 'tabSpot:activateTab',
                tabId: foundItem.id,
                windowId: foundItem.windowId,
            });
        } else if (type === 'bookmark') {
            await chrome.runtime.sendMessage({
                action: 'tabSpot:openBookmark',
                bookmarkId: foundItem.id,
                bookmarkUrl: foundItem.url,
            });
        }
    });

    return foundItemElement;
};
