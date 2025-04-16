/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** icons */
import { mdiFacebookMessenger, mdiHome, mdiCalendarMonth } from '@mdi/js';

/** constants */
import { AppRouterPath } from '@module-base/constants/AppRouterPath';
import { GlobalLanguage } from '@module-global/constants/GlobalLanguage';

export declare type TypeListAppItem = {
    id: string;
    path: string;
    title: string;
    icon: string;
};

export const ListApp: Readonly<TypeListAppItem[]> = [
    {
        id: AppRouterPath.feed,
        path: AppRouterPath.feed,
        title: GlobalLanguage.component.label.feed,
        icon: mdiHome,
    },
    {
        id: AppRouterPath.messenger,
        path: AppRouterPath.messenger,
        title: GlobalLanguage.component.label.messenger,
        icon: mdiFacebookMessenger,
    },
    {
        id: AppRouterPath.calendar,
        path: AppRouterPath.calendar,
        title: GlobalLanguage.component.label.calendar,
        icon: mdiCalendarMonth,
    },
];
