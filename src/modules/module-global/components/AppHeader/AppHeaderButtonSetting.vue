<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { ref } from 'vue';

/** constants */
import { GlobalLanguage } from '@module-global/constants/GlobalLanguage';

/** components */
import AppHeaderMenuSetting from '@module-global/components/AppHeader/AppHeaderMenuSetting.vue';

const isOpenMenu = ref(false);
</script>

<template>
    <v-menu id="header-menu-setting" v-model="isOpenMenu" :close-on-content-click="false" :offset="10">
        <template #activator="{ props: MenuProps }">
            <v-tooltip :text="$t(GlobalLanguage.component.label.setting)" location="bottom">
                <template #activator="{ props: ToolTipProps }">
                    <v-app-bar-nav-icon
                        v-bind="{ ...MenuProps, ...ToolTipProps }"
                        :color="isOpenMenu ? 'primary' : undefined"
                    />
                </template>
            </v-tooltip>
        </template>
        <AppHeaderMenuSetting @close-menu="isOpenMenu = false" />
    </v-menu>
</template>
