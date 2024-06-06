<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** constants */
import { ScreenSize } from '@module-global/constants/ScreenSize.ts';

/** components */
import AppLogo from '@module-global/components/AppHeader/AppLogo.vue';
import AppName from '@module-global/components/AppHeader/AppName.vue';
import AppHeaderButtonSetting from '@module-global/components/AppHeader/AppHeaderButtonSetting.vue';
import ButtonDev from '@module-global/components/AppHeader/ButtonDev.vue';
</script>

<template>
    <v-app-bar :elevation="5" :app="true" :height="ScreenSize.HeaderHeight">
        <template #prepend>
            <app-logo />
        </template>
        <v-app-bar-title>
            <app-name />
        </v-app-bar-title>
        <template #append>
            <button-dev />
            <app-header-button-setting />
        </template>
    </v-app-bar>
</template>

<style scoped lang="scss">
.v-theme--light {
    color: rgb(var(--v-theme-info));
}
</style>
