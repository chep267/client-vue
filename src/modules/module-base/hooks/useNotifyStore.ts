/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { defineStore } from 'pinia';

/** constants */
import { NotifyColor } from '@module-base/constants/NotifyColor.ts';

/** types */
import type { TypeNotifyStore } from '@module-base/types';

const defaultNotify: Readonly<TypeNotifyStore> = {
    open: false,
    message: 'On develop!',
    messageIntl: '',
    duration: 2000,
    location: 'top right',
    color: NotifyColor.default,
};

export const useNotifyStore = defineStore('notify-store', {
    state: (): TypeNotifyStore => ({ ...defaultNotify }),
    getters: {},
    actions: {
        show(payload: Omit<TypeNotifyStore, 'open'>) {
            const { message, messageIntl, duration, location, color } = payload;
            this.messageIntl = messageIntl;
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
