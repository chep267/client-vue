<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import clsx from 'clsx';
import { ref } from 'vue';

/** constants */
import { GlobalLanguage } from '@module-global/constants/GlobalLanguage';

/** components */
import MenuSetting from '@module-global/components/AppHeader/ButtonSetting/MenuSetting.vue';

const isOpenMenu = ref(false);
</script>

<template>
    <v-menu id="header-menu-setting" v-model="isOpenMenu" :close-on-content-click="false" :offset="10">
        <template #activator="{ props: MenuProps }">
            <v-tooltip :text="$t(GlobalLanguage.component.label.setting)" location="bottom" aria-label="setting">
                <template #activator="{ props: ToolTipProps }">
                    <v-app-bar-nav-icon
                        v-bind="{ ...MenuProps, ...ToolTipProps }"
                        aria-label="setting"
                        :class="clsx('cursor-pointer', { 'text-tw-primary': isOpenMenu })"
                    />
                </template>
            </v-tooltip>
        </template>
        <MenuSetting @close-menu="isOpenMenu = false" />
    </v-menu>
</template>
