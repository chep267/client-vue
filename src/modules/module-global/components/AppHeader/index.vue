<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** constants */
import { ScreenSize } from '@module-global/constants/ScreenSize';

/** components */
import AppLogo from '@module-global/components/AppHeader/AppLogo.vue';
import AppName from '@module-global/components/AppHeader/AppName.vue';
import AppHeaderButtonSetting from '@module-global/components/AppHeader/AppHeaderButtonSetting.vue';
import ButtonDev from '@module-global/components/AppHeader/ButtonDev.vue';
import AppTimer from '@module-global/components/AppHeader/AppTimer.vue';
</script>

<template>
    <v-app-bar :elevation="5" :app="true" :height="ScreenSize.HeaderHeight" class="text-info dark:!text-white">
        <template #prepend>
            <AppLogo />
        </template>
        <v-app-bar-title>
            <div class="flex flex-row items-center gap-10">
                <AppName />
                <AppTimer class="max-sm:invisible" />
            </div>
        </v-app-bar-title>
        <template #append>
            <ButtonDev />
            <AppHeaderButtonSetting />
        </template>
    </v-app-bar>
</template>

<style scoped lang="scss">
:deep(.v-toolbar__prepend) {
    margin-inline: 12px auto;
}
</style>
