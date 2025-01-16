<script lang="ts">
	import type { StoreOffer as Offers } from '../../../common/models/store-offer.type';
	import FreeSpinOffer from '$lib/components/store/FreeSpinOffer.svelte';
	import BonusCashOffer from '$lib/components/store/BonusCashOffer.svelte';


	export let offers: Offers[];
	export let handleOfferByType: boolean = true;
	let filteredOffers: Offers[] = [];

	$: filteredOffers = offers?.filter((item) => {
		return (handleOfferByType && item.type === 'freeSpins') ||
			(!handleOfferByType && item.type === 'bonusCash');
	}) || [];

	$:classesByType = handleOfferByType ? ' flex-col  gap-y-[8px]  w-full  mx-auto' : 'flex-row flex-wrap gap-[5px] justify-start items-start w-full';
</script>


<div class="flex  touch-pan-y  px-[8px] {classesByType} h-full">
	{#if filteredOffers.length === 0}
		{#if handleOfferByType}
			<div
				class="w-full h-full text-[#e4e4e4] text-[16px] font-semibold font-['Poppins'] leading-[1] flex justify-center items-center ">
				Expecting new Free Spin
			</div>
		{:else}
			<div
				class="w-full h-full text-[#e4e4e4] text-[16px] font-semibold font-['Poppins'] leading-[1] flex justify-center items-center ">
				Expecting new Bonus Cash
			</div>
		{/if}
	{:else}
		{#each filteredOffers as offer, index}
			{#if handleOfferByType}
				<FreeSpinOffer {offer} {index} />
			{:else}
				<BonusCashOffer {offer} {index} />
			{/if}
		{/each}
	{/if}
</div>
