<script setup lang="ts">
/** libs */
import { VTooltip } from 'vuetify/components/VTooltip';

/** types */
import type { TooltipProps, TooltipSlots } from '@module-base/types';

defineOptions({ name: 'TooltipBase', extends: VTooltip, inheritAttrs: true });
defineProps<TooltipProps>();
defineSlots<TooltipSlots>();
</script>

<template>
    <v-tooltip v-bind.prop="$props" v-bind.attr="$attrs" content-class="text-center h-fit">
        <!-- Forward slots -->
        <template v-for="(slotContent, name) in $slots as TooltipSlots" #[name]="slotProps">
            <!-- @vue-ignore -->
            <slot :name="name" v-bind="{ ...slotProps }" />
        </template>
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
        border-color: transparent transparent transparent; /* Arrow pointing down */
    }
}
</style>
