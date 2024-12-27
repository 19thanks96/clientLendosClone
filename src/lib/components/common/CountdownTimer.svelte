<script lang="ts">
    import {intervalToDuration} from 'date-fns';
    import {onMount} from 'svelte';
    import {t} from '$lib/i18n/config';

    export let dateEnd: Date;
    let time;

    onMount(() => {
        const interval = setInterval(() => {
            time = new Date();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });

    $: remaining = intervalToDuration({start: time, end: dateEnd});

</script>

<span >
    <span>{remaining.days ?? 0}{$t('kit.dateFormat.date')}</span>
    <span>{remaining.hours ?? 0}{$t('kit.dateFormat.hours')}</span>
    <span>{remaining.minutes ?? 0}{$t('kit.dateFormat.minutes')}</span>

</span>

