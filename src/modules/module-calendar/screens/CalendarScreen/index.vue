<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
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
    <div class="flex h-full w-full flex-row">
        <div class="flex-column flex h-full w-full overflow-hidden rounded-md border border-gray-100">
            <CalendarSelect />
            <CalendarTable @on-select-day="daySelected = $event" />
            <CalendarModal :day="daySelected" @on-close="daySelected = null" />
        </div>
    </div>
</template>
