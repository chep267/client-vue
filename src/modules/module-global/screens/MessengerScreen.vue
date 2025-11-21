<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

import { onMounted, ref } from 'vue';
import { delay } from '@module-base/utils/delay';
import { BaseService } from '@module-base/services';

const text = ref('fetching...');

const callApi = () => new BaseService().get({ url: '/app/messenger' });

onMounted(async () => {
    const [res]: any = await Promise.all([callApi(), delay(1000)]);
    text.value = res.message;
});
</script>

<template>
    <div>{{ text }}</div>
</template>
