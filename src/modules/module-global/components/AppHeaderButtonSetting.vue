<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { ref } from 'vue';

/** components */
import AppHeaderMenuSetting from '@module-global/components/AppHeaderMenuSetting.vue';

const menu = ref(false);
const onCloseMenu = () => (menu.value = false);
</script>

<template>
    <v-menu v-model="menu" :close-on-content-click="false">
        <template #activator="{ props: MenuProps }">
            <v-tooltip :text="$t('module.global.components.menu.setting.tooltip')" location="bottom">
                <template #activator="{ props: ToolTipProps }">
                    <v-app-bar-nav-icon v-once v-bind="{ ...MenuProps, ...ToolTipProps }" />
                </template>
            </v-tooltip>
        </template>
        <app-header-menu-setting :on-close-menu="onCloseMenu" />
    </v-menu>
</template>
