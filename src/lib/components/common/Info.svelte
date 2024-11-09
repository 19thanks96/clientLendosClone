<script lang="ts">
	import PopUpPrivacyAndTerms from '../store/PopUpPrivacyAndTerms.svelte';
	import { showPopUpLayout } from '$lib/state/popup.state';
	import { AdapterCommunicationService } from '$lib/adapter-listener';
	import { playerState } from '$lib/state/player.state';

	export let background: string;
	export let image: string;
	export let bgPopup: string;
	export let text: string;



	function openPopup() {
		let isClickable = $playerState.pb.info && (!$playerState.tutorial || $playerState.tutorial && $playerState.tutorial.step === 4)
		if (isClickable) {

		$showPopUpLayout.isOpen = true;
		$showPopUpLayout.name = 'Info';
		$showPopUpLayout.description = text;
		AdapterCommunicationService.sendMessage({ type: 'openPopup', message: 'click' });
		}
	}
</script>

<span on:click={openPopup} style="background-image: url({background});"
			class=" terms absolute bottom-[1.19792vw] left-[1.19792vw] port:left-[2.037vw] port:bottom-[2.037vw] cursor-pointer  vwWidth-[80] vwHeight-[80] port:w-[7.407vw] port:h-[7.407vw] bg-cover  z-[10]"><img
	class='m-[25%]  vwWidth-[40] vwHeight-[40] port:w-[3.704vw] port:h-[3.704vw] ' src={image} alt="terms" /></span>




