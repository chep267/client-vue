<script setup lang="ts">
/** types */
type FormFieldProps = {
    title?: {
        show?: boolean;
        class?: string;
        required?: boolean;
    };
    description?: {
        show?: boolean;
        class?: string;
    };
};

defineOptions({ name: 'FormField', inheritAttrs: true });
withDefaults(defineProps<FormFieldProps>(), {
    title: () => ({
        show: true,
        required: false,
    }),
    description: () => ({
        show: true,
    }),
});
</script>

<template>
    <div v-bind.attr="$attrs" class="flex flex-col w-full">
        <div class="flex justify-between">
            <span v-if="title.show" :class="['font-bold', title.class]">
                <slot name="title" />
                <sup v-if="title.required" class="text-error top-[-0.2rem]">&nbsp;*</sup>
            </span>
            <slot name="label-helper" />
        </div>
        <slot v-if="description.show" name="description" :class="['font-normal', description.class]" />
        <slot v-else name="field" />
    </div>
</template>
