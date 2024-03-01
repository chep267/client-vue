<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** components */
import ThemeProvider from '@module-theme/components/ThemeProvider.vue';
import LanguageProvider from '@module-language/components/LanguageProvider.vue';

/** screens */
import MainScreen from '@module-global/screens/MainScreen.vue';

/** styles */
import './root.css';
</script>

<template>
    <language-provider>
        <theme-provider>
            <main-screen />
        </theme-provider>
    </language-provider>
</template>
