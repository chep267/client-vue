/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** type */
import type { VTextField } from 'vuetify/components/VTextField';

type TextFieldProps = InstanceType<typeof VTextField>['$props'];

export interface InputTextProps extends /* @vue-ignore */ TextFieldProps {}
export type TypeInputElem = HTMLInputElement | null;
