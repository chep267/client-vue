/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** types */
import type { VSnackbar } from 'vuetify/lib/components/VSnackbar';

export type TypeNotifyStore = {
    open?: boolean;
    message?: string;
    messageIntl?: string;
    duration?: number;
    location?: VSnackbar['location'];
    color: string;
};
