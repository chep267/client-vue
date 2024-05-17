<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** components */
import AppSiderMini from '@module-global/components/AppSiderMini.vue';
</script>

<template>
    <v-main class="relative">
        <app-sider-mini />
        <v-container class="w-full h-full" :fluid="true">
            <router-view />
        </v-container>
    </v-main>
</template>
