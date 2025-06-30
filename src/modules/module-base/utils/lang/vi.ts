/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

export const vi = {
    [BaseLanguage.component.label.default]: '',
    [BaseLanguage.component.label.start]: 'start',
    [BaseLanguage.component.label.develop]: 'Đang phát triển!',

    [BaseLanguage.component.label.theme.router]: 'Giao diện',
    [BaseLanguage.component.label.theme.dark]: 'Tối',
    [BaseLanguage.component.label.theme.light]: 'Sáng',

    [BaseLanguage.component.label.language.router]: 'Ngôn ngữ',
    [BaseLanguage.component.label.language.vi]: 'Tiếng Việt',
    [BaseLanguage.component.label.language.en]: 'Tiếng Anh',
} as const;
