/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** type */
import type { VTextField } from 'vuetify/components/VTextField';
import type { VBtn } from 'vuetify/components/VBtn';
import type { VOtpInput } from 'vuetify/components/VOtpInput';

type TextFieldProps = InstanceType<typeof VTextField>['$props'];
type TextFieldSlots = InstanceType<typeof VTextField>['$slots'];
type ButtonProps = InstanceType<typeof VBtn>['$props'];
type ButtonSlots = InstanceType<typeof VBtn>['$slots'];
type InputOTPProps = InstanceType<typeof VOtpInput>['$props'];

export type TypeInputElem = HTMLInputElement | null;

export interface InputTextProps extends /* @vue-ignore */ TextFieldProps {}
export interface InputTextSlots extends /* @vue-ignore */ TextFieldSlots {}

export interface ButtonBaseProps extends /* @vue-ignore */ ButtonProps {
    overlay?: 'none';
    type?: string;
}
export interface ButtonBaseSlots extends /* @vue-ignore */ ButtonSlots {}

export interface InputOTPBaseProps extends /* @vue-ignore */ InputOTPProps {}
