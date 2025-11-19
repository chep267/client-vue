<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

/** constants */
import { AppSiderState } from '@module-base/constants/AppSiderState';
import { AppScreenSize } from '@module-base/constants/AppScreenSize';

/** hooks */
import { useAuthStore } from '@module-auth/stores/useAuthStore';
import { useSiderStore } from '@module-base/stores/useSiderStore';

/** providers */
import NotifyProvider from '@module-base/components/NotifyProvider.vue';
import ThemeProvider from '@module-base/components/ThemeProvider.vue';
import LanguageProvider from '@module-base/components/LanguageProvider.vue';

/** screens */
import MainScreen from '@module-global/screens/MainScreen.vue';

/** styles */
import '@root/components/main.css';

const authStore = useAuthStore();
const siderStore = useSiderStore();
const { isAuthentication } = storeToRefs(authStore);
const { siderState } = storeToRefs(siderStore);

const notifyStyle = computed(() => {
    const appBarMiniHeight =
        isAuthentication.value && siderState.value === AppSiderState.hidden ? AppScreenSize.AppBarMiniHeight : 0;
    return `top: ${AppScreenSize.HeaderHeight + appBarMiniHeight}px`;
});
</script>

<template>
    <LanguageProvider>
        <ThemeProvider>
            <NotifyProvider :style="notifyStyle">
                <MainScreen />
            </NotifyProvider>
        </ThemeProvider>
    </LanguageProvider>
</template>
