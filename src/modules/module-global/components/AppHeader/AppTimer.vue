<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { computed } from 'vue';
import clsx from 'clsx';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';

const { locale } = useI18n();

const formattedDate = computed(() => dayjs().locale(locale.value).format('dddd, DD/MM/YYYY'));
</script>

<template>
    <div :class="clsx('flex flex-row items-center justify-center', 'gap-2')">
        <div :class="clsx('h-2 w-2 rounded-full', 'bg-tw-primary', 'dark:bg-white')" />
        <span :class="clsx('text-sm', 'capitalize')">{{ formattedDate }}</span>
        <div :class="clsx('h-2 w-2 rounded-full', 'bg-tw-primary', 'dark:bg-white')" />
    </div>
</template>
