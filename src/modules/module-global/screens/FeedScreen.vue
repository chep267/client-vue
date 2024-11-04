<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

import { onMounted, ref } from 'vue';
import { baseApi } from '@module-base/apis/baseApi';
import { debounce } from '@module-base/utils/debounce';

const text = ref('fetching...');
const callApi = () => baseApi({ method: 'post', url: '/app/feed' });

onMounted(async () => {
    const [res]: any = await Promise.all([callApi(), debounce(1000)]);
    text.value = res.message;
});
</script>

<template>
    <div class="h-[1500px]">
        {{ text }}
    </div>
</template>
