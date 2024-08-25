import {initTabSpot, refreshResults, showSpotSearch} from "./core/main";

initTabSpot().then(() => {
    console.log('TabSpot initialized');

    if (window.location.href.endsWith('spot-search-manager.html')) {
        showSpotSearch();
    }
});

chrome.runtime.onMessage.addListener(async function (request) {
    if (request.action === 'tabSpot:showResults') {
        await refreshResults(request.tabs, request.groups, request.bookmarks);
    }
});
