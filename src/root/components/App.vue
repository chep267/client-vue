<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

/** constants */
import { SiderState } from '@module-global/constants/SiderState';
import { ScreenSize } from '@module-global/constants/ScreenSize';

/** hooks */
import { useAuthStore } from '@module-auth/hooks/useAuthStore';
import { useSiderStore } from '@module-global/hooks/useSiderStore';

/** providers */
import NotifyProvider from '@module-base/components/NotifyProvider.vue';
import ThemeProvider from '@module-theme/components/ThemeProvider.vue';
import LanguageProvider from '@module-language/components/LanguageProvider.vue';

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
        isAuthentication.value && siderState.value === SiderState.hidden ? ScreenSize.AppBarMiniHeight : 0;
    return `top: ${ScreenSize.HeaderHeight + appBarMiniHeight}px`;
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
