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

	{#if $playerState?.isInitialized && $playerState?.mg }
		<div class="{$rewardState.isOpen ? 'opacity-0' :'opacity-1'} relative ">
			<div class="relative top-[30px] left-[13px] z-[9]">
			<UserBalance {balance} isNotReward={true} />
			</div>
			<div class="absolute top-[30px] right-[15px] z-[9]">
				<ExitButton on:click={exit} />
			</div>
		</div>
		{#key $playerState}
			<div class="w-full h-full bg-contain bg-no-repeat blackHole z-[1] top-[14px_!important] ">
				<div style="background-image: url('https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/client/common/timerBg.svg')"
					class="relative top-[56px] left-[0.1px] timer text-[#D2D2D2] text-[10px] leading-[1.5] flex items-center  bg-contain bg-no-repeat">
							<div  class="w-full h-full bg-contain bg-no-repeat flex items-center justify-center">
										<span class="h-auto  ml-[5px] font-['Poppins'] font-[700] text-[14px] leading-[15px] text-[#080808]">
													<CountdownTimer {dateEnd} />
											</span>
							</div>
				</div>
				<Title title={$playerState.mg.name}
							 description={$playerState.mg.info} text={name} />
			</div>
			<div class="absolute top-[16px] left-0 right-0 bottom-0 border-rounded overflow-hidden z-[0]">
				<div
					style='background-image:linear-gradient(to bottom, rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, 1) 95%),  url({base}/reskin/blackHole.png)'
					class="w-full h-full bg-contain bg-no-repeat blackHole">

				</div>
			</div>
			<div style='background-image: url({base}/reskin/dmAstro.png)'
					 class="absolute h-full bg-contain bg-no-repeat astronaut ">

			</div>
			<div class="mission-list flex flex-col items-start p-0 absolute">
				<MissionList {missions} />
			</div>
		{/key}

	{:else}
		<div class="w-full h-full flex justify-center items-center relative left-1/2 translate-x-[-50%] ">
		<Spinner></Spinner>
		</div>
	{/if}
	{#if $rewardState.isOpen}
		<div class="absolute top-[32px] left-0 right-0 bottom-0 border-rounded overflow-hidden z-[99]">
			<RewardLayoutDm rewardAmount={$rewardState.amount}
											on:close={() => $rewardState.isOpen = false } />
		</div>
	{/if}
</div>

<style lang='scss'>



  .mission-list {
    width: 100%;
    height: 404px;
    left: 0;
    top: 180px;
    gap: 8px;
    overflow-y: auto;
    scrollbar-width: none;
    //z-index: 2;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
      display: none;
    }
  }

  @media screen and (max-width: 370px) {
    .mission-list {
      height: 360px;
    }
  }

</style>
