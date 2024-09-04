<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { TableBodyProps } from '@module-base/types';

withDefaults(defineProps<TableBodyProps>(), {
    data: [],
});

defineEmits<{
    (e: 'onClick', payload: { item: TableBodyProps['data'][number]; indexRow: number; indexCell: number }): void;
}>();
</script>

<template>
    <tbody>
        <tr v-for="(item, indexRow) in data" :key="item.id">
            <td
                v-for="(cell, indexCell) in rows"
                :key="`${item.id}-${cell.id}`"
                @click.stop="$emit('onClick', { item, indexRow, indexCell })"
            >
                {{ cell.render(item, indexRow, indexCell) }}
            </td>
        </tr>
    </tbody>
</template>
