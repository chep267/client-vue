/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { vi as vuetifyVi } from 'vuetify/locale';

/** utils */
import { vi as viBase } from '@module-base/utils/lang/vi';
import { vi as viAuth } from '@module-auth/utils/lang/vi';
import { vi as viCalendar } from '@module-calendar/utils/lang/vi';
import { vi as viGlobal } from '@module-global/utils/lang/vi';

export const vi = Object.assign(
    {
        $vuetify: vuetifyVi,
    },
    viBase,
    viAuth,
    viCalendar,
    viGlobal
);
