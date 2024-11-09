<script lang="ts">
	import { base } from '$app/paths';
	import SpinningLight from './SpinningLight.svelte';
	import ScaledImg from './ScaledImg.svelte';
	import RewardText from './RewardText.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import RewardCongratulationText from './RewardCongratulationText.svelte';
	import AppButton from '$lib/components/common/AppButton.svelte';
	import UserBalance from '$lib/components/common/Money.svelte';
	import { userBalanceBeforeRewardState } from '$lib/state/oldUserBalance.state';
	import { AdapterCommunicationService } from '$lib/adapter-listener';
	import { rewardState } from '$lib/state/reward.state';
	import { playerState } from '$lib/state/player.state';
	import { MissionStatus } from '../../../common/models/mission.type';
	import { enrichTutorialMissions } from '$lib/tutorial.service';
	import { tutorialState } from '$lib/state/tutorial.state';
	import RewardStoreText from '$lib/components/reward/RewardStoreText.svelte';
	import ScaledStoreImg from '$lib/components/reward/ScaledStoreImg.svelte';

	let balance = $userBalanceBeforeRewardState;

	let opacityButton = 1;

	const dispatch = createEventDispatcher();


	const holdReward = () => {
		dispatch('close');
		if ($playerState.tutorial && $playerState) {
			$playerState.tutorial.step = 100;
		}
		AdapterCommunicationService.sendMessage({
			type: 'track',
			message: { type: 'TheEnd' }
		});
		AdapterCommunicationService.sendMessage({ type: 'exit', message: 'click' });
	};
	let scale = 0.9
	onMount(() => {
		if (screen.width > 768) {
			scale = 0.65
		}
	})
</script>

<div class="z-[11] bg-black bg-opacity-90 absolute top-0 left-0 right-0  bottom-0 text-white overflow-hidden ">
	<div class='first-reward-element'>
		<RewardStoreText firstTextPart="Congrats, You`re In!" />
	</div>

	<div class='second-reward-element w-full h-full'>
		<SpinningLight
			image={'https://p2w.imgix.net/resources/client/dm/FX_Overlay_Yellow.png?auto=compress&auto=format'} />
		<ScaledStoreImg image={'https://p2w.imgix.net/resources/client/store/Icn_Str_Slot.png?auto=compress&auto=format'}
										starsImage={base + '/newImg/Fx_Cmn_Overlay_Yellow.svg'}
		/>
	</div>
	<div class="fixed top-[66%] port:top-[60%] left-0 w-[100vw] ">
		{#key scale}
		<RewardStoreText firstTextPart="Your discount applied to your request" {scale} />
			{/key}
	</div>
	<div class="h-full w-full flex justify-center third-reward-element">
		<div id="claimRewardDmButton" style="opacity: {opacityButton}; transition: all 0.5s ease-out;"
				 class='absolute third-reward-element text-center vhFont-[16] port:text-[3.148vw] vwWidth-[122] vhHeight-[40] leading-[1.2] port:w-[23.704vw] port:h-[7.778vw] z-50 flex items-center justify-center fixed bottom-[6.75%] port:bottom-[6.25%]'>
			<AppButton color="green" caption="Got  It" isActive={true} on:click={() => holdReward()} />
		</div>
	</div>

</div>


<style>

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
