<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';

/** hooks */
import { useAuthStore } from '@module-auth/hooks/useAuthStore';

/** lazy components */
const AppHeader = defineAsyncComponent(() => import('@module-global/components/AppHeader/index.vue'));
const AppSider = defineAsyncComponent(() => import('@module-global/components/AppSider/index.vue'));
const AppMain = defineAsyncComponent(() => import('@module-global/components/AppMain.vue'));

const authStore = useAuthStore();
const { isAuthentication } = storeToRefs(authStore);
</script>

<template>
    <v-app class="h-screen w-screen">
        <AppHeader />
        <AppSider v-if="isAuthentication" />
        <AppMain />
    </v-app>
</template>
