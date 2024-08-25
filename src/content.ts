import {initTabSpot, refreshResults, showSpotSearch, toggleSpotSearch} from "./core/main";

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
    } else if (request.action === 'tabSpot:toggleSpotSearch') {
        console.log('toggleSpotSearch');
        await toggleSpotSearch();
    }
});
