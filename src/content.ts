import {initTabSpot, refreshResults, showSpotSearch} from "./core/main";

initTabSpot().then(() => {
    if (window.location.href.endsWith('spot-search-manager.html')) {
        showSpotSearch();
    }
});

chrome.runtime.onMessage.addListener(async function (request) {
    if (request.action === 'tabSpot:showResults') {
        await refreshResults({
            tabs: request.tabs, groups: request.groups, bookmarks: request.bookmarks
        });
    }
});
