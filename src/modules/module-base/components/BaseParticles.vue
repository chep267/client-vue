<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { useTheme } from 'vuetify';

const theme = useTheme();
</script>

<template>
    <vue-particles
        v-if="theme.global.name.value === 'dark'"
        id="ts-particles-dark"
        :options="{
            autoPlay: true,
            clear: true,
            delay: 0,
            fullScreen: {
                enable: true,
                zIndex: 0,
            },
            detectRetina: true,
            duration: 0,
            fpsLimit: 120,
            particles: {
                bounce: {
                    horizontal: {
                        value: 1,
                    },
                    vertical: {
                        value: 1,
                    },
                },
                collisions: {
                    absorb: {
                        speed: 2,
                    },
                    bounce: {
                        horizontal: {
                            value: 1,
                        },
                        vertical: {
                            value: 1,
                        },
                    },
                    enable: false,
                    maxSpeed: 50,
                    mode: 'bounce',
                    overlap: {
                        enable: true,
                        retries: 0,
                    },
                },
                color: {
                    value: '#ff7f50',
                    animation: {
                        h: {
                            count: 0,
                            enable: false,
                            speed: 20,
                            decay: 0,
                            delay: 0,
                            sync: true,
                            offset: 0,
                        },
                        s: {
                            count: 0,
                            enable: false,
                            speed: 1,
                            decay: 0,
                            delay: 0,
                            sync: true,
                            offset: 0,
                        },
                        l: {
                            count: 0,
                            enable: false,
                            speed: 1,
                            decay: 0,
                            delay: 0,
                            sync: true,
                            offset: 0,
                        },
                    },
                },
                effect: {
                    close: true,
                    fill: true,
                },
                groups: {
                    z5000: {
                        number: {
                            value: 70,
                        },
                        zIndex: {
                            value: 50,
                        },
                    },
                    z7500: {
                        number: {
                            value: 30,
                        },
                        zIndex: {
                            value: 75,
                        },
                    },
                    z2500: {
                        number: {
                            value: 50,
                        },
                        zIndex: {
                            value: 25,
                        },
                    },
                    z1000: {
                        number: {
                            value: 40,
                        },
                        zIndex: {
                            value: 10,
                        },
                    },
                },
                move: {
                    angle: {
                        offset: 0,
                        value: 10,
                    },
                    attract: {
                        distance: 200,
                        enable: false,
                        rotate: {
                            x: 3000,
                            y: 3000,
                        },
                    },
                    center: {
                        x: 50,
                        y: 50,
                        mode: 'percent',
                        radius: 0,
                    },
                    decay: 0,
                    direction: 'right',
                    drift: 0,
                    enable: true,
                    gravity: {
                        acceleration: 9.81,
                        enable: false,
                        inverse: false,
                        maxSpeed: 50,
                    },
                    path: {
                        clamp: true,
                        delay: {
                            value: 0,
                        },
                        enable: false,
                    },
                    outModes: {
                        default: 'out',
                    },
                    random: false,
                    size: false,
                    speed: 5,
                    spin: {
                        acceleration: 0,
                        enable: false,
                    },
                    straight: false,
                    trail: {
                        enable: false,
                        length: 10,
                    },
                    vibrate: false,
                    warp: false,
                },
                number: {
                    density: {
                        enable: false,
                        width: 1920,
                        height: 1080,
                    },
                    limit: {
                        mode: 'delete',
                        value: 0,
                    },
                    value: 200,
                },
                opacity: {
                    value: 1,
                    animation: {
                        count: 0,
                        enable: false,
                        speed: 2,
                        decay: 0,
                        delay: 0,
                        sync: false,
                        mode: 'auto',
                        startValue: 'random',
                        destroy: 'none',
                    },
                },
                reduceDuplicates: false,
                shadow: {
                    blur: 0,
                    color: {
                        value: '#000',
                    },
                    enable: false,
                    offset: {
                        x: 0,
                        y: 0,
                    },
                },
                shape: {
                    close: true,
                    fill: true,
                    type: 'circle',
                },
                size: {
                    value: 3,
                    animation: {
                        count: 0,
                        enable: false,
                        speed: 5,
                        decay: 0,
                        delay: 0,
                        sync: false,
                        mode: 'auto',
                        startValue: 'random',
                        destroy: 'none',
                    },
                },
                stroke: {
                    width: 0,
                },
                zIndex: {
                    value: 5,
                    opacityRate: 0.5,
                    sizeRate: 1,
                    velocityRate: 1,
                },
                destroy: {
                    mode: 'none',
                    split: {
                        count: 1,
                        factor: {
                            value: 3,
                        },
                        rate: {
                            value: {
                                min: 4,
                                max: 9,
                            },
                        },
                        sizeOffset: true,
                    },
                },
                roll: {
                    darken: {
                        enable: false,
                        value: 0,
                    },
                    enable: false,
                    enlighten: {
                        enable: false,
                        value: 0,
                    },
                    mode: 'vertical',
                    speed: 25,
                },
                tilt: {
                    value: 0,
                    animation: {
                        enable: false,
                        speed: 0,
                        decay: 0,
                        sync: false,
                    },
                    direction: 'clockwise',
                    enable: false,
                },
                twinkle: {
                    lines: {
                        enable: false,
                        frequency: 0.05,
                        opacity: 1,
                    },
                    particles: {
                        enable: false,
                        frequency: 0.05,
                        opacity: 1,
                    },
                },
                wobble: {
                    distance: 5,
                    enable: false,
                    speed: {
                        angle: 50,
                        move: 10,
                    },
                },
                life: {
                    count: 0,
                    delay: {
                        value: 0,
                        sync: false,
                    },
                    duration: {
                        value: 0,
                        sync: false,
                    },
                },
                rotate: {
                    value: 0,
                    animation: {
                        enable: false,
                        speed: 0,
                        decay: 0,
                        sync: false,
                    },
                    direction: 'clockwise',
                    path: false,
                },
                orbit: {
                    animation: {
                        count: 0,
                        enable: false,
                        speed: 1,
                        decay: 0,
                        delay: 0,
                        sync: false,
                    },
                    enable: false,
                    opacity: 1,
                    rotation: {
                        value: 45,
                    },
                    width: 1,
                },
                repulse: {
                    value: 0,
                    enabled: false,
                    distance: 1,
                    duration: 1,
                    factor: 1,
                    speed: 1,
                },
            },
            pauseOnBlur: true,
            pauseOnOutsideViewport: true,
            smooth: true,
            zLayers: 100,
            name: 'Among Us',
        }" />

    <vue-particles
        v-else
        id="ts-particles-light"
        :options="{
            autoPlay: true,
            clear: true,
            delay: 0,
            fullScreen: {
                enable: true,
                zIndex: 0,
            },
            detectRetina: true,
            duration: 0,
            fpsLimit: 120,
            particles: {
                bounce: {
                    horizontal: {
                        value: 1,
                    },
                    vertical: {
                        value: 1,
                    },
                },
                collisions: {
                    absorb: {
                        speed: 2,
                    },
                    bounce: {
                        horizontal: {
                            value: 1,
                        },
                        vertical: {
                            value: 1,
                        },
                    },
                    enable: false,
                    maxSpeed: 50,
                    mode: 'bounce',
                    overlap: {
                        enable: true,
                        retries: 0,
                    },
                },
                color: {
                    value: '#038cf5',
                    animation: {
                        h: {
                            count: 0,
                            enable: false,
                            speed: 20,
                            decay: 0,
                            delay: 0,
                            sync: true,
                            offset: 0,
                        },
                        s: {
                            count: 0,
                            enable: false,
                            speed: 1,
                            decay: 0,
                            delay: 0,
                            sync: true,
                            offset: 0,
                        },
                        l: {
                            count: 0,
                            enable: false,
                            speed: 1,
                            decay: 0,
                            delay: 0,
                            sync: true,
                            offset: 0,
                        },
                    },
                },
                effect: {
                    close: true,
                    fill: true,
                },
                groups: {
                    z5000: {
                        number: {
                            value: 70,
                        },
                        zIndex: {
                            value: 50,
                        },
                    },
                    z7500: {
                        number: {
                            value: 30,
                        },
                        zIndex: {
                            value: 75,
                        },
                    },
                    z2500: {
                        number: {
                            value: 50,
                        },
                        zIndex: {
                            value: 25,
                        },
                    },
                    z1000: {
                        number: {
                            value: 40,
                        },
                        zIndex: {
                            value: 10,
                        },
                    },
                },
                move: {
                    angle: {
                        offset: 0,
                        value: 10,
                    },
                    attract: {
                        distance: 200,
                        enable: false,
                        rotate: {
                            x: 3000,
                            y: 3000,
                        },
                    },
                    center: {
                        x: 50,
                        y: 50,
                        mode: 'percent',
                        radius: 0,
                    },
                    decay: 0,
                    direction: 'right',
                    drift: 0,
                    enable: true,
                    gravity: {
                        acceleration: 9.81,
                        enable: false,
                        inverse: false,
                        maxSpeed: 50,
                    },
                    path: {
                        clamp: true,
                        delay: {
                            value: 0,
                        },
                        enable: false,
                    },
                    outModes: {
                        default: 'out',
                    },
                    random: false,
                    size: false,
                    speed: 5,
                    spin: {
                        acceleration: 0,
                        enable: false,
                    },
                    straight: false,
                    trail: {
                        enable: false,
                        length: 10,
                    },
                    vibrate: false,
                    warp: false,
                },
                number: {
                    density: {
                        enable: false,
                        width: 1920,
                        height: 1080,
                    },
                    limit: {
                        mode: 'delete',
                        value: 0,
                    },
                    value: 200,
                },
                opacity: {
                    value: 1,
                    animation: {
                        count: 0,
                        enable: false,
                        speed: 2,
                        decay: 0,
                        delay: 0,
                        sync: false,
                        mode: 'auto',
                        startValue: 'random',
                        destroy: 'none',
                    },
                },
                reduceDuplicates: false,
                shadow: {
                    blur: 0,
                    color: {
                        value: '#000',
                    },
                    enable: false,
                    offset: {
                        x: 0,
                        y: 0,
                    },
                },
                shape: {
                    close: true,
                    fill: true,
                    type: 'circle',
                },
                size: {
                    value: 3,
                    animation: {
                        count: 0,
                        enable: false,
                        speed: 5,
                        decay: 0,
                        delay: 0,
                        sync: false,
                        mode: 'auto',
                        startValue: 'random',
                        destroy: 'none',
                    },
                },
                stroke: {
                    width: 0,
                },
                zIndex: {
                    value: 5,
                    opacityRate: 0.5,
                    sizeRate: 1,
                    velocityRate: 1,
                },
                destroy: {
                    mode: 'none',
                    split: {
                        count: 1,
                        factor: {
                            value: 3,
                        },
                        rate: {
                            value: {
                                min: 4,
                                max: 9,
                            },
                        },
                        sizeOffset: true,
                    },
                },
                roll: {
                    darken: {
                        enable: false,
                        value: 0,
                    },
                    enable: false,
                    enlighten: {
                        enable: false,
                        value: 0,
                    },
                    mode: 'vertical',
                    speed: 25,
                },
                tilt: {
                    value: 0,
                    animation: {
                        enable: false,
                        speed: 0,
                        decay: 0,
                        sync: false,
                    },
                    direction: 'clockwise',
                    enable: false,
                },
                twinkle: {
                    lines: {
                        enable: false,
                        frequency: 0.05,
                        opacity: 1,
                    },
                    particles: {
                        enable: false,
                        frequency: 0.05,
                        opacity: 1,
                    },
                },
                wobble: {
                    distance: 5,
                    enable: false,
                    speed: {
                        angle: 50,
                        move: 10,
                    },
                },
                life: {
                    count: 0,
                    delay: {
                        value: 0,
                        sync: false,
                    },
                    duration: {
                        value: 0,
                        sync: false,
                    },
                },
                rotate: {
                    value: 0,
                    animation: {
                        enable: false,
                        speed: 0,
                        decay: 0,
                        sync: false,
                    },
                    direction: 'clockwise',
                    path: false,
                },
                orbit: {
                    animation: {
                        count: 0,
                        enable: false,
                        speed: 1,
                        decay: 0,
                        delay: 0,
                        sync: false,
                    },
                    enable: false,
                    opacity: 1,
                    rotation: {
                        value: 45,
                    },
                    width: 1,
                },
                repulse: {
                    value: 0,
                    enabled: false,
                    distance: 1,
                    duration: 1,
                    factor: 1,
                    speed: 1,
                },
            },
            pauseOnBlur: true,
            pauseOnOutsideViewport: true,
            smooth: true,
            zLayers: 100,
            name: 'Among Us',
        }" />
</template>
