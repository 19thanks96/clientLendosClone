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


	let balance: unknown | number;
	$: if ($playerState.isInitialized && $playerState.store && $playerState.store.offers) {
		balance = $playerState.general.balance;
	}

	let isFreespinOnScreen = true;

	const exit = () => AdapterCommunicationService.sendMessage({ type: 'exit', message: 'click' });

</script>
<div style='height: 100dvh;' class=" w-screen overflow-hidden">
	{#if $playerState.isInitialized && $playerState.store && $playerState.store.offers.length > 0 }
		<div class="{$rewardState.isOpen ? 'opacity-0' :'opacity-1'}">
			<UserBalance {balance} isNotReward={true}/>
			<div class="absolute top-[36px] right-[15px] z-[9]">
				<ExitButton on:click={exit} />
			</div>
		</div>
		{#key $playerState}
			<div style='background-image: url({base}/reskin/astronautStore.png)'
					 class="absolute h-full bg-contain bg-no-repeat astronaut z-[2]">

			</div>
			<div class="absolute top-[16px] left-0 right-0 bottom-0 border-rounded overflow-hidden">
				<div style='background-image:linear-gradient(to bottom, rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, 1) 95%), url({base}/reskin/blackHole.png)'
						 class="w-full h-full bg-contain bg-no-repeat blackHole">
					<div class="absolute top-[64%] left-0  w-full">

						<Title  title="Info Store"
							description={$playerState.store.info} text={'store'} />
					</div>
				</div>
			</div>
			<div class="offerList-list flex flex-col items-start p-0 absolute top-[32%] left-0 right-0 z-[5] h-11 h-[auto] ">
				<div style=" scrollbar-width: none;"
						 class="h-[350px] flex-col justify-start items-start gap-2 inline-flex w-full overflow-y-scroll">
					<OfferList offers={$playerState.store?.offers} handleOfferByType={isFreespinOnScreen}
					/>
				</div>

				<div class="w-[344px] h-11 justify-center items-center inline-flex m-auto pt-[10px]">
					<div class="w-[344px] h-11 bg-[#030303] rounded-xl border border-[#1e2025]/50 m-auto flex  items-center px-1">
						<button on:click={() => {isFreespinOnScreen = true}} class="w-[174px] h-9 relative">
							<div
								class="w-full h-9 left-0 top-0 absolute  rounded-lg flex justify-center items-center {isFreespinOnScreen ? 'bg-[#141518]' : 'bg-[#000] opacity-30'}">
								<div
									class="text-center text-[#bec2c9] text-sm font-medium font-['Poppins'] capitalize leading-[10.55px] h-[18px] flex flex-row justify-center items-center gap-[6px]">
									Free Spin
									<FreeSpinSvg />
								</div>
							</div>
						</button>
						<button on:click={() => {isFreespinOnScreen = false}} class="w-[174px] h-9 relative">
							<div
								class="w-full h-9 left-0 top-0 absolute  rounded-lg flex justify-center items-center {isFreespinOnScreen ? 'bg-[#000] opacity-30' : 'bg-[#141518]'}">
								<div
									class="text-center text-[#bec2c9] text-sm font-medium font-['Poppins'] capitalize leading-[10.55px] h-[18px] flex flex-row justify-center items-center gap-[6px]">
									bonus Cash
									<BonusCashSvg />
								</div>
							</div>
						</button>
					</div>
				</div>
			</div>
			<div
				class="w-full h-full  top-0 left-0 right-0 bottom-0 flex justify-center items-center { $showPopUpStoreLayout.isOpen ? ' z-[10] fixed' : 'z-[-1] absolute '}">
				{#if $showPopUpStoreLayout.isOpen}
					<StorePopUp />
				{/if}
			</div>
		{/key}
	{:else}
		<div style="transform: translate(0, calc(50vh - 50%));"
				 class="w-full h-full flex justify-center items-center">
			<Spinner />
		</div>
	{/if}

</div>

<style lang='scss'>
  .border-rounded {
    background: #050505;
    border: 1px solid #1E2026;
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
    overflow-y: auto;
    scrollbar-width: none;
    z-index: 2;
  }

  @media screen and (max-width: 370px) {
    .mission-list {
      height: 360px;
    }
  }

</style>
