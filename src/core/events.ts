import {container} from "./dom-utils.ts";
import {hideSpotSearch, showSpotSearch} from "./main.ts";

const toggleSpotSearch = async () => {
    if (!container) {
        await chrome.tabs.create({url: chrome.runtime.getURL('spot-search-manager.html')});
        return;
    }

    if (container.style.display === 'block') {
        hideSpotSearch();
    } else {
        showSpotSearch();
    }
};

export const bindGlobalKeyEvents = () => {
    let lastShiftPressTime = 0;
    const shiftThreshold = 300;

    document.addEventListener('keydown', async (event) => {
        if (event.key === 'Shift') {
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - lastShiftPressTime;

            if (timeDifference < shiftThreshold) {
                await toggleSpotSearch();
            }

            lastShiftPressTime = currentTime;
        } else if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - lastShiftPressTime;

            if (timeDifference < shiftThreshold) {
                await toggleSpotSearch();
            }

            lastShiftPressTime = currentTime;
        } else if (event.key === 'Escape') {
            hideSpotSearch();
        }
    });
};
