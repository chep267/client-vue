/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

export const en = {
    [BaseLanguage.component.label.default]: '',
    [BaseLanguage.component.label.start]: 'start',
    [BaseLanguage.component.label.develop]: 'On develop!',

    [BaseLanguage.component.label.theme.router]: 'Theme',
    [BaseLanguage.component.label.theme.dark]: 'Dark',
    [BaseLanguage.component.label.theme.light]: 'Light',

    [BaseLanguage.component.label.language.router]: 'Language',
    [BaseLanguage.component.label.language.vi]: 'Vietnamese',
    [BaseLanguage.component.label.language.en]: 'English',
} as const;
