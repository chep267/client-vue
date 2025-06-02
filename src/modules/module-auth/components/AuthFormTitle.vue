<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { computed } from 'vue';
import { useRoute } from 'vue-router';

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';
import { AuthRouterPath } from '@module-auth/constants/AuthRouterPath';

const route = useRoute();

const title = computed(() => {
    switch (route.path) {
        case AuthRouterPath.register:
            return AuthLanguage.component.title.register;
        case AuthRouterPath.recover:
            return AuthLanguage.component.title.recover;
        case AuthRouterPath.signin:
        default:
            return AuthLanguage.component.title.signin;
    }
});
</script>

<template>
    <span class="text-tw-primary z-1 text-4xl">
        {{ $t(title) }}
    </span>
</template>
