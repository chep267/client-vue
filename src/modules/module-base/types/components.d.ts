/** type */
import type { VTextField } from 'vuetify/components/VTextField';
import type { VBtn } from 'vuetify/components/VBtn';
import type { VOtpInput } from 'vuetify/components/VOtpInput';
import type { VSelect } from 'vuetify/components/VSelect';
import type { VRadioGroup } from 'vuetify/components/VRadioGroup';
import type { VTooltip } from 'vuetify/components/VTooltip';

type VTextFieldProps = InstanceType<typeof VTextField>['$props'];
type VTextFieldSlots = InstanceType<typeof VTextField>['$slots'];
type VButtonProps = InstanceType<typeof VBtn>['$props'];
type VButtonSlots = InstanceType<typeof VBtn>['$slots'];
type VInputOtpProps = InstanceType<typeof VOtpInput>['$props'];
type VInputOtpSlots = InstanceType<typeof VOtpInput>['$slots'];
type VSelectProps = InstanceType<typeof VSelect>['$props'];
type VSelectSlots = InstanceType<typeof VSelect>['$slots'];
type VRadioProps = InstanceType<typeof VRadioGroup>['$props'];
type VRadioSlots = InstanceType<typeof VRadioGroup>['$slots'];
type VTooltipProps = InstanceType<typeof VTooltip>['$props'];
type VTooltipSlots = InstanceType<typeof VTooltip>['$slots'];

export type TypeInputElem = HTMLInputElement | null;

export interface InputTextSlots extends /* @vue-ignore */ VTextFieldSlots {}
export interface InputTextProps extends /* @vue-ignore */ VTextFieldProps {}

export interface ButtonSlots extends /* @vue-ignore */ VButtonSlots {}
export interface ButtonProps extends /* @vue-ignore */ VButtonProps {
    overlay?: 'none';
    type?: string;
}

export interface InputOtpSlots extends /* @vue-ignore */ VInputOtpSlots {}
export interface InputOtpProps extends /* @vue-ignore */ VInputOtpProps {}

export interface SelectFieldProps extends /* @vue-ignore */ VSelectProps {}
export interface SelectFieldSlots extends /* @vue-ignore */ VSelectSlots {}

export interface RadioGroupSlots extends /* @vue-ignore */ VRadioSlots {}
export interface RadioGroupProps extends /* @vue-ignore */ VRadioProps {}

export interface TooltipProps extends /* @vue-ignore */ VTooltipProps {}
export interface TooltipSlots extends /* @vue-ignore */ VTooltipSlots {}
