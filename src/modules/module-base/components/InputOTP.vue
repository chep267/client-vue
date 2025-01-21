<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { onMounted, useTemplateRef } from 'vue';
import { VOtpInput } from 'vuetify/components/VOtpInput';

/** types */
import type { InputOtpProps, InputOtpSlots, TypeInputElem } from '@module-base/types';

defineOptions({ name: 'InputOTP', extends: VOtpInput, inheritAttrs: true });
defineProps<InputOtpProps>();
const emits = defineEmits<{
    (e: 'update:ref', elem: TypeInputElem): void;
    (e: 'update:model-value', value: string): void;
}>();
defineSlots<InputOtpSlots>();

const inputRef = useTemplateRef<TypeInputElem>('input-ref');

onMounted(() => emits('update:ref', inputRef.value));
</script>

<template>
    <v-otp-input
        ref="input-ref"
        v-bind.prop="$props"
        v-bind.attr="$attrs"
        class="input-otp-base"
        @update:model-value="$emit('update:model-value', $event)"
    >
        <!-- Forward slots -->
        <template v-for="(_slotContent, slotName) in $slots as InputOtpSlots" #[slotName]>
            <!-- @vue-ignore -->
            <slot :name="slotName" />
        </template>
    </v-otp-input>
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
}
:deep(.v-input__details) {
    padding-inline: 0;
    .v-messages__message {
        text-align: right;
    }
}
</style>
