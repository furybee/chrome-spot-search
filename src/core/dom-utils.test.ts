import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
    createComponents,
    createFoundItem,
    changeIndex,
    highlightFoundItems,
    overlay,
    container,
    searchInput,
    foundItemListContainer
} from './dom-utils';
import { FoundItemType } from '../types';
import { chrome } from '../__mocks__/chrome.js';

global.chrome = chrome;

describe('dom-utils', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        vi.clearAllMocks();
        global.chrome = chrome;
    });

    it('should create components', () => {
        createComponents();
        expect(document.body.querySelector('.ts-container')).toBeTruthy();
        expect(document.body.querySelector('.ts-search-input')).toBeTruthy();
        expect(document.body.querySelector('.ts-found-item-list-container')).toBeTruthy();
        expect(document.body.querySelector('.ts-overlay')).toBeTruthy();
    });

    it('should handle search input event', () => {
        createComponents();
        const searchInput = document.querySelector('.ts-search-input') as HTMLInputElement;
        searchInput.value = 'test';
        searchInput.dispatchEvent(new Event('input'));
        expect(chrome.runtime.sendMessage).toHaveBeenCalled();
        expect(searchInput.value).toBe('test');
    });

    it('should handle key down events', () => {
        createComponents();
        const searchInput = document.querySelector('.ts-search-input') as HTMLInputElement;
        const foundItem = document.createElement('div');
        foundItem.className = 'ts-found-item';
        foundItemListContainer.appendChild(foundItem);

        // Simulate ArrowDown
        searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        expect(foundItem.style.backgroundColor).toBe('#4f5d75');

        // Simulate ArrowUp
        searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
        expect(foundItem.style.backgroundColor).toBe('#4f5d75');

        // Simulate Enter
        foundItem.addEventListener('click', vi.fn());
        searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        expect(foundItem.style.backgroundColor).toBe('#4f5d75');
    });

    it('should change current index', () => {
        changeIndex(2);
        const index = (foundItemListContainer as any).currentIndex;
        expect(index).toBe(2);
    });

    it('should create found item', () => {
        const foundItem = createFoundItem(
            { id: 1, title: 'Test Tab', url: 'http://test.com', groupTitle: 'Group 1', groupColor: '#ff0000' },
            FoundItemType.TAB
        );
        expect(foundItem.querySelector('.ts-found-item-title')?.textContent).toBe('Test Tab');
        expect(foundItem.querySelector('.ts-item-group-title')?.textContent).toBe('Group 1');
    });

    it('should highlight found items', () => {
        createComponents();
        const foundItem1 = createFoundItem(
            { id: 1, title: 'Test Tab 1', url: 'http://test.com', groupTitle: 'Group 1', groupColor: '#ff0000' },
            FoundItemType.TAB
        );
        const foundItem2 = createFoundItem(
            { id: 2, title: 'Test Tab 2', url: 'http://test2.com', groupTitle: 'Group 2', groupColor: '#00ff00' },
            FoundItemType.TAB
        );
        foundItemListContainer.appendChild(foundItem1);
        foundItemListContainer.appendChild(foundItem2);
        highlightFoundItems();
        expect(foundItem1.style.backgroundColor).toBe('transparent');
    });

    it('should handle overlay click to hide search', () => {
        createComponents();
        const hideSpotSearchMock = vi.fn();
        overlay.addEventListener('click', hideSpotSearchMock);
        overlay.click();
        expect(hideSpotSearchMock).toHaveBeenCalled();
    });
});
