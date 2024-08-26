import {initTabSpot, refreshResults, toggleSpotSearch} from "./core/main";
import {bindGlobalKeyEvents} from "./core/events.ts";

bindGlobalKeyEvents();

if (window.location.href.endsWith('spot-search-manager.html')) {
    initTabSpot().then(() => {
        toggleSpotSearch().then(() => {});
    });
}

chrome.runtime.onMessage.addListener(async function (request) {
    if (request.action === 'tabSpot:showResults') {
        await refreshResults({
            tabs: request.tabs, groups: request.groups, bookmarks: request.bookmarks
        });
    } else if (request.action === 'tabSpot:toggleSpotSearch') {
        await initTabSpot();

        await toggleSpotSearch();
    }
});
