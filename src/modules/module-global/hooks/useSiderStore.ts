/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { defineStore } from 'pinia';

/** constants */
import { ScreenSize } from '@module-global/constants/ScreenSize';
import { SiderState } from '@module-global/constants/SiderState';

/** types */
import type { TypeSiderState, TypeSiderStore } from '@module-global/types';

export const getState = (): TypeSiderState => {
    switch (true) {
        case window.innerWidth < ScreenSize.AppbarHiddenBreakpoint:
            return SiderState.hidden;
        case window.innerWidth < ScreenSize.AppbarCollapseBreakpoint:
            return SiderState.force;
        default:
            return SiderState.expand;
    }
};

export const useSiderStore = defineStore('sider-store', {
    state: (): TypeSiderStore => {
        const siderState = getState();
        return {
            siderState,
            lastState: siderState === SiderState.hidden ? SiderState.collapse : siderState,
        };
    },
    getters: {},
    actions: {
        onResize() {
            const width = window.innerWidth;
            const isHidden = width <= ScreenSize.AppbarHiddenBreakpoint;
            const isCollapse = width <= ScreenSize.AppbarCollapseBreakpoint;
            this.siderState = isHidden ? SiderState.hidden : isCollapse ? SiderState.force : this.lastState;
        },
        toggleSiderState() {
            this.lastState = this.siderState === SiderState.expand ? SiderState.collapse : SiderState.expand;
            this.siderState = this.lastState;
        },
    },
});
