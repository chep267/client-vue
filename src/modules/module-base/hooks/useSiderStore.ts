/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { defineStore } from 'pinia';

/** constants */
import { AppScreenSize } from '@module-base/constants/AppScreenSize';
import { AppSiderState } from '@module-base/constants/AppSiderState';

export const getState = (): App.ModuleGlobal.Hooks.SiderState => {
    switch (true) {
        case window.innerWidth < AppScreenSize.AppbarHiddenBreakpoint:
            return AppSiderState.hidden;
        case window.innerWidth < AppScreenSize.AppbarCollapseBreakpoint:
            return AppSiderState.force;
        default:
            return AppSiderState.expand;
    }
};

export const useSiderStore = defineStore('sider-store', {
    state: (): App.ModuleGlobal.Hooks.SiderStore => {
        const siderState = getState();
        return {
            siderState,
            lastState: siderState === AppSiderState.hidden ? AppSiderState.collapse : siderState,
        };
    },
    getters: {},
    actions: {
        onResize() {
            const width = window.innerWidth;
            const isHidden = width <= AppScreenSize.AppbarHiddenBreakpoint;
            const isCollapse = width <= AppScreenSize.AppbarCollapseBreakpoint;
            this.siderState = isHidden ? AppSiderState.hidden : isCollapse ? AppSiderState.force : this.lastState;
        },
        toggleSiderState() {
            this.lastState = this.siderState === AppSiderState.expand ? AppSiderState.collapse : AppSiderState.expand;
            this.siderState = this.lastState;
        },
    },
});
