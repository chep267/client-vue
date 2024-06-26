<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { computed } from 'vue';
import { useLocale } from 'vuetify';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

/** icons */
import { mdiChevronTripleLeft, mdiChevronTripleRight, mdiChevronDoubleLeft, mdiChevronDoubleRight } from '@mdi/js';

/** constants */
import { localeObject } from '@module-language/constants/localeObject.ts';
import { ScreenSize } from '@module-global/constants/ScreenSize.ts';

/** hooks */
import { useCalendarStore } from '@module-calendar/hooks/useCalendarStore.ts';
import { SiderState, useSiderStore } from '@module-base/hooks/useSiderStore.ts';

const locale = useLocale();
const { t } = useI18n();
const siderStore = useSiderStore();
const calendarStore = useCalendarStore();

const { siderState } = storeToRefs(siderStore);
const { day, isToday } = storeToRefs(calendarStore);
const sizeIcon = 24;

const miniMode = computed(() => siderState.value !== SiderState.expand);

const titleCalendar = computed(() => {
    const month = day.value.format(locale.current.value === localeObject.en ? 'MMMM' : 'MM');
    const year = day.value.format('YYYY');
    return t('module.calendar.component.calendar.title.text', { month, year });
});

const onChangeDay = (mode: 'prev' | 'next' | 'today', type?: 'month' | 'year') => {
    if (mode === 'today') {
        return calendarStore.setDay(calendarStore.today);
    }
    calendarStore.setDay(calendarStore.day.add(mode === 'prev' ? -1 : 1, type));
};
</script>

<template>
    <div
        :class="{ 'relative flex flex-row justify-between w-full p-3 gap-2': true, 'px-1': miniMode }"
        :style="`height: ${ScreenSize.HeaderHeight}px`">
        <v-btn :disabled="isToday" :class="{ text: !isToday, hidden: miniMode }" @click.stop="onChangeDay('today')">
            {{ t('module.calendar.text.today') }}
        </v-btn>
        <div :class="{ 'flex flex-row justify-between gap-2': true, 'flex-1': miniMode }">
            <div class="flex gap-1">
                <v-btn :class="{ buttonMini: miniMode }" @click.stop="onChangeDay('prev', 'year')">
                    <v-icon :icon="mdiChevronTripleLeft" color="primary" :size="sizeIcon" />
                </v-btn>
                <v-btn :class="{ buttonMini: miniMode }" @click.stop="onChangeDay('prev', 'month')">
                    <v-icon :icon="mdiChevronDoubleLeft" color="primary" :size="sizeIcon" />
                </v-btn>
            </div>
            <div class="flex items-center justify-center truncate min-w-[270px]">
                <span class="text text-2xl">{{ titleCalendar }}</span>
            </div>
            <div class="flex gap-1">
                <v-btn :class="{ buttonMini: miniMode }" @click.stop="onChangeDay('next', 'month')">
                    <v-icon :icon="mdiChevronDoubleRight" color="primary" :size="sizeIcon" />
                </v-btn>
                <v-btn :class="{ buttonMini: miniMode }" @click.stop="onChangeDay('next', 'year')">
                    <v-icon :icon="mdiChevronTripleRight" color="primary" :size="sizeIcon" />
                </v-btn>
            </div>
        </div>
    </div>
</template>

<style scoped>
.text {
    color: rgb(var(--v-theme-info));
}
.buttonMini {
    min-width: 34px;
    padding: 0;
}
</style>
