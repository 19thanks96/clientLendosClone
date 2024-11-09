<script lang="ts">
	import {base} from '$app/paths'
	import {createEventDispatcher, onMount} from "svelte";
	import {browser} from "$app/environment";
	import SpinningLight from '../reward/SpinningLight.svelte';
	import RewardText from '../reward/RewardText.svelte';

	import ScaledImg from '../reward/ScaledImg.svelte';
	import RewardScratchCongratulationText from './RewardScratchCongratulationText.svelte';
	import AppButton from "$lib/components/common/AppButton.svelte";

	export let rewardAmount: number
	export let showRewardLayout: boolean
    let lottie;

	onMount(async () => {
		if (browser) lottie = await import('lottie-web');

	})

	const dispatch = createEventDispatcher();
</script>

{#if showRewardLayout}
    <div class=" z-[10] bg-black bg-opacity-90 absolute top-0 left-0 right-0  bottom-0 text-white overflow-hidden reward-block">
        <div class='first-reward-element'>
            <RewardScratchCongratulationText/>
        </div>
        <div  class='second-reward-element w-full h-full'>
            <SpinningLight image={'https://p2w.imgix.net/resources/client/dm/FX_Overlay_Yellow.png?auto=compress&auto=format'}/>
            <ScaledImg image={`https://p2w.imgix.net/resources/client/sc/Img_Reward_SC.png?auto=compress&auto=format`} json={`${base}/json/Splash.json`} lottie={lottie}/>
        </div>

        <RewardText {rewardAmount}/>
        <div class="w-full flex justify-center third-reward-element">
            <div class='third-reward-element text-center vhWidth-[258] vwHeight-[92] port:w-[23.889vw] port:h-[8.519vw] z-50 flex items-center justify-center fixed bottom-[2.5%] port:bottom-[5%] vhFont-[38] port:text-[2.76vh] leading-[1.06]'>
                <AppButton color="green" caption="Claim" isActive={true} on:click={() => dispatch('close')} showBorderWhenInactive={true}/>
            </div>
        </div>
    </div>
{/if}

<style>
    .reward-block {
        animation: show-reward 0.33s ease-in-out;
    }

    @keyframes show-reward {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }

    }

    .first-reward-element {
        animation: show-reward 0.1s ease-in-out;
    }

    .second-reward-ement {
        animation: show-elements 0.75s ease-in-out;
    }

    .third-reward-element {
        animation: show-elements 1.25s ease-in-out;
    }

    @keyframes show-elements {
        0% {
            opacity: 0;
        }
        90% {
            opacity: 0;

        }
        100% {
            opacity: 1;


        }
    }
</style>
