export enum FoundItemType {
    TAB = 'tab',
    GROUP = 'group',
    BOOKMARK = 'bookmark',
}

export type TabInterface = {
    id: number;
    title: string;
    url: string;
    favIconUrl: string;
    windowId: number;
    groupId: number;
    groupTitle: string;
    groupColor: string;
}

export type GroupInterface = {
    id: number;
    title: string;
    color: string;
    groupTitle: string;
    groupColor: string;
    favIconUrl: string;
}

export type BookmarkInterface = {
    id: number;
    title: string;
    url: string;
    favIconUrl: string;
    windowId: number;
    groupId: number;
    groupTitle: string;
    groupColor: string;
}

export type RefreshResultParams = {
    tabs: TabInterface[];
    groups: GroupInterface[];
    bookmarks: BookmarkInterface[];
}
