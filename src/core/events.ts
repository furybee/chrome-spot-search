import {hideSpotSearch, toggleSpotSearch} from "./main.ts";

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
        } else if (event.key === 'Escape') {
            hideSpotSearch();
        }
    });
};
