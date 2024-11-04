<script
    setup
    lang="ts"
    generic="
        T extends {
            id: string | number;
        }
    "
>
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** components */
import TableHeader from '@module-base/components/TableBase/TableHeader.vue';
import TableBody from '@module-base/components/TableBase/TableBody.vue';

/** types */
import type { TableBaseProps } from '@module-base/types';

withDefaults(defineProps<TableBaseProps<T>>(), {});
</script>

<template>
    <v-table fixed-header>
        <TableHeader :rows="rows" :order-by="orderBy" :order-type="orderType" :on-request-sort="onRequestSort" />
        <TableBody :data="data" :rows="rows" @on-click="onClickItem" />
    </v-table>
</template>
