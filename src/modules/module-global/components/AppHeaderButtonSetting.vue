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
</script>

<template>
    <v-menu id="header-menu-setting" v-model="menu" :close-on-content-click="false" :offset="14">
        <template #activator="{ props: MenuProps }">
            <v-tooltip :text="$t('module.global.components.menu.setting.tooltip')" location="bottom">
                <template #activator="{ props: ToolTipProps }">
                    <v-app-bar-nav-icon v-once v-bind="{ ...MenuProps, ...ToolTipProps }" />
                </template>
            </v-tooltip>
        </template>
        <app-header-menu-setting @close-menu="menu = false" />
    </v-menu>
</template>
