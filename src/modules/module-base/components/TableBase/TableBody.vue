<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** types */
import type { TableBodyProps } from '@module-base/types';

withDefaults(defineProps<TableBodyProps>(), {
    data: [],
});

defineEmits<{
    (e: 'on-click', payload: { item: TableBodyProps['data'][number]; indexRow: number; indexCell: number }): void;
}>();
</script>

<template>
    <tbody>
        <tr v-for="(item, indexRow) in data" :key="item.id">
            <td
                v-for="(cell, indexCell) in rows"
                :key="`${item.id}-${cell.id}`"
                @click.stop="$emit('on-click', { item, indexRow, indexCell })"
            >
                {{ cell.render(item, indexRow, indexCell) }}
            </td>
        </tr>
    </tbody>
</template>
