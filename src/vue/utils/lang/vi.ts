/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { vi as vuetifyVi } from 'vuetify/locale';

/** utils */
import { vi as viLang } from '@module-language/utils/lang/vi.ts';
import { vi as viTheme } from '@module-theme/utils/lang/vi.ts';
import { vi as viBase } from '@module-base/utils/lang/vi.ts';
import { vi as viAuth } from '@module-auth/utils/lang/vi.ts';
import { vi as viCalendar } from '@module-calendar/utils/lang/vi.ts';
import { vi as viGlobal } from '@module-global/utils/lang/vi.ts';

export const vi = Object.assign(
    {
        $vuetify: vuetifyVi,
    },
    viLang,
    viTheme,
    viBase,
    viAuth,
    viCalendar,
    viGlobal
);
