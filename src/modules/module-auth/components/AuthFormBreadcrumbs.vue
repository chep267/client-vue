<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

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

const breadcrumbs: TypeAuthBreadcrumbsItem[] = [
    {
        title: 'module.auth.form.title.signin',
        append: '/',
        path: AuthScreenPath.signin,
    },
    {
        title: 'module.auth.form.title.register',
        append: route.path.startsWith(AuthScreenPath.recover) ? '' : '/',
        path: AuthScreenPath.register,
    },
    {
        title: 'module.auth.form.title.recover',
        path: AuthScreenPath.recover,
    },
];

if (route.path.startsWith(AuthScreenPath.signin)) {
    breadcrumbs.shift();
} else if (route.path.startsWith(AuthScreenPath.register)) {
    breadcrumbs.splice(1, 1);
} else if (route.path.startsWith(AuthScreenPath.recover)) {
    breadcrumbs.pop();
}
</script>

<template>
    <div class="flex flex-row w-full text-router">
        <template v-for="item in breadcrumbs" :key="item.path">
            <router-link class="text-router text-router-hover" :to="item.path">
                {{ $t(item.title) }}
            </router-link>
            <span v-if="item.append" class="text-router">&nbsp;&nbsp;{{ item.append || '/' }}&nbsp;&nbsp;</span>
            <template v-else />
        </template>
    </div>
</template>

<style scoped>
.text-router {
    color: rgb(var(--v-theme-info));
}
.text-router-hover:hover {
    text-decoration: underline;
}
</style>
