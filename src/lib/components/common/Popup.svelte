<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { showPopUpLayout } from '$lib/state/popup.state';
	import AppButton from './AppButton.svelte';
	import ExitButton from '$lib/components/common/ExitButton.svelte';
	import { base } from '$app/paths';
	import Title from '$lib/components/mission/Title.svelte';
	import { playerState } from '$lib/state/player.state';
	import { OverlayScrollbarsComponent } from 'overlayscrollbars-svelte';
	import SecondAppButton from '$lib/components/common/SecondAppButton.svelte';

	const dispatch = createEventDispatcher();
</script>

<div on:click={() => dispatch('close')}
		 style="background-image:linear-gradient(to bottom, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 1) 35%), url({`${base}/reskin/blackHole.png`}); background-size: contain; background-repeat: no-repeat; background-position: center top;"
		 class="{$showPopUpLayout.isOpen ? 'visible' : 'hidden'} w-full h-full  fixed top-0 bg-cover left-0  z-[12] flex items-center justify-center rounded-[32px]"></div>
	<div class=" h-full absolute right-[15px] top-[15px] {$showPopUpLayout.isOpen ? 'visible' : 'hidden'} z-[14]">
			<ExitButton on:click={() => dispatch('close')}
								 />
	</div>
<div style="position: relative; top: 120px"
		 class="{$showPopUpLayout.isOpen ? 'visible' : 'hidden'}  w-full  h-[490px] z-[13]">
	<div>

	<Title
		 text={$showPopUpLayout.name} withInfoButton={false}/>
	</div>
	<div style="--overlayscrollbars-height: 100%; --os-border-vertical: 1px solid rgba(17, 19, 26, 1);
    --os-border-radius-vertical: 6px;" class="w-full h-[77.5%]  py-[25px]  flex justify-center items-center  scroll-container text-[rgba(161,_165,_173,_1)] overflow-hidden;">
		<OverlayScrollbarsComponent>
			<div class="h-auto px-[50px] w-full flex justify-center items-center text-center">
				{#if $showPopUpLayout.additionalText}
					<div>

					{$showPopUpLayout.additionalText}
					</div>
				{/if}

		{$showPopUpLayout.description}
			</div>
		</OverlayScrollbarsComponent>
	</div>
	<div class="flex justify-center items-center w-[90%] h-[45px] m-auto">

	<SecondAppButton on:click={() => dispatch('close')} caption="Ok" variant="default"/>
	</div>
</div>

<style lang="scss">
    :global(.os-scrollbar){
        --os-size: 10px;
        --os-padding-perpendicular: 1px;
        --os-padding-axis: 1px;
        --os-track-border-radius: 6px;
        --os-handle-border-radius: 10px;
        --os-handle-bg: rgba(30, 30, 30, 1);
      --overlayscrollbars-height: 100%;
    }
    :global(.os-scrollbar-vertical) {
        margin-right: 5px;
    }
</style>
