<script setup lang="ts"></script>

<template>
    <v-tooltip
        v-bind="$attrs"
        content-class="tooltip-base !text-xs !text-white !font-arial text-center !bg-bs-body-color h-fit"
    >
        <template #activator="props">
            <slot name="activator" v-bind="props" />
        </template>
        <slot />
    </v-tooltip>
</template>

<style lang="scss">
.tooltip-base {
    &:after {
        content: '';
        position: absolute;
        top: 100%; /* Position below the tooltip content */
        left: 50%;
        transform: translateX(-50%);
        border-width: 8px;
        border-style: solid;
        border-color: rgb(var(--v-bs-body-color)) transparent transparent transparent; /* Arrow pointing down */
    }
}
</style>
