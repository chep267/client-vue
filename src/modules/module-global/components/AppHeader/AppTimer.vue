<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { useI18n } from 'vue-i18n';

/** hooks */
import { useCalendarStore } from '@module-calendar/hooks/useCalendarStore';

const { locale } = useI18n();
const calendarStore = useCalendarStore();
</script>

<template>
    <div class="flex flex-row items-center justify-center gap-2">
        <div class="bg-info h-2 w-2 rounded-full dark:!bg-white" />
        <span class="text-sm capitalize">
            {{ calendarStore.today.locale(locale).format('dddd, DD/MM/YYYY') }}
        </span>
        <div class="bg-info h-2 w-2 rounded-full dark:!bg-white" />
    </div>
</template>
