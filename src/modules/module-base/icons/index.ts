/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { h } from 'vue';

/** icons */
import FlagVi from './FlagVi.vue';
import FlagEn from './FlagEn.vue';

/** types */
import type { IconSet, IconProps } from 'vuetify';

const customSvgNameToComponent = Object.freeze({
    vi: FlagVi,
    en: FlagEn,
});

/** aliases */
export const customSVGs: IconSet = {
    component: (props: IconProps) => h(customSvgNameToComponent[props.icon as keyof typeof customSvgNameToComponent]),
};
