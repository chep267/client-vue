<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

/** icons */
import { mdiChevronTripleLeft, mdiChevronTripleRight, mdiChevronDoubleLeft, mdiChevronDoubleRight } from '@mdi/js';

/** constants */
import { AppScreenSize } from '@module-base/constants/AppScreenSize';
import { AppSiderState } from '@module-base/constants/AppSiderState';
import { LocaleObject } from '@module-base/constants/LocaleObject';

/** hooks */
import { useCalendarStore } from '@module-calendar/hooks/useCalendarStore';
import { useSiderStore } from '@module-base/stores/useSiderStore';
import { CalendarLanguage } from '@module-calendar/constants/CalendarLanguage';

const { t, locale } = useI18n();
const siderStore = useSiderStore();
const calendarStore = useCalendarStore();

const { siderState } = storeToRefs(siderStore);
const { day } = storeToRefs(calendarStore);
const sizeIcon = 24;

const miniMode = computed(() => siderState.value === AppSiderState.hidden || siderState.value === AppSiderState.force);

const isToday = computed(() => calendarStore.isToday(day.value));

const titleCalendar = computed(() => {
    const month = day.value.format(locale.value === LocaleObject.en ? 'MMMM' : 'MM');
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
            'relative flex w-full flex-row justify-between gap-2 p-3': true,
            'flex-col-reverse px-1': miniMode,
        }"
        :style="`min-height: ${AppScreenSize.CalendarSelectHeight}px`"
    >
        <v-btn
            :disabled="isToday"
            :class="{ 'w-fit': true, 'primary-text': !isToday }"
            @click.stop="onChangeDay('today')"
        >
            {{ $t(CalendarLanguage.component.label.today) }}
        </v-btn>
        <div :class="{ 'flex flex-row justify-between gap-2': true, 'flex-1': miniMode }">
            <div class="flex gap-1">
                <v-btn
                    aria-label="button prev year"
                    :class="{ 'button-mini': miniMode }"
                    @click.stop="onChangeDay('prev', 'year')"
                >
                    <v-icon :icon="mdiChevronTripleLeft" color="primary" :size="sizeIcon" />
                </v-btn>
                <v-btn
                    aria-label="button prev month"
                    :class="{ 'button-mini': miniMode }"
                    @click.stop="onChangeDay('prev', 'month')"
                >
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
                <v-btn
                    aria-label="button next month"
                    :class="{ 'button-mini': miniMode }"
                    @click.stop="onChangeDay('next', 'month')"
                >
                    <v-icon :icon="mdiChevronDoubleRight" color="primary" :size="sizeIcon" />
                </v-btn>
                <v-btn
                    aria-label="button next year"
                    :class="{ 'button-mini': miniMode }"
                    @click.stop="onChangeDay('next', 'year')"
                >
                    <v-icon :icon="mdiChevronTripleRight" color="primary" :size="sizeIcon" />
                </v-btn>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.primary-text {
    color: rgb(var(--v-theme-info));
}
.button-mini {
    min-width: 34px;
    padding: 0;
}
</style>
