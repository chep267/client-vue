/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { defineStore } from 'pinia';

/** constants */
import { AppNotifyColor } from '@module-base/constants/AppNotifyColor';
import { BaseLanguage } from '@module-base/constants/BaseLanguage';
import { AppTimer } from '@module-base/constants/AppTimer';

const defaultNotify: Readonly<App.ModuleBase.Hooks.NotifyStore> = {
    open: false,
    message: '',
    messageIntl: BaseLanguage.component.label.develop,
    duration: AppTimer.notifyDuration,
    location: 'top right',
    color: AppNotifyColor.default,
};

export const useNotifyStore = defineStore('notify-store', {
    state: (): App.ModuleBase.Hooks.NotifyStore => JSON.parse(JSON.stringify(defaultNotify)),
    getters: {},
    actions: {
        show(payload: Omit<App.ModuleBase.Hooks.NotifyStore, 'open'>) {
            const { message, messageIntl, duration, location, color } = payload;
            this.messageIntl = messageIntl || defaultNotify.messageIntl;
            this.message = message || defaultNotify.message;
            this.duration = duration || defaultNotify.duration;
            this.location = location || defaultNotify.location;
            this.color = color || defaultNotify.color;
            this.open = true;
        },
        close() {
            this.open = false;
        },
    },
});
