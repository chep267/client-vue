<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** components */
import NotifyProvider from '@module-base/components/NotifyProvider.vue';
import AppHeader from '@module-global/components/AppHeader.vue';
import AppSider from '@module-global/components/AppSider.vue';
import AppMain from '@module-global/components/AppMain.vue';
</script>

<template>
    <notify-provider>
        <v-app class="w-screen h-screen">
            <app-header />
            <app-sider />
            <app-main />
        </v-app>
    </notify-provider>
</template>
