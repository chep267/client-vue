<script setup lang="ts">
/** types */
type DivideBaseProps = {
    required?: boolean;
};

defineProps<DivideBaseProps>();
</script>

<template>
    <v-divider v-bind.attr="$attrs" :thickness="1" :opacity="1" class="divider-base" />
</template>

<style lang="scss" scoped>
.divider-base {
    opacity: 1;
    border-color: rgba(var(--v-divider-border-color), 1);
}
</style>
