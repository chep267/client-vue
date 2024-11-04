/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { h } from 'vue';

/** icons */
import FlagVi from './FlagVi.vue';
import FlagEn from './FlagEn.vue';

/** types */
import type { IconSet, IconProps } from 'vuetify';

const customSvgNameToComponent = {
    vi: FlagVi,
    en: FlagEn,
} as const;

/** aliases */
export const customSVGs: IconSet = {
    component: (props: IconProps) => h(customSvgNameToComponent[props.icon as keyof typeof customSvgNameToComponent]),
};
