<script lang="ts">
	import UserBalance from '$lib/components/common/Money.svelte';
	import MissionList from '$lib/components/mission/MissionList.svelte';
	import CountdownTimer from '$lib/components/common/CountdownTimer.svelte';
	import { rewardState } from '$lib/state/reward.state';
	import { AdapterCommunicationService } from '$lib/adapter-listener';
	import { playerState } from '$lib/state/player.state';
	import Spinner from '$lib/components/common/Spinner.svelte';
	import RewardLayoutDm from '$lib/components/reward/RewardLayoutDm.svelte';
	import { base } from '$app/paths';
	import Title from '$lib/components/mission/Title.svelte';
	import ExitButton from '$lib/components/common/ExitButton.svelte';
	import timer from '$lib/components/common/Timer.svelte?raw';

	let missions, balance, dateEnd, name;
	$: if ($playerState.isInitialized && $playerState?.mg && $playerState?.mg?.missions) {
		missions = $playerState.mg.missions;
		dateEnd = $playerState.mg.dateEnd;
		name = $playerState.mg.name;
		balance = $playerState.general.balance;
	}



	const exit = () => AdapterCommunicationService.sendMessage({ type: 'exit', message: 'click' });
</script>

<div style='height: 100dvh;' class=" w-screen overflow-hidden">

		{#if $playerState?.isInitialized && $playerState?.mg && $playerState?.mg?.missions?.length > 0}
			<div class="{$rewardState.isOpen ? 'opacity-0' :'opacity-1'}">
				<UserBalance {balance} isNotReward={true}
				/>
				<div class="absolute top-[36px] right-[15px] z-[9]">
					<ExitButton on:click={exit} />
				</div>
			</div>
			{#key $playerState}
				<div style='background-image: url({base}/reskin/dmAstro.png)'
						 class="absolute h-full bg-contain bg-no-repeat astronaut z-[2]">

				</div>
				<div class="absolute top-[16px] left-0 right-0 bottom-0 border-rounded overflow-hidden">
					<div style='background-image:linear-gradient(to bottom, rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, 1) 95%),  url({base}/reskin/blackHole.png)'
							 class="w-full h-full bg-contain bg-no-repeat blackHole">
						<div
							class="relative top-[43%] left-[66%] timer text-[#D2D2D2] text-[10px] leading-[1.5] flex items-center pl-[5px]">
							  <span class="h-[15px] w-[15px] ">
									{@html timer}
								</span>
							<span  class="h-auto  ml-[5px] font-['Poppins'] font-[600] text-[10px] leading-[15px] text-[#D2D2D2]">
                        <CountdownTimer {dateEnd} />
                      </span>
						</div>
						<Title title="Info missions"
							description={$playerState.mg.info} text={name} />
					</div>
				</div>
				<div class="mission-list flex flex-col items-start p-0 absolute">
					<MissionList {missions} />
				</div>
			{/key}

		{:else}
			<Spinner></Spinner>
		{/if}
	{#if $rewardState.isOpen}
		<RewardLayoutDm rewardAmount={$rewardState.amount}
										on:close={() => $rewardState.isOpen = false } />
	{/if}
</div>

<style lang='scss'>
  .border-rounded {
    background: #050505;
    border: 1px solid #1E2026;
    //box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.5);
    border-radius: 32px;
  }

  .blackHole {
    background-size: cover;
    height: 210px;
    position: absolute;
    top: 0px;
  }

  .astronaut {
    background-size: contain;
    background-position: top center;
    height: 205px;
    top: 8px;
    margin: auto;
    width: 100%;
  }

  .timer {
    width: 90px;
    height: 26px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 14px;
    z-index: 2;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
  }



  .mission-list {
    width: 100%;
    height: 404px;
    left: 0;
    top: 180px;
    gap: 8px;
    overflow-y: scroll;
    scrollbar-width: none;
    z-index: 2;
  }
	@media screen and (max-width: 370px) {
		.mission-list {
			height: 360px;
    }
	}

</style>
