<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { showPopUpLayout } from '$lib/state/popup.state';
	import AppButton from './AppButton.svelte';
	import ExitButton from '$lib/components/common/ExitButton.svelte';
	import { base } from '$app/paths';

	const dispatch = createEventDispatcher();
</script>

<div on:click={() => dispatch('close')}
		 style="background-image: url({`${base}/newImg/Cmt_Cmn_Bg_Ovrl_Defult.png`}); background: radial-gradient(31.13% 50% at 50% 50%, rgba(40, 113, 223, 0.70) 0%, rgba(8, 25, 57, 0.70) 81.44%); backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px);"
		 class="{$showPopUpLayout.isOpen ? 'visible' : 'hidden'} w-[150%] h-[150%]  fixed top-[-12.5%] bg-cover left-[-12.5%] opacity-90 z-[12] flex items-center justify-center"></div>
<div style="position: fixed;  left: 50%; transform: translate(-50%, -50%);"
		 class="{$showPopUpLayout.isOpen ? 'visible' : 'hidden'} absolute w-[18.5vw] min-h-[34vh] port:w-[70.2vw] top-[50%] port:top-[50%] port:min-h-[28vh] z-[13]">
	<div class="w-[116%] port:w-[112.8%] h-[6.8vh] port:h-[5.2vh] absolute  translate-y-[-100%]">
		<div class="absolute right-0 top-0  w-full h-full">
			<ExitButton on:click={() => dispatch('close')}
									background={`https://p2w.imgix.net/resources/client/dm/Btn_Red_S.png?auto=compress&auto=format`}
									image={`https://p2w.imgix.net/resources/client/dm/Icn_Close.png?auto=compress&auto=format`} />
		</div>
	</div>
	<div
		style={`border-image-source: url(${base}/newImg/Cmt_Str_Bg_PopUp_Secondary.svg);`}
		class="w-full h-full p-[4%] port:p-[5.5%] border-popup-bg">
		<div
			class="flex justify-around items-center rounded-[2.6vw] port:rounded-[4.63vw] port:gap-[5vw] gap-[2vw] flex-col w-full h-full border-popup-description">
			<div
				style={`background-image: url(https://p2w.imgix.net/resources/client/store/Img_Str_Bg_PopUp_Title.png?auto=compress&auto=format)`}
				class="w-[131%] port:w-[135%] port:h-[15vw] bg-[length:100%_100%] mt-[3%] h-[4vw] mb-[-2vh] port:mb-[-1.7vh] bg-no-repeat ">
				<div class="w-full h-[70%] port:h-[80%] flex justify-center items-center">
					<div style="-webkit-text-stroke: thin #3E3A37; filter:drop-shadow(0 0.3vw  #151413)"
							 class="vhFont-[30.5] port:text-[5.741vw] port:leading-[1] leading-[3.555vw] text-[#FFFFFF] font-black font-['Fira_Sans']  ">{$showPopUpLayout.name}</div>
				</div>
			</div>

			{#if $showPopUpLayout.additionalText}
				<div
					class="vhFont-[37] port:text-[4.7vw] port:leading-[6.32vw] leading-[3.555vw] text-center font-black text-[#C5683F] font-['Fira_Sans']">{$showPopUpLayout.additionalText}</div>
			{/if}
			<div style=" white-space: pre-line; font-weight: 600;"
					 class="vhFont-[15] text-left max-h-[28vh] port:max-h-[38.5vh] w-[85%] port:text-[2.963vw] mb-[1.7vw] port:mb-[7.9vw] port:mt-[2.7vw] port:leading-[1.1875] scroll-dm-popup text-[#6C717E]  font-['Fira_Sans'] overflow-y-auto touch-pan-y   pr-[1vw] leading-[1.2]  ">
				{$showPopUpLayout.description}
			</div>
			<div
				class=" h-[2.5vw] mb-[1.2vw] w-[66%] port:mb-[4.5vw] port:h-[9.259vw] port:w-[42.963vw] vhFont-[19] port:text-[3.704vw]">
				<AppButton isOpen={true} on:click={() => dispatch('close')} color="green" caption="Ok" />
			</div>
		</div>
	</div>
</div>

<style>
    .border-popup-bg {
        border-image-slice: 75 fill;
        border-image-width: 1.7vw;
        border-image-outset: 4px;
        border-image-repeat: stretch;
    }

    .border-popup-description {
        border-image-slice: 63 fill;
        border-image-width: 4vw;
        border-image-outset: 0px;
        border-image-repeat: stretch;
    }

    .scroll-dm-popup::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: #9F8A6CB2;
        overflow: hidden;
    }

    .scroll-dm-popup::-webkit-scrollbar {
        border-radius: 10px;
        width: 0.8vw;
        background-color: none;
    }

    .scroll-dm-popup::-webkit-scrollbar-thumb {
        background-image: linear-gradient(to right, #E4DBBEE5, #FDFCF3, #E4DBBEE5);
        border-image: linear-gradient(to bottom, #E4DBBEE5, #FDFCF3, #E4DBBEE5) 1;
        border-radius: 10px;
    }

    @media (orientation: portrait) {
        .border-popup-description,
        .border-popup-bg {
            border-image-width: 8vw;
        }

        .scroll-dm-popup::-webkit-scrollbar {
            border-radius: 10px;
            width: 1.5vw;
        }
    }
</style>
