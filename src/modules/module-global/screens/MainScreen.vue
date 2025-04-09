<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { defineAsyncComponent } from 'vue';

/** lazy components */
const AppHeader = defineAsyncComponent(() => import('@module-global/components/AppHeader/index.vue'));
const AppSider = defineAsyncComponent(() => import('@module-global/components/AppSider/index.vue'));
const AppMain = defineAsyncComponent(() => import('@module-global/components/AppMain.vue'));
</script>

<template>
    <v-app class="h-screen w-screen">
        <AppHeader />
        <AppSider />
        <AppMain />
    </v-app>
</template>
