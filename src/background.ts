
// let lastShiftPressTime = 0;
// const shiftThreshold = 300;
let tabManagerId : number | undefined;

chrome.runtime.onInstalled.addListener(() => {
    chrome.commands.onCommand.addListener(async (command, tab) => {
        if (command === 'toggle-spot-search') {
            if (!tab.url || (tab.url && (tab.url.startsWith('chrome://') || tab.url.startsWith('about')))) {
                return await openSpotSearchManager();
            }

            if (!tab.id) return;

            await chrome.tabs.sendMessage(tab.id, {
                action: 'spotSearch:toggleSpotSearch',
            });
        }
    });
});

async function openSpotSearchManager() {
    if (tabManagerId) {
        try {
            await chrome.tabs.remove(tabManagerId);
        } catch (e) {
            console.error(e);
        } finally {
            tabManagerId = undefined
        }
    }

    const tab = await chrome.tabs.create({url: chrome.runtime.getURL("spot-search-manager.html")});
    tabManagerId = tab.id;
}

chrome.runtime.onMessage.addListener(async (message, sender) => {
    if (!sender.tab) return;

    switch (message.action) {
        case 'spotSearch:refresh':
            const tabs = await chrome.tabs.query({});
            const groups = await chrome.tabGroups.query({});

            let bookmarkFilter = {};

            if (message.title) {
                bookmarkFilter = {
                    query: message.title,
                };
            }

            const bookmarks = await chrome.bookmarks.search(bookmarkFilter);

            // eslint-disable-next-line no-case-declarations
            const filteredTabs = tabs
                .map((tab) => {
                    let tabGroup = undefined;

                    if (groups) {
                        tabGroup = groups.filter((group) => group.id === tab.groupId)[0];
                    }

                    return {
                        id: tab.id,
                        title: tab.title,
                        url: tab.url,
                        favIconUrl: tab.favIconUrl,
                        windowId: tab.windowId,
                        groupId: tab.groupId,
                        groupTitle: tabGroup?.title,
                        groupColor: tabGroup?.color,
                    };
                })
                .filter((tab) => {
                    let titleFilter = true;

                    if (message.title) {
                        titleFilter =
                            !!tab.title?.toLowerCase()?.includes(message.title) ||
                            !!tab.url?.toLowerCase()?.includes(message.title) ||
                            !!tab.groupTitle?.toLowerCase()?.includes(message.title);
                    }

                    return titleFilter && !tab.url?.startsWith('chrome');
                });

            // eslint-disable-next-line no-case-declarations
            const filteredGroups = groups.filter((group) => {
                let titleFilter = true;
                if (message.title) {
                    titleFilter = !!group.title?.toLowerCase()?.includes(message.title);
                }

                return titleFilter;
            });

            if (!sender.tab.id) break;
            await chrome.tabs.sendMessage(sender.tab.id, {
                action: 'spotSearch:showResults',
                tabs: filteredTabs,
                groups: filteredGroups,
                bookmarks: bookmarks,
            });

            break;
        case 'spotSearch:activateTab':
            if (message.tabId) {
                await chrome.tabs.update(message.tabId, { active: true });
                await chrome.windows.update(message.windowId, { focused: true });
            }
            break;
        case 'spotSearch:openBookmark':
            if (message.bookmarkId) {
                await chrome.tabs.create({ url: message.bookmarkUrl });
            }
            break;
        case 'spotSearch::openShortcuts':
            console.log('openShortcuts');

            await chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
            break;
    }
});
