<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** components */
import CalendarSelect from '@module-calendar/components/CalendarSelect.vue';
import CalendarTable from '@module-calendar/components/CalendarTable.vue';
</script>

<template>
    <div class="flex flex-row w-full h-full">
        <div class="flex flex-column w-full h-full rounded-md overflow-hidden border border-gray-100">
            <CalendarSelect />
            <CalendarTable />
        </div>
    </div>
</template>
