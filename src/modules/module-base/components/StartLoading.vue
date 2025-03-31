<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';
</script>

<template>
    <div class="fixed top-0 left-0 z-1 h-screen w-screen">
        <div class="start-elem">
            <span class="text-start">{{ $t(BaseLanguage.component.label.start) }}</span>
            <span class="text-loading" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@keyframes animate-loading-element {
    0% {
        transform: rotate(45deg);
    }
    100% {
        transform: rotate(405deg);
    }
}
@keyframes animate-start-element {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.start-elem {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    border-radius: 50%;
    text-align: center;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    background-color: transparent;
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-top: 3px solid rgb(var(--v-theme-start));
        border-right: 3px solid rgb(var(--v-theme-start));
        border-left: 3px solid transparent;
        border-bottom: 3px solid transparent;
        border-radius: 50%;
        animation: animate-start-element 2s linear infinite;
    }
}
.text-start {
    font-family: sans-serif;
    font-size: 26px;
    line-height: 150px;
    letter-spacing: 4px;
    text-transform: uppercase;
    text-shadow: 0 0 10px rgb(var(--v-theme-start));
    color: rgb(var(--v-theme-start));
}
.text-loading {
    display: block;
    position: absolute;
    top: calc(50% - 2px);
    left: 50%;
    width: 50%;
    height: 4px;
    background: transparent;
    transform-origin: left;
    animation: animate-loading-element 2s linear infinite;
    &:before {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgb(var(--v-theme-start));
        top: -6px;
        right: -8px;
        box-shadow: 0 0 20px rgb(var(--v-theme-start));
    }
}
</style>
