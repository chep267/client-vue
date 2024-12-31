<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { useTemplateRef, watch } from 'vue';
import { VOtpInput } from 'vuetify/components/VOtpInput';

/** types */
import type { InputOTPBaseProps, TypeInputElem } from '@module-base/types';

defineOptions({ name: 'InputOTP', extends: VOtpInput, inheritAttrs: true });
defineProps<InputOTPBaseProps>();
const emits = defineEmits<{
    (e: 'update:ref', elem: TypeInputElem): void;
    (e: 'update:model-value', value: string): void;
}>();

const inputRef = useTemplateRef<TypeInputElem>('input-otp-ref');

watch(inputRef, () => emits('update:ref', inputRef.value));
</script>

<template>
    <v-otp-input
        v-bind.prop="$props"
        v-bind.attr="$attrs"
        ref="input-otp-ref"
        class="input-otp-base"
        @update:model-value="$emit('update:model-value', $event)"
    />
</template>

<style lang="scss" scoped>
.input-otp-base {
    padding: 0;
    justify-content: flex-start;
    &:deep(.v-otp-input__content) {
        max-width: unset;
        gap: 20px;
        padding: 0;
        height: 48px;
    }
    &:deep(.v-field) {
        border-radius: 3px;
        background-color: white;
        max-width: 48px;
        min-width: 48px;
        min-height: 48px;
        max-height: 48px;
        .v-field__input {
            min-height: 48px;
            max-height: 48px;
            padding-top: 0;
            padding-bottom: 0;
        }
        .v-field__append-inner {
            .v-icon {
                opacity: 1;
            }
        }
        .v-field__outline {
            --v-field-border-opacity: 1;
            .v-field__outline__start,
            .v-field__outline__end {
                border-color: rgba(var(--v-bs-border-color), 1);
            }
        }
    }
    &:deep(.v-input__details) {
        padding-inline: 0;
        .v-messages__message {
            opacity: 1;
            font-weight: 700;
        }
    }
}
</style>
