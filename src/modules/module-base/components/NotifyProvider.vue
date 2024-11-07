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
import { useNotifyStore } from '@module-base/hooks/useNotifyStore';
import { useAuthStore } from '@module-auth/hooks/useAuthStore';
import { useSiderStore } from '@module-global/hooks/useSiderStore';

const notifyStore = useNotifyStore();
const { open, message, messageIntl, location, duration, color } = storeToRefs(notifyStore);

const authStore = useAuthStore();
const siderStore = useSiderStore();
const { isAuthentication } = storeToRefs(authStore);
const { siderState } = storeToRefs(siderStore);

const top = computed(() => {
    const appBarMiniHeight = siderState.value === SiderState.hidden ? ScreenSize.AppBarMiniHeight : 0;
    return `${ScreenSize.HeaderHeight + (isAuthentication.value ? appBarMiniHeight : 0)}px`;
});
</script>

<template>
    <v-snackbar
        v-model="open"
        v-memo="[open]"
        :style="`top: ${top}`"
        :multi-line="true"
        :location="location"
        :timeout="duration"
        :color="color"
        elevation="24"
    >
        <span v-if="messageIntl">{{ $t(messageIntl) }}</span>
        <span v-else>{{ message }}</span>
    </v-snackbar>
    <slot />
</template>
