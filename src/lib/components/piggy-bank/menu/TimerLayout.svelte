<script lang="ts">
	import {base} from '$app/paths'
	import {onMount} from 'svelte';
	import {t} from '$lib/i18n/config';
	import {intervalToDuration} from "date-fns";

	const bg_img: string = `https://p2w.imgix.net/resources/client/pb/Cmt_Timer.png?auto=compress&auto=format`

	export let dateEnd: Date
	let time;

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	$: remaining = intervalToDuration({start: time, end: dateEnd})
</script>


<div class="  w-full flex justify-center absolute bottom-0 left-0">
    <div style="border-image-source: url({bg_img}); " class="timer flex items-end   px-[4vh]  absolute z-[0]">
        <p class="text-center font-['Fira_Sans'] font-medium  vwFont-[30] port:text-[2.4vh] text-white ">
            <span class="text-gray">
                {$t('kit.timer')}
            </span>
            <span class="font-['Fira_Sans'] font-black text-[#F6EAC0]">
                <span>{remaining.days ?? 0}
                    {$t('kit.dateFormat.date')}
                </span>
                <span>{remaining.hours ?? 0}
                    {$t('kit.dateFormat.hours')}
                </span>
                <span>{remaining.minutes ?? 0}
                    {$t('kit.dateFormat.minutes')}
                </span>
<!--                <span>{remaining.seconds ?? 0}-->
<!--                    {$t('kit.dateFormat.seconds')}-->
<!--                </span>-->
            </span>
        </p>
    </div>
</div>

<style>
    .timer {
        width: 111px;
        height: 48px;
        z-index: 2;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
    }
</style>
