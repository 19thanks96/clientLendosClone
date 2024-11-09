<script lang="ts">
	import { base } from '$app/paths';
	import { showPopUpLayout } from '$lib/state/popup.state';
	import { t } from '$lib/i18n/config';

	import AppButton from '../common/AppButton.svelte';
	import ExitButton from '../common/ExitButton.svelte';
	import { AdapterCommunicationService } from '$lib/adapter-listener';

	export let background: string;

	function closePopup() {
		$showPopUpLayout = { isOpen: false, name: '', description: '' };
		AdapterCommunicationService.sendMessage({ type: 'hidePopup', message: 'click' });
	}

</script>


{#if $showPopUpLayout}
	<div on:click={closePopup}
			 style="background-image: url({`${base}/newImg/Cmt_Cmn_Bg_Ovrl_Defult.png`}); background: radial-gradient(31.13% 50% at 50% 50%, rgba(40, 113, 223, 0.70) 0%, rgba(8, 25, 57, 0.70) 81.44%); backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(20px); transform: translate(-5%, -5%);"
			 class="w-[110%] h-[110%] blur-[40px] top-[-2.5%] bottom-[-2.5%] left-[-2.5%] right-[-2.5%]  bg-cover bg-no-repeat opacity-[0.8] fixed z-[21]"></div>
	<div style="transform: translate(-50%, -50%);"
			 class="absolute left-[50%] top-[32.5%] vhHeight-[513] vwWidth-[321] port:h-[56.146vh] port:w-[74.352vw] z-[22]">
		<div class="w-full h-full mt-[-15.9%] ml-[18.8%] port:mt-[-12%] port:ml-[5%] relative">
			<ExitButton on:click={closePopup}
									background={`https://p2w.imgix.net/resources/client/dm/Btn_Red_S.png?auto=compress&auto=format`}
									image={`https://p2w.imgix.net/resources/client/dm/Icn_Close.png?auto=compress&auto=format`} />
		</div>
		<div style="border-image-source: url({`${base}/newImg/Cmt_Str_Bg_PopUp_Secondary.svg`});"
				 class="vwWidth-[321] port:w-[62.5vw] m-[auto] h-full bg-cover relative top-[-88.3%] port:top-[-91%] privacy-popup flex flex-col items-center">
			<div
				style="background-image: url('https://p2w.imgix.net/resources/client/store/Img_Str_Bg_PopUp_Title.png?auto=compress&auto=format');"
				class="w-[120%] h-[15%] port:h-[15%] bg-[length:100%_100%] mt-[7.5%] flex justify-center ">
				<div style="
				-webkit-text-stroke-width: thin;
				-webkit-text-stroke-color: #3E3A37 ;
                font-weight: 600;
                text-align: center;
                color: #FFFFFF;
                text-shadow: 0px 2px 0px #151413;
                "
						 class="font-['Fira_Sans'] land:m-auto land:w-full land:h-[80%] port:mt-[2%] vhFont-[30.5] port:text-[6.2vw]">
					{#if $showPopUpLayout.name === 'Privacy policy'}{$t('store.txt_hd_tc')}{:else}{$showPopUpLayout.name}{/if}
				</div>
			</div>
			<div style="
            font-family: 'Fira Sans';
            font-style: normal;
            font-weight: 600;
            color: #6C717E;
            overflow-y:auto;
						text-align: center;
            touch-action: pan-y;
            white-space: pre-line;
            "
					 class="pr-[15%] port:pr-[15%] max-h-[58%] pt-[3%] port:max-h-[58%] scroll-privacy vhFont-[15] leading-[1.2] port:text-[2.963vw] port:pt-[3%] port:leading-[1.28]">{$showPopUpLayout.description}</div>
			<div class="   w-[69%] h-[9%] absolute bottom-[8%] port:bottom-[8%] vhFont-[19]  port:text-[3.963vw]">

				<AppButton caption={'Ok'} on:click={closePopup} isActive={true} color={'green'} bigButton={false}></AppButton>
			</div>
		</div>

	</div>
{/if}
<style>
    .privacy-popup {
        border-image-slice: 90 fill;
        border-image-width: 2vw;
        border-image-outset: 0px;
        border-image-repeat: stretch;
    }

    .scroll-privacy {
        border-bottom-right-radius: 5vh;
        margin-right: -7.7%;
        margin-left: 10.4%;
        width: 95.2%;
    }

    .scroll-privacy::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.7);
        border-radius: 10px;
        border-color: rgba(0, 0, 0, 0.7);
        background-color: rgba(0, 0, 0, 0.2);
        margin: 1vw 0 -4.5vw 0;

    }

    .scroll-privacy::-webkit-scrollbar {
        border-radius: 10px;
        width: 10px;
        height: 10px;
        background-color: none;
        overflow: hidden;
    }

    .scroll-privacy::-webkit-scrollbar-thumb {
        border-radius: 0.2vw;
        -webkit-box-shadow: inset 0px 0px 10px 5px rgba(0, 0, 0, .3);
        /*background-image: linear-gradient(to right, #E4DBBEE5, #FDFCF3, #E4DBBEE5);*/
        /*border-image: linear-gradient(to bottom, #E4DBBEE5, #FDFCF3, #E4DBBEE5) 1;*/
        height: 10px;
        width: 110%;
        background: #FF1C0E;
        background: #FF1C0E;
        box-shadow: 0px 4px 0px #CB170C, 0px 8px 8px rgba(0, 5, 23, 0.5), inset 4px 4px 4px rgba(255, 121, 103, 0.5), inset -4px -4px 4px rgba(255, 165, 137, 0.3);
    }


    @media (orientation: portrait) {
        .privacy-popup {
            border-image-width: 8vw;
        }

        .scroll-privacy {
            margin-right: -11.2%;
            margin-left: 7.7%;
            width: 93%;
        }

        .scroll-privacy::-webkit-scrollbar {
            border-radius: 10px;
            width: 1.5vw;
        }

        .scroll-privacy::-webkit-scrollbar-thumb {
            border-radius: 0.5vw;
        }

        .scroll-privacy::-webkit-scrollbar-track {
            margin: 2vw 0 -18vw 0;
        }
    }
</style>