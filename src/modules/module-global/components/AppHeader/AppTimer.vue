<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';

const { locale } = useI18n();
</script>

<template>
    <div class="flex flex-row items-center justify-center gap-2">
        <div class="bg-tw-primary h-2 w-2 rounded-full dark:bg-white" />
        <span class="text-sm capitalize">
            {{ dayjs().locale(locale).format('dddd, DD/MM/YYYY') }}
        </span>
        <div class="bg-tw-primary h-2 w-2 rounded-full dark:bg-white" />
    </div>
</template>
