<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Card from '../absorb/smelte/src/components/Card/Card.svelte';
    import Button from './Button.svelte';
    import Ripple from '../absorb/smelte/src/components/Ripple';
    import { getWeekDays, weekStart } from '../absorb/smelte/src/components/DatePicker/util';
    import type { Maybe } from '../generated/graphql';
    import type { DatePickerValueType } from './types';
    import type { Opt } from '../lib/support/types';

    const dispatch = createEventDispatcher();

    export let open = false;
    export let value: Maybe<DatePickerValueType> = null;
    export let locale = 'default';
    export let todayClasses = 'text-primary-600 rounded-full border border-primary-600';
    export let selectedClasses = 'bg-primary-600 text-white rounded-full';
    export let closeOnSelect = true;
    export let dense: Opt<boolean>;
    export let paginatorProps = {
        color: 'gray',
        text: true,
        flat: true,
        dark: true,
        remove: 'px-4 px-3 m-4 p-4',
        iconClasses: (c: string) => c.replace('p-4', ''),
        disabledClasses: (c: string) =>
            c
                .replace('text-white', 'text-gray-200')
                .replace('bg-gray-300', 'bg-transparent')
                .replace('text-gray-700', ''),
    };

    let tempDate: Date;
    let temp: DatePickerValueType = value || new Date();

    $: temp = value || new Date();

    $: {
        temp = new Date(temp.valueOf()); // number
    }

    let initialValue: Date;

    $: {
        if (typeof temp === 'string') {
            // string
            tempDate = new Date(temp);
        } else tempDate = temp as Date;
        initialValue = tempDate;
    }

    const today = new Date().getDate();

    $: year = tempDate.toLocaleString(locale, { year: 'numeric' });
    $: month = tempDate.toLocaleString(locale, { month: 'short' });
    $: firstDayOfWeek = weekStart(locale);
    $: weekdays = getWeekDays(locale, firstDayOfWeek);

    let selected;

    $: lastDayOfMonth = new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 0);
    $: firstDayOfMonth = new Date(tempDate.getFullYear(), tempDate.getMonth(), 1);
    $: isCurrentMonth = new Date().getMonth() === tempDate.getMonth();
    $: isCurrentYear = new Date().getFullYear() === tempDate.getFullYear();

    function dayIsSelected(day: number) {
        if (!initialValue) return false;

        return (
            initialValue.getDate() === day &&
            tempDate.getFullYear() === initialValue.getFullYear() &&
            tempDate.getMonth() === initialValue.getMonth()
        );
    }

    $: daysInMonth = [...new Array(lastDayOfMonth.getDate() || 0)].map((i, j) => ({
        day: j + 1,
        isToday: isCurrentYear && isCurrentMonth && j + 1 === today,
        selected: dayIsSelected(j + 1),
    }));

    function select(day: number) {
        selected = day;
        tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), selected);
        dispatch('change', tempDate);

        value = tempDate;

        if (closeOnSelect) {
            open = false;
        }
    }

    $: dayOffset = Math.abs(firstDayOfMonth.getDay() - firstDayOfWeek);

    function next() {
        tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1));
    }

    function prev() {
        tempDate = new Date(tempDate.setMonth(tempDate.getMonth() - 1));
    }
</script>

<div>
    <Card class="absolute z-20 p-4 w-auto dark:bg-dark-400 bg-white {dense ? '-my-4' : ''}">
        <div class="flex justify-between mb-4">
            <span class="text-gray-600 uppercase">{year} {month}</span>
            <div class="flex">
                <Button icon="keyboard_arrow_left" {...paginatorProps} on:click={prev} />
                <Button icon="keyboard_arrow_right" {...paginatorProps} on:click={next} />
            </div>
        </div>

        <div class="md:w-64 sm:w-full">
            <div class="flex uppercase text-gray-400 text-xs text-left">
                {#each weekdays as weekday}
                    <div class="w-1/7 text-center p-1">
                        {weekday}
                    </div>
                {/each}
            </div>
            <div class="flex flex-wrap text-left text-sm">
                {#if dayOffset}<div class="p-1 w-{dayOffset}/7" />{/if}
                {#each daysInMonth as i}
                    <div class="w-1/7 p-1">
                        <div
                            class="w-8 h-8 duration-100 relative {i.isToday && !i.selected
                                ? todayClasses
                                : ''} {i.selected ? selectedClasses : ''}"
                            on:click={() => select(i.day)}
                        >
                            <Ripple color="gray" class="p-1 w-full h-full">
                                {i.day}
                            </Ripple>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </Card>
</div>
