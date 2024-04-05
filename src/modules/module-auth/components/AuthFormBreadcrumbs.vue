<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

/** constants */
import { AuthScreenPath } from '@module-auth/constants/AuthScreenPath.ts';

/** types */
export type TypeAuthBreadcrumbsItem = {
    title: string;
    path: string;
    append?: string;
};

const route = useRoute();

const breadcrumbs = computed(() => {
    const signin = genBreadcrumb('signin', '/');
    const register = genBreadcrumb('register');
    const recover = genBreadcrumb('recover');
    if (route.path.startsWith(AuthScreenPath.signin)) {
        register.append = '/';
        return [register, recover];
    }
    if (route.path.startsWith(AuthScreenPath.register)) {
        return [signin, recover];
    }
    return [signin, register];
});

const genBreadcrumb = (type: 'signin' | 'register' | 'recover', append?: string): TypeAuthBreadcrumbsItem => {
    return {
        title: `module.auth.form.title.${type}`,
        append,
        path: AuthScreenPath[type],
    };
};
</script>

<template>
    <div class="flex flex-row w-full text-router">
        <template v-for="item in breadcrumbs" :key="item.path">
            <router-link class="text-router hover:underline" :to="item.path">
                {{ $t(item.title) }}
            </router-link>
            <span v-if="item.append" class="text-router px-1">{{ item.append }}</span>
            <template v-else />
        </template>
    </div>
</template>

<style scoped>
.text-router {
    color: rgb(var(--v-theme-info));
}
</style>
