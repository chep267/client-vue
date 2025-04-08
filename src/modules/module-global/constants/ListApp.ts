/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** icons */
import { mdiFacebookMessenger, mdiHome, mdiCalendarMonth } from '@mdi/js';

/** constants */
import { ScreenPath } from '@module-global/constants/ScreenPath';
import { GlobalLanguage } from '@module-global/constants/GlobalLanguage';

export declare type TypeListAppItem = {
    id: string;
    path: string;
    title: string;
    icon: string;
};

export const ListApp: Readonly<TypeListAppItem[]> = [
    {
        id: ScreenPath.feed,
        path: ScreenPath.feed,
        title: GlobalLanguage.component.label.feed,
        icon: mdiHome,
    },
    {
        id: ScreenPath.messenger,
        path: ScreenPath.messenger,
        title: GlobalLanguage.component.label.messenger,
        icon: mdiFacebookMessenger,
    },
    {
        id: ScreenPath.calendar,
        path: ScreenPath.calendar,
        title: GlobalLanguage.component.label.calendar,
        icon: mdiCalendarMonth,
    },
];
