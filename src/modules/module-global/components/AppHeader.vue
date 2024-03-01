<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** components */
import AppLogo from '@module-global/components/AppLogo.vue';
import AppName from '@module-global/components/AppName.vue';
import AppHeaderButtonSetting from '@module-global/components/AppHeaderButtonSetting.vue';
import ButtonDev from '@module-global/components/ButtonDev.vue';
</script>

<template>
    <v-app-bar class="appbar" :elevation="5" :app="true">
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

<style scoped>
.v-theme--light {
    color: rgb(var(--v-theme-info));
}
</style>
