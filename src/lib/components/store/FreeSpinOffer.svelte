<script lang="ts">
	import { StoreOfferType } from '../../../common/enums';
	import Timer from '$lib/components/common/Timer.svelte?raw';
	import CountdownTimer from '$lib/components/common/CountdownTimer.svelte';
	import AppButton from '$lib/components/common/AppButton.svelte';
	import type { StoreOffer } from '../../../common/models/store-offer.type';
	import { playerState } from '$lib/state/player.state';
	import { handleTutorialStep } from '$lib/tutorial.service';
	import { deselectItemsOnPage, removeBackgroundGlass } from '$lib/tutorial.utils';
	import { showPopUpStoreLayout } from '$lib/state/storePopup.state';
	import { TutorialSteps } from '../../../common/enums';
	import { StorePopUpMode } from '../../../types/storePopup.type';
	import { AdapterCommunicationService } from '$lib/adapter-listener';

	export let offer;
	export let index;

	function showStorePopUp(storeOffer: StoreOffer) {
		//#tutorial
		if (storeOffer.id === 'tutorialOffer' && $playerState.general.balance >= storeOffer.price) {
			AdapterCommunicationService.sendMessage({
				type: 'track',
				message: { type: 'clickTutorOfferWelcomeScreen' }
			});
			handleTutorialStep(TutorialSteps.offerStep2);
		} else {
			deselectItemsOnPage(['tutorialOffer']);
			AdapterCommunicationService.sendMessage({
				type: 'hideTutorialHints'
			});
			removeBackgroundGlass();
			AdapterCommunicationService.sendMessage({ type: 'track', message: { type: 'clickOffer' } });
		}
		$showPopUpStoreLayout.mode = StorePopUpMode.view;
		$showPopUpStoreLayout.isOpen = true;
		$showPopUpStoreLayout.id = storeOffer.id;
		$showPopUpStoreLayout.name = storeOffer.name;
		$showPopUpStoreLayout.description = storeOffer.description;
		$showPopUpStoreLayout.price = storeOffer.price;
		$showPopUpStoreLayout.type = storeOffer.type;
		$showPopUpStoreLayout.endDate = storeOffer.endDate;
		$showPopUpStoreLayout.balance = $playerState.general.balance;
		AdapterCommunicationService.sendMessage({ type: 'openPopup', message: 'click' });
	}

</script>

<div role="button" tabindex={index + 3}
		 on:keydown={(e) => {
           if (e.key === 'Enter' || e.key === ' ') {
             e.preventDefault();
             showStorePopUp(offer);
           }
         }}
		 on:click={() => showStorePopUp(offer)}
		 class="w-[370px] h-[116px] justify-center items-center inline-flex" id={offer.id}>
	<div class="w-[370px] h-[116px] bg-[#0e0f12] rounded-xl border border-[#1e2025] flex flex-row relative">


		<div class="absolute left-0 bottom-0 w-full h-[44px] bg-black/40 z-[0] rounded-br-[11px]"
		></div>

		<div class="w-[106px] h-full justify-center items-center inline-flex p-[5px] z-[1]">
			<div
				style="background-color: brown; background-image: url('{offer.type === StoreOfferType.bonusCash ?  `https://p2w.imgix.net/resources/client/store/Icn_Str_Money.png?auto=compress&auto=format)` : `https://p2w.imgix.net/resources/client/store/Icn_Str_Slot.png?auto=compress&auto=format)`}')"
				class="w-[106px] h-full rounded-lg border bg-contain bg-no-repeat bg-center ">

				<div
					class="w-[calc(100%-4px)] h-6 left-[2px] top-[2px] relative bg-neutral-950/60 rounded-md flex justify-center items-center">
					<div
						class="  text-white text-[9.34px] h-[14px] font-semibold font-['Poppins'] leading-[14px] flex items-center justify-center gap-[5px]">
						<span class="inline-block h-[14px]">
					{@html Timer}
						</span>
						<CountdownTimer dateEnd={offer.endDate} />
					</div>
				</div>


			</div>
		</div>
		<div class="h-full flex-col justify-start items-start gap-0.5 inline-flex pt-[11px] pl-[5px] z-[1]">
			<div class="self-stretch text-[#dddddd] text-sm font-semibold font-['Poppins'] leading-[16.80px]">{offer.name}
			</div>
			<div class="self-stretch h-3.5 text-[#a0a5ad] text-xs font-medium font-['Poppins'] leading-3">Provider name</div>
			<div>
				<span class="text-[#a2a6ad] text-xs font-normal font-['Poppins'] leading-[14.40px]">Wager </span>
				<span class="text-[#e4e4e4] text-sm font-bold font-['Poppins'] leading-[16.80px]">x1</span>
			</div>

			<div>
				<span class="text-[#a2a6ad] text-xs font-normal font-['Poppins'] leading-[14.40px]"> Bet</span>
				<span class="text-[#e4e4e4] text-sm font-bold font-['Poppins'] leading-[16.80px]">0.5 EUR  </span>
			</div>
		</div>

		<div
			class="h-full flex-col justify-start items-start gap-0.5 inline-flex  absolute right-0 w-[118px] flex flex-col items-center z-[1]">
			<div
				class="opacity-80 text-center text-[#e8e8e8] text-2xl font-bold font-['Poppins'] uppercase tracking-tight pt-[30px] mx-auto ">
				FS {offer.reward ? offer.reward : '???'}</div>

			<div class="w-[110px] h-[30px] flex justify-center items-center mx-auto mt-[15px]">
				<AppButton
					on:click={() => showStorePopUp(offer)}
					isLoading={$showPopUpStoreLayout.isOpen}
					caption={offer.price}
					color={'green'}
					isActive={true}
					bigButton={true}
					withCoin={true}
				/>
			</div>
		</div>

	</div>
</div>