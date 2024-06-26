/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { en as vuetifyEn } from 'vuetify/locale';

/** utils */
import { en as enLang } from '@module-language/utils/lang/en.ts';
import { en as enTheme } from '@module-theme/utils/lang/en.ts';
import { en as enBase } from '@module-base/utils/lang/en.ts';
import { en as enAuth } from '@module-auth/utils/lang/en.ts';
import { en as enCalendar } from '@module-calendar/utils/lang/en.ts';
import { en as enGlobal } from '@module-global/utils/lang/en.ts';

export const en = Object.assign(
    {
        $vuetify: vuetifyEn,
    },
    enLang,
    enTheme,
    enBase,
    enAuth,
    enCalendar,
    enGlobal
);
