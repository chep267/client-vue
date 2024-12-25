<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { computed, type VueElement } from 'vue';
import { useRoute } from 'vue-router';

/** constants */
import { AuthScreenPath } from '@module-auth/constants/AuthScreenPath';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** types */
interface AuthBreadcrumbsProps {
    append?: string | VueElement;
}

withDefaults(defineProps<AuthBreadcrumbsProps>(), {
    append: '/',
});

const route = useRoute();

const breadcrumbs = computed(() => {
    const signin = genBreadcrumb('signin');
    const register = genBreadcrumb('register');
    const recover = genBreadcrumb('recover');
    switch (true) {
        case route.path.startsWith(AuthScreenPath.signin):
            return [register, recover];
        case route.path.startsWith(AuthScreenPath.register):
            return [signin, recover];
        default:
            return [signin, register];
    }
});

const genBreadcrumb = (type: keyof typeof AuthScreenPath) => {
    return {
        title: AuthLanguage.component.title[type],
        path: AuthScreenPath[type],
    };
};
</script>

<template>
    <div class="flex flex-row w-full text-router">
        <template v-for="(item, index) in breadcrumbs" :key="item.path">
            <span v-if="index > 0" class="text-router px-1">{{ append }}</span>
            <router-link class="text-router hover:underline" :to="item.path">
                {{ $t(item.title) }}
            </router-link>
        </template>
    </div>
</template>

<style scoped lang="scss">
.text-router {
    color: rgb(var(--v-theme-info));
}
</style>
