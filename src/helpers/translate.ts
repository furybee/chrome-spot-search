
export const translate = (key: string): string => {
    return chrome.i18n.getMessage(key) ?? key;
};
