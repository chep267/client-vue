<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { TableHeaderProps } from '@module-base/types';

withDefaults(defineProps<TableHeaderProps>(), {});
</script>

<template>
    <thead>
        <tr>
            <th v-for="item in rows" :key="item.id" class="text-left">
                <span>Name</span>
            </th>
        </tr>
    </thead>
</template>
