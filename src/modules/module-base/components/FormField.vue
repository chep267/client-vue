<script setup lang="ts">
/** types */
type FormFieldProps = {
    required?: boolean;
};

defineProps<FormFieldProps>();
</script>

<template>
    <div class="flex flex-col w-full">
        <div class="flex justify-between">
            <span>
                <slot name="label" />
                <sup v-if="required" class="text-error font-bold top-[-0.2rem]" style="font-size: 100%">&nbsp;*</sup>
            </span>
            <span>
                <slot name="label-helper" />
            </span>
        </div>
        <slot name="field" />
    </div>
</template>
