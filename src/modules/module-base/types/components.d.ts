/** type */
import type { VTextField } from 'vuetify/components/VTextField';
import type { VBtn } from 'vuetify/components/VBtn';
import type { VOtpInput } from 'vuetify/components/VOtpInput';
import type { VSelect } from 'vuetify/components/VSelect';
import type { VRadioGroup } from 'vuetify/components/VRadioGroup';
import type { VTooltip } from 'vuetify/components/VTooltip';

declare type VTextFieldProps = InstanceType<typeof VTextField>['$props'];
declare type VTextFieldSlots = InstanceType<typeof VTextField>['$slots'];
declare type VButtonProps = InstanceType<typeof VBtn>['$props'];
declare type VButtonSlots = InstanceType<typeof VBtn>['$slots'];
declare type VInputOtpProps = InstanceType<typeof VOtpInput>['$props'];
declare type VInputOtpSlots = InstanceType<typeof VOtpInput>['$slots'];
declare type VSelectProps = InstanceType<typeof VSelect>['$props'];
declare type VSelectSlots = InstanceType<typeof VSelect>['$slots'];
declare type VRadioProps = InstanceType<typeof VRadioGroup>['$props'];
declare type VRadioSlots = InstanceType<typeof VRadioGroup>['$slots'];
declare type VTooltipProps = InstanceType<typeof VTooltip>['$props'];
declare type VTooltipSlots = InstanceType<typeof VTooltip>['$slots'];

export declare type TypeInputElem = HTMLInputElement | null;

export declare interface InputTextSlots extends /* @vue-ignore */ VTextFieldSlots {}
export declare interface InputTextProps extends /* @vue-ignore */ VTextFieldProps {}

export declare interface ButtonSlots extends /* @vue-ignore */ VButtonSlots {}
export declare interface ButtonProps extends /* @vue-ignore */ VButtonProps {
    overlay?: 'none';
    type?: string;
}

export declare interface InputOtpSlots extends /* @vue-ignore */ VInputOtpSlots {}
export declare interface InputOtpProps extends /* @vue-ignore */ VInputOtpProps {}

export declare interface SelectFieldProps extends /* @vue-ignore */ VSelectProps {}
export declare interface SelectFieldSlots extends /* @vue-ignore */ VSelectSlots {}

export declare interface RadioGroupSlots extends /* @vue-ignore */ VRadioSlots {}
export declare interface RadioGroupProps extends /* @vue-ignore */ VRadioProps {}

export declare interface TooltipProps extends /* @vue-ignore */ VTooltipProps {}
export declare interface TooltipSlots extends /* @vue-ignore */ VTooltipSlots {}
