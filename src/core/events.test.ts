import { describe, it, expect, beforeEach, vi } from 'vitest';
import { bindGlobalKeyEvents } from './events';
import { createComponents } from './dom-utils';

describe('events', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        createComponents();
    });

    it('should bind global key events', () => {
        bindGlobalKeyEvents();
        const event = new KeyboardEvent('keydown', { key: 'Shift' });
        document.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(false);
    });
});
