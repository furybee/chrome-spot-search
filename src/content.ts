import {initTabSpot, refreshResults, toggleSpotSearch} from "./core/main";
import {bindGlobalKeyEvents} from "./core/events.ts";

bindGlobalKeyEvents();

if (window.location.href.endsWith('spot-search-manager.html')) {
    initTabSpot().then(() => {
        toggleSpotSearch().then(() => {});
    });
}

chrome.runtime.onMessage.addListener(async function (request) {
    switch (request.action) {
        case 'spotSearch:showResults':
            await refreshResults({
                tabs: request.tabs, groups: request.groups, bookmarks: request.bookmarks
            });
            break;
        case 'spotSearch:toggleSpotSearch':
            await initTabSpot();
            await toggleSpotSearch();
            break;
    }
});
