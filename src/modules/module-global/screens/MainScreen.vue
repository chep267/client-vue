<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { defineAsyncComponent } from 'vue';

/** lazy components */
const AppHeader = defineAsyncComponent(() => import('@module-global/components/AppHeader/AppHeader.vue'));
const AppSider = defineAsyncComponent(() => import('@module-global/components/AppSider/AppSider.vue'));
const AppMain = defineAsyncComponent(() => import('@module-global/components/AppMain.vue'));
</script>

<template>
    <v-app class="h-screen w-screen">
        <AppHeader />
        <AppSider />
        <AppMain />
    </v-app>
</template>
