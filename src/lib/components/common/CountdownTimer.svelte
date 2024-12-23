<script lang="ts">
    import { intervalToDuration } from 'date-fns';
    import { onMount } from 'svelte';
    import { t } from '$lib/i18n/config';

    export let dateEnd: Date;
    let remaining;

    const updateRemaining = () => {
        remaining = intervalToDuration({ start: new Date(), end: dateEnd });
    };

    updateRemaining()

    onMount(() => {
        updateRemaining();
        const interval = setInterval(updateRemaining, 1000);

    });
</script>

<span >
    <span>{remaining.days ?? 0}{$t('kit.dateFormat.date')}</span>
    <span>{remaining.hours ?? 0}{$t('kit.dateFormat.hours')}</span>
    <span>{remaining.minutes ?? 0}{$t('kit.dateFormat.minutes')}</span>

</span>

