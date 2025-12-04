/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { VSnackbar } from 'vuetify/components/VSnackbar';

export type TypeNotifyStore = {
    open?: boolean;
    message?: string;
    messageIntl?: string;
    duration?: number;
    location?: VSnackbar['location'];
    color: VSnackbar['color'];
};
