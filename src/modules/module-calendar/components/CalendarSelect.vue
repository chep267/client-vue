<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
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
import { localeObject } from '@module-language/constants/localeObject';
import { ScreenSize } from '@module-global/constants/ScreenSize';
import { SiderState } from '@module-global/constants/SiderState';

/** hooks */
import { useCalendarStore } from '@module-calendar/hooks/useCalendarStore';
import { useSiderStore } from '@module-global/hooks/useSiderStore';
import { CalendarLanguage } from '@module-calendar/constants/CalendarLanguage';

const locale = useLocale();
const { t } = useI18n();
const siderStore = useSiderStore();
const calendarStore = useCalendarStore();

const { siderState } = storeToRefs(siderStore);
const { day } = storeToRefs(calendarStore);
const sizeIcon = 24;

const miniMode = computed(() => siderState.value === SiderState.hidden || siderState.value === SiderState.force);

const isToday = computed(() => calendarStore.isToday(day.value));

const titleCalendar = computed(() => {
    const month = day.value.format(locale.current.value === localeObject.en ? 'MMMM' : 'MM');
    const year = day.value.format('YYYY');
    return t(CalendarLanguage.component.label.calendarInfo.title, { month, year });
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
        :class="{
            'relative flex flex-row justify-between w-full p-3 gap-2': true,
            'px-1 !flex-col-reverse': miniMode,
        }"
        :style="`height: ${ScreenSize.CalendarSelectHeight}px`"
    >
        <v-btn :disabled="isToday" :class="{ 'w-fit': true, 'primary-text': !isToday }" @click.stop="onChangeDay('today')">
            {{ $t(CalendarLanguage.component.label.today) }}
        </v-btn>
        <div :class="{ 'flex flex-row justify-between gap-2': true, 'flex-1': miniMode }">
            <div class="flex gap-1">
                <v-btn :class="{ 'button-mini': miniMode }" @click.stop="onChangeDay('prev', 'year')">
                    <v-icon :icon="mdiChevronTripleLeft" color="primary" :size="sizeIcon" />
                </v-btn>
                <v-btn :class="{ 'button-mini': miniMode }" @click.stop="onChangeDay('prev', 'month')">
                    <v-icon :icon="mdiChevronDoubleLeft" color="primary" :size="sizeIcon" />
                </v-btn>
            </div>
            <div
                :class="{
                    'line-clamp-2 text-center': true,
                    'sm:min-w-[270px]': true, // tablet
                }"
            >
                <span class="primary-text text-2xl">{{ titleCalendar }}</span>
            </div>
            <div class="flex gap-1">
                <v-btn :class="{ 'button-mini': miniMode }" @click.stop="onChangeDay('next', 'month')">
                    <v-icon :icon="mdiChevronDoubleRight" color="primary" :size="sizeIcon" />
                </v-btn>
                <v-btn :class="{ 'button-mini': miniMode }" @click.stop="onChangeDay('next', 'year')">
                    <v-icon :icon="mdiChevronTripleRight" color="primary" :size="sizeIcon" />
                </v-btn>
            </div>
        </div>
    </div>
</template>

<style scoped>
.primary-text {
    color: rgb(var(--v-theme-info));
}
.button-mini {
    min-width: 34px;
    padding: 0;
}
</style>
