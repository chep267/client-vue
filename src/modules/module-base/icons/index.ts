/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { h } from 'vue';

/** icons */
import FlagVi from '@module-base/icons/FlagVi.vue';
import FlagEn from '@module-base/icons/FlagEn.vue';

/** types */
import type { IconSet, IconProps } from 'vuetify';

const customSvgNameToComponent = {
    vi: FlagVi,
    en: FlagEn,
} as const;

export const flagIcon = {
    vi: 'flag:vi',
    en: 'flag:en',
} as const;

/** aliases */
export const customSVGs: IconSet = {
    component: (props: IconProps) => h(customSvgNameToComponent[props.icon as keyof typeof customSvgNameToComponent]),
};
