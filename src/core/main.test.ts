import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initTabSpot, toggleSpotSearch, refreshResults, showSpotSearch, hideSpotSearch } from './main';
import { createComponents } from './dom-utils';

describe('main', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        createComponents();
    });

    it('should initialize tab spot', async () => {
        await initTabSpot();
        expect(document.body.querySelector('.ts-container')).toBeTruthy();
    });

    it('should toggle spot search', async () => {
        await toggleSpotSearch();
        const container = document.querySelector('.ts-container') as HTMLDivElement;
        expect(container.style.display).toBe('block');
    });

    it('should refresh results', async () => {
        await refreshResults({ tabs: [{ id: 1, title: 'Test', url: 'http://test.com' }] });
        const foundItem = document.querySelector('.ts-found-item') as HTMLDivElement;
        expect(foundItem).toBeTruthy();
    });

    it('should show spot search', () => {
        showSpotSearch();
        const container = document.querySelector('.ts-container') as HTMLDivElement;
        expect(container.style.display).toBe('block');
    });

    it('should hide spot search', () => {
        hideSpotSearch();
        const container = document.querySelector('.ts-container') as HTMLDivElement;
        expect(container.style.display).toBe('none');
    });
});
