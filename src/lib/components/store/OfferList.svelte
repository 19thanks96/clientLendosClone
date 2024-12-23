<script lang="ts">
	import type { StoreOffer as Offers  } from '../../../common/models/store-offer.type';
	import FreeSpinOffer from '$lib/components/store/FreeSpinOffer.svelte';
	import BonusCashOffer from '$lib/components/store/BonusCashOffer.svelte';


	export let offers: Offers[];
	export let handleOfferByType:boolean = true;
	let filteredOffers: Offers[] = [];

	$: filteredOffers = offers?.filter((item) => {
		return (handleOfferByType && item.type === 'freeSpins') ||
			(!handleOfferByType && item.type === 'bonusCash');
	}) || [];

	$:classesByType = handleOfferByType ?   " flex-col  gap-y-[8px]  w-full" : "flex-row flex-wrap gap-[5px]"
</script>


<div class="flex  touch-pan-y  px-[8px] mx-auto {classesByType}" >
	{#each filteredOffers as offer, index }
		{#if handleOfferByType}
		<FreeSpinOffer {offer} {index}/>
			{:else}
			<BonusCashOffer {offer} {index}/>
			{/if}
	{/each}
</div>
