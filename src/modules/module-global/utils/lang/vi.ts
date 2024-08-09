/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** constants */
import { GlobalLanguage } from '@module-global/constants/GlobalLanguage.ts';

export const vi = {
    [GlobalLanguage.component.label.collapse]: 'Thu nhỏ',
    [GlobalLanguage.component.label.expand]: 'Mở rộng',
    [GlobalLanguage.component.label.feed]: 'Bảng tin',
    [GlobalLanguage.component.label.messenger]: 'Trò chuyện',
    [GlobalLanguage.component.label.calendar]: 'Lịch',
    [GlobalLanguage.component.label.setting]: 'Cài đặt',
    [GlobalLanguage.component.label.otherSetting]: 'Cài đặt khác',
    [GlobalLanguage.component.label.signout]: 'Đăng xuất',
} as const;
