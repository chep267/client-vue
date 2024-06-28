<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { useLocale } from 'vuetify';

/** hooks */
import { useCalendarStore } from '@module-calendar/hooks/useCalendarStore.ts';

const locale = useLocale();
const calendarStore = useCalendarStore();
</script>

<template>
    <div class="flex flex-row justify-center items-center gap-2">
        <div class="w-2 h-2 dot rounded-full" />
        <span class="text-sm capitalize">
            {{ calendarStore.today.locale(locale.current.value).format('dddd, DD/MM/YYYY') }}
        </span>
        <div class="w-2 h-2 dot rounded-full" />
    </div>
</template>

<style scoped lang="scss">
.dot {
    background-color: rgb(var(--v-theme-on-surface));
}
.v-theme--light {
    .dot {
        background-color: rgb(var(--v-theme-info));
    }
}
</style>
