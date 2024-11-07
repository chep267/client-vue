<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** components */
import AppHeader from '@module-global/components/AppHeader/index.vue';
import AppSider from '@module-global/components/AppSider/index.vue';
import AppMain from '@module-global/components/AppMain.vue';
</script>

<template>
    <v-app class="w-screen h-screen">
        <AppHeader />
        <AppSider />
        <AppMain />
    </v-app>
</template>
