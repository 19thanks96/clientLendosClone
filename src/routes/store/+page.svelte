<script lang='ts'>
	import UserBalance from '$lib/components/common/Money.svelte';
	import { playerState } from '$lib/state/player.state';
	import Spinner from '$lib/components/common/Spinner.svelte';
	import { showPopUpStoreLayout } from '$lib/state/storePopup.state';
	import { base } from '$app/paths';
	import { AdapterCommunicationService } from '$lib/adapter-listener';
	import ExitButton from '$lib/components/common/ExitButton.svelte';
	import Title from '$lib/components/mission/Title.svelte';
	import { rewardState } from '$lib/state/reward.state';
	import FreeSpinSvg from '$lib/components/common/FreeSpinSvg.svelte';
	import BonusCashSvg from '$lib/components/common/BonusCashSvg.svelte';
	import OfferList from '$lib/components/store/OfferList.svelte';
	import StorePopUp from '$lib/components/store/StorePopUp.svelte';
	import CountdownTimer from '$lib/components/common/CountdownTimer.svelte';


	let balance: unknown | number;

	$: if ($playerState.isInitialized && $playerState.store && $playerState.store.offers) {
		balance = $playerState.general.balance;
	}

	let isFreespinOnScreen = true;

	const exit = () => AdapterCommunicationService.sendMessage({ type: 'exit', message: 'click' });

</script>
<div style='height: 100dvh;' class=" w-screen overflow-hidden">
	{#if $playerState.isInitialized && $playerState.store }
		<div class="{$showPopUpStoreLayout.isOpen ? ' pointer-events-none opacity-0 ' : 'opacity-1'} relative ">
			<div class="relative top-[30px] left-[13px] z-[9]">
				<UserBalance {balance} isNotReward={true} />
			</div>
			<div class="absolute top-[30px] right-[15px] z-[9]">
				<ExitButton on:click={exit} />
			</div>
		</div>
		{#key $playerState}

			<div class="w-full h-full bg-contain bg-no-repeat blackHole z-[3] top-[14px_!important] ">
				<div
					style=""
					class="relative top-[56px] left-[0.1px] timer text-[#D2D2D2] text-[10px] leading-[1.5] flex items-center  bg-contain bg-no-repeat">

				</div>
				<Title title='Space Store'
							 description={$playerState.store.info} text='space store' className="top-[89px]"/>
			</div>
			<div class="absolute top-[16px] left-0 right-0 bottom-0 border-rounded overflow-hidden z-[0]">
				<div
					style='background-image:linear-gradient(to bottom, rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, 1) 95%),  url({base}/reskin/blackHole.png)'
					class="w-full h-full bg-contain bg-no-repeat blackHole">

				</div>
			</div>
			<div style='background-image: url({base}/reskin/astronautStore.png)'
					 class="absolute h-full bg-contain bg-no-repeat astronaut">

			</div>
			<div class="offer-list flex flex-col items-start p-0 absolute top-[32%] left-0 right-0  h-11 h-[auto] ">
				<div style=" scrollbar-width: none;"
						 class="h-[350px] flex-col justify-start items-start gap-2 inline-flex w-full overflow-y-auto offer-list__overflow">
					<OfferList offers={$playerState.store?.offers} handleOfferByType={isFreespinOnScreen}
					/>
				</div>

				<div class="w-[344px] h-11 justify-center items-center flex m-auto pt-[10px]">
					<div class="w-[344px] h-11 bg-[#030303] rounded-xl border border-[#1e2025]/50 m-auto flex  items-center px-1">
						<button on:click={() => {isFreespinOnScreen = true}} class="w-[174px] h-9 relative">
							<div
								class="w-full h-9 left-0 top-0 absolute  rounded-lg flex justify-center items-center {isFreespinOnScreen ? 'offer-type-btn_active' : 'offer-type-btn_inactive'}">
								<div
									class="text-center text-[#bec2c9] text-sm font-medium font-['Poppins'] capitalize leading-[10.55px] h-[18px] flex flex-row justify-center items-center gap-[6px]">
									Free Spin
									<FreeSpinSvg />
								</div>
							</div>
						</button>
						<button on:click={() => {isFreespinOnScreen = false}} class="w-[174px] h-9 relative">
							<div
								class="w-full h-9 left-0 top-0 absolute  rounded-lg flex justify-center items-center {isFreespinOnScreen ? 'offer-type-btn_inactive' : 'offer-type-btn_active'}">
								<div
									class="text-center text-[#bec2c9] text-sm font-medium font-['Poppins'] capitalize leading-[10.55px] h-[18px] flex flex-row justify-center items-center gap-[6px]">
									Bonus Cash
									<BonusCashSvg />
								</div>
							</div>
						</button>
					</div>
				</div>
			</div>
			<div
				class="w-full h-full  top-0 left-0 right-0 bottom-0 flex justify-center items-center ">
				{#if $showPopUpStoreLayout.isOpen}
					<StorePopUp />
				{/if}
			</div>
		{/key}
	{:else}
		<div class="w-full h-full flex justify-center items-center relative left-1/2 translate-x-[-50%] ">
			<Spinner />
		</div>
	{/if}
</div>

<style lang='scss'>
	.offer-list {
      top: 197px;
	  &__overflow {
        &::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
        }
	  }
	}

	.offer-type-btn_active{
			background-color: #141518;
	}

	.offer-type-btn_inactive{
    background-color: #000;
    opacity: 0.3;
	}
</style>
