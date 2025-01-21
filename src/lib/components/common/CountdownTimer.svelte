<script lang="ts">
    import { t } from '$lib/i18n/config';
    import {onDestroy} from "svelte";

    export let dateEnd: Date;

    let targetDate = new Date(dateEnd)
    let days, hours, minutes, seconds;

    let isEnded = false;

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      days = Math.floor(distance / (1000 * 60 * 60 * 24));
      hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((distance % (1000 * 60)) / 1000);


      if (distance < 0) {
          isEnded = true;
      days = 0;
      hours = 0;
      minutes = 0;
    }
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    onDestroy(() => {
      clearInterval(interval);
    });
</script>

{#if !isEnded}
<span >
    <span>{days ?? 0}{$t('kit.dateFormat.date')}</span>
    <span>{hours ?? 0}{$t('kit.dateFormat.hours')}</span>
    <span>{minutes ?? 0}{$t('kit.dateFormat.minutes')}</span>

</span>
{:else}
    <span>
        Expired
    </span>
{/if}
