<script lang="ts">
	import timer from '$lib/components/common/timer.svelte?raw';
	import CountdownTimer from '$lib/components/common/CountdownTimer.svelte';
	import AppButton from '$lib/components/common/AppButton.svelte';
	import { formatNumber } from '$lib/utils';
	import { base } from '$app/paths';
	import type {StoreOffer} from '../../../common/models/store-offer.type';
	import {playerState} from '$lib/state/player.state';
	import {handleTutorialStep} from "$lib/tutorial.service";
	import {deselectItemsOnPage, removeBackgroundGlass} from "$lib/tutorial.utils";
	import {showPopUpStoreLayout} from '$lib/state/storePopup.state';
	import {TutorialSteps} from '../../../common/enums';
	import {StorePopUpMode} from '../../../types/storePopup.type';
	import {AdapterCommunicationService} from '$lib/adapter-listener';


export let offer;
export let index;

	function showStorePopUp(storeOffer: StoreOffer) {
		//#tutorial
		if (storeOffer.id === 'tutorialOffer' && $playerState.general.balance >= storeOffer.price) {
			AdapterCommunicationService.sendMessage({
				type: 'track',
				message: {type: 'clickTutorOfferWelcomeScreen'}
			});
			handleTutorialStep(TutorialSteps.offerStep2)
		} else {
			deselectItemsOnPage(['tutorialOffer']);
			AdapterCommunicationService.sendMessage({
				type: 'hideTutorialHints',
			});
			removeBackgroundGlass();
			AdapterCommunicationService.sendMessage({type: 'track', message: {type: 'clickOffer'}});
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
		AdapterCommunicationService.sendMessage({type: 'openPopup', message: 'click'});
	}
</script>


<div class="w-[120px] h-[204px] flex-col justify-center items-center inline-flex">
	<div class="w-[120px] h-[204px] bg-[#0e0f12] rounded-xl border border-[#1e2025]">
		<div class="w-[120px] h-[204px] relative">

			<div class="w-[110px] h-[30px] left-[4px] top-[169px] absolute text-[#e8e8e8] text-sm font-semibold font-['Poppins'] leading-[16.80px] flex justify-center items-center" >
				<AppButton
					on:click={() => showStorePopUp(offer)}
					isLoading={$showPopUpStoreLayout.isOpen}
					caption={formatNumber(offer.price)}
					color={'green'}
					id={offer.id}
					isActive={true}
					bigButton={true}
					withCoin={true}
				/>



			</div>

			<div class="w-[110px] h-[140px] left-[4px] top-[5px] absolute">
				<div style="background-image: url('{base}/reskin/FX_Yellow_Offer.svg')" class="w-[110px] h-[140px] left-0 top-0 absolute bg-[#e6d81e] rounded-lg"></div>
			</div>

			<div class="w-[92px] h-[68px] left-[13px] top-[41px] absolute justify-center items-center inline-flex">
				{#if offer.img}
				<img class="w-[92px] h-[68px]" src={offer.img} alt="offer img" />
					{:else}
					<img class="w-[92px] h-[92px]" src='https://p2w.imgix.net/resources/client/store/Icn_Str_Money.png?auto=compress&auto=format)' alt="offer img" />
					{/if}
			</div>

			<div class="w-[106px] h-[52px] left-[6px] top-[113px] absolute">
				<div class="w-[106px] h-[30px] left-0 top-0 absolute justify-center items-center inline-flex">
					<div class="w-[106px] h-[30px] bg-gradient-to-b from-[rgba(35,2,2,0.2)] to-[rgba(27,1,1,0.4)] rounded-bl-md rounded-br-md"></div>
				</div>
				<div class="left-[16px] top-[32px] absolute text-center flex items-center"><span class="text-[#e4e4e4] text-xs font-semibold font-['Poppins'] leading-[14.40px] ">x5000</span>&nbsp;<span class="text-[#a2a6ad] text-[10px] font-normal font-['Poppins'] leading-3"> {offer.name} </span></div>
			</div>
			<div class="w-full top-[116px] absolute text-center text-white text-base font-bold font-['Poppins'] uppercase tracking-tight">{offer.reward ? offer.reward  : '???'} </div>



			<div class="w-[102px] h-6 left-[8px] top-[9px] absolute">
				<div class="w-[102px] h-6 left-0 top-0 absolute">
					<div class="w-[102px] h-6 left-0 top-0 absolute bg-neutral-950/60 rounded-md"></div>
				</div>
<!--				<div class="w-3.5 h-3.5 left-[5.25px] top-[5.72px] absolute">-->
<!--					<div class="w-[11.63px] h-[11.63px] left-[1.19px] top-[1.18px] absolute opacity-50 bg-black rounded-[51.69px]"></div>-->
<!--				</div>-->


				<div class="left-[0px] top-[6.04px] w-full absolute text-white text-[9.34px] h-[10px] font-semibold font-['Poppins'] flex items-center flex-row  justify-center ">
					<span class="w-[14px] h-[14px]">{@html timer}</span>&nbsp;
					<CountdownTimer dateEnd={offer.endDate} />
				</div>
			</div>
		</div>
	</div>
</div>