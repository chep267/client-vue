<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { ref } from 'vue';

/** components */
import CalendarSelect from '@module-calendar/components/CalendarSelect.vue';
import CalendarTable from '@module-calendar/components/CalendarTable.vue';
import CalendarModal from '@module-calendar/components/CalendarModal.vue';

/** types */
import type { Dayjs } from '@module-calendar/types';

const daySelected = ref<Dayjs | null>(null);
</script>

<template>
    <div class="flex flex-row w-full h-full">
        <div class="flex flex-column w-full h-full rounded-md overflow-hidden border border-gray-100">
            <CalendarSelect />
            <CalendarTable @on-select-day="daySelected = $event" />
            <CalendarModal :day="daySelected" @on-close="daySelected = null" />
        </div>
    </div>
</template>
