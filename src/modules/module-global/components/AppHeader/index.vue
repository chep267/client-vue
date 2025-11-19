<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx from 'clsx';

/** constants */
import { AppScreenSize } from '@module-base/constants/AppScreenSize';

/** components */
import AppLogo from '@module-global/components/AppHeader/AppLogo.vue';
import AppName from '@module-global/components/AppHeader/AppName.vue';
import AppTimer from '@module-global/components/AppHeader/AppTimer.vue';
import ButtonSetting from '@module-global/components/AppHeader/ButtonSetting/index.vue';
import ButtonDev from '@module-global/components/AppHeader/ButtonDev.vue';
</script>

<template>
    <v-app-bar :height="AppScreenSize.HeaderHeight" :class="clsx('text-tw-primary', 'dark:text-white')">
        <template #prepend>
            <AppLogo />
        </template>
        <v-app-bar-title>
            <div :class="clsx('flex items-center', 'gap-10')">
                <AppName />
                <AppTimer class="max-sm:invisible" />
            </div>
        </v-app-bar-title>
        <template #append>
            <ButtonDev />
            <ButtonSetting />
        </template>
    </v-app-bar>
</template>

<style scoped lang="scss">
:deep(.v-toolbar__prepend) {
    margin-inline: calc(var(--spacing) * 3) auto;
}
</style>
