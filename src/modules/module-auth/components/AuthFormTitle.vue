<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { computed } from 'vue';
import { useRoute } from 'vue-router';

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';
import { AuthScreenPath } from '@module-auth/constants/AuthScreenPath';

const route = useRoute();

const title = computed(() => {
    switch (route.path) {
        case AuthScreenPath.register:
            return AuthLanguage.component.title.register;
        case AuthScreenPath.recover:
            return AuthLanguage.component.title.recover;
        case AuthScreenPath.signin:
        default:
            return AuthLanguage.component.title.signin;
    }
});
</script>

<template>
    <span class="text-info z-10 text-4xl">
        {{ $t(title) }}
    </span>
</template>
