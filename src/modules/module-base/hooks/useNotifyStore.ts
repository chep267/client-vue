/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { defineStore } from 'pinia';

/** constants */
import { NotifyColor } from '@module-base/constants/NotifyColor';
import { BaseLanguage } from '@module-base/constants/BaseLanguage';
import { AppTimer } from '@module-base/constants/AppTimer';

/** types */
import type { TypeNotifyStore } from '@module-base/types';

const defaultNotify: Readonly<TypeNotifyStore> = {
    open: false,
    message: '',
    messageIntl: BaseLanguage.component.label.develop,
    duration: AppTimer.notifyDuration,
    location: 'top right',
    color: NotifyColor.default,
};

export const useNotifyStore = defineStore('notify-store', {
    state: (): TypeNotifyStore => ({ ...defaultNotify }),
    getters: {},
    actions: {
        show(payload: Omit<TypeNotifyStore, 'open'>) {
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
