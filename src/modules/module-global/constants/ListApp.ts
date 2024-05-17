/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** icons */
import { mdiFacebookMessenger, mdiHome } from '@mdi/js';

/** constants */
import { ScreenPath } from '@module-global/constants/ScreenPath.ts';

export const ListApp = Object.freeze([
    {
        id: ScreenPath.feed,
        path: ScreenPath.feed,
        title: 'module.global.components.sider.app.feed',
        icon: mdiHome,
    },
    {
        id: ScreenPath.messenger,
        path: ScreenPath.messenger,
        title: 'module.global.components.sider.app.messenger',
        icon: mdiFacebookMessenger,
    },
]);
