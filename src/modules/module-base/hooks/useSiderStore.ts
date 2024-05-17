/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { defineStore } from 'pinia';

/** types */
import { ScreenSize } from '@module-global/constants/ScreenSize.ts';

type TypeSiderStore = {
    siderState: TypeSiderState;
};

type TypeSiderState = keyof Record<SiderState, string>;

export enum SiderState {
    collapse = 'sider_collapse',
    expand = 'sider_expand',
    hidden = 'sider_hidden',
}

export const getState = (): TypeSiderState => {
    switch (true) {
        case window.innerWidth < ScreenSize.AppbarHiddenBreakpoint:
            return SiderState.hidden;
        case window.innerWidth < ScreenSize.AppbarCollapseBreakpoint:
            return SiderState.collapse;
        default:
            return SiderState.expand;
    }
};

const defaultSider: TypeSiderStore = Object.freeze({
    siderState: getState(),
});

export const useSiderStore = defineStore('sider-store', {
    state: (): TypeSiderStore => ({ ...defaultSider }),
    getters: {},
    actions: {
        updateState() {
            this.siderState = getState();
        },
    },
});
