<script lang='ts'>
    import ShowCase from './ShowCase.svelte'
    import {showPopUpStoreLayout} from '$lib/state/storePopup.state';
    import {showPopUpLayout} from '$lib/state/popup.state';

    import StorePopUp from './StorePopUp.svelte';
    import {t} from '$lib/i18n/config';
    import {base} from '$app/paths';
    import ExitButton from '$lib/components/common/ExitButton.svelte';
    import {AdapterCommunicationService} from '$lib/adapter-listener';
    import {playerState} from '$lib/state/player.state';
    import {handleTutorialStep} from "$lib/tutorial.service";
    import {TutorialSteps} from "../../../common/enums";
    export let exit: () => void;

    export let goodsArray;


    function openPopup() {
        $showPopUpLayout.isOpen = true;
        $showPopUpLayout.name = 'Info';
        $showPopUpLayout.description = $playerState.store.info;
        AdapterCommunicationService.sendMessage({type: 'openPopup', message: 'click'});
    }


</script>

<div class="flex content-start  flex-wrap justify-start flex-col w-full">
    <div class="w-full flex justify-center items-center flex-col ">
            <div style="background-image: url({base}/newImg/Img_Cmn_PopUp_Title_Red.png) " class="w-full bg-contain h-[18.7vw] bg-no-repeat bg-center absolute top-[27%] z-[3]">
                <div style=" background: linear-gradient(183.55deg, #FFF8D6 24.71%, #FFF618 54.13%, #FFCD03 58.46%, #FFF859 82.5%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-fill-color: transparent;  -webkit-text-stroke: thin #C60909;"
                     class=" mb-[14%]  port:mb-[15.5%] gap-[0.4vw] ml-[3%] port:ml-[4%] font-['Fira_Sans'] vwFont-[36] port:text-[7.109vw] gap-[0.1vw] port:gap-[1vw]  text-center font-black flex justify-center items-center title-text-shade absolute left-1/2 translate-x-[-50%]">
                    {$t('store.title')}
                    <button on:click={openPopup}
                            style="cursor: pointer; "
                            class="flex  justify-center items-center w-[3.8vh] port:w-[ 3vh]  h-[3.8vh] port:h-[3vh]  animation-info  scroll-auto">
                        <svg class="flex justify-center items-center w-full h-full " xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 33 35" fill="none">
                            <path
                              d="M16.1991 4.21875C24.01 4.21875 30.3435 10.5523 30.3435 18.3631C30.3435 26.174 24.01 32.5075 16.1991 32.5075C8.38823 32.5075 2.05469 26.174 2.05469 18.3631C2.05469 10.5523 8.38823 4.21875 16.1991 4.21875ZM16.1991 2.3125C7.34932 2.3125 0.148438 9.51336 0.148438 18.3631C0.148438 27.2129 7.34932 34.4138 16.1991 34.4138C25.0489 34.4138 32.2497 27.2129 32.2497 18.3631C32.2497 9.51336 25.0489 2.3125 16.1991 2.3125Z"
                              fill="#CC7B88"/>
                            <path
                              d="M16.1991 2.3125C24.01 2.3125 30.3435 8.64602 30.3435 16.4569C30.3435 24.2677 24.01 30.6013 16.1991 30.6013C8.38823 30.6013 2.05469 24.2677 2.05469 16.4569C2.05469 8.64602 8.38823 2.3125 16.1991 2.3125ZM16.1991 0.40625C7.34932 0.40625 0.148438 7.60711 0.148438 16.4569C0.148438 25.3066 7.34932 32.5075 16.1991 32.5075C25.0489 32.5075 32.2497 25.3066 32.2497 16.4569C32.2497 7.60711 25.0489 0.40625 16.1991 0.40625Z"
                              fill="url(#paint0_linear_952_1709)"/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M16.1991 2.3125C24.01 2.3125 30.3435 8.64602 30.3435 16.4569C30.3435 24.2677 24.01 30.6013 16.1991 30.6013C8.38823 30.6013 2.05469 24.2677 2.05469 16.4569C2.05469 8.64602 8.38823 2.3125 16.1991 2.3125Z"
                                  fill="url(#paint1_linear_952_1709)"/>
                            <path
                              d="M16.1991 2.78906C23.7468 2.78906 29.8669 8.90922 29.8669 16.4569C29.8669 24.0045 23.7468 30.1247 16.1991 30.1247C8.65143 30.1247 2.53125 24.0045 2.53125 16.4569C2.53125 8.90922 8.65143 2.78906 16.1991 2.78906Z"
                              stroke="#88001B" stroke-opacity="0.5" stroke-width="0.953125"/>
                            <image class="w-full h-1/2 translate-y-[20%]" href="{base}/newImg/i.svg"/>
                            <defs>

                                <linearGradient id="paint0_linear_952_1709" x1="3.72266" y1="3.74219" x2="28.0273"
                                                y2="31.3828"
                                                gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#F4D8DD"/>
                                    <stop offset="1" stop-color="#F6D1D7"/>
                                </linearGradient>
                                <linearGradient id="paint1_linear_952_1709" x1="2.05469" y1="16.6094" x2="30.1719"
                                                y2="16.6094"
                                                gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#FD1C3C"/>
                                    <stop offset="1" stop-color="#D41D41"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </button>
                </div>
            </div>
        <div style={`background-image: url(${base}/newImg/storeHeader.png); filter: drop-shadow(0vw 0.25vw 0.25vw rgb(21, 20, 19))`}
             class="z-[0] translate-y-[-10%] vwWidth-[447] land:mt-[-1.75vw] vwHeight-[200] port:w-[73vw]  port:h-[37vw] bg-contain bg-bottom bg-no-repeat flex justify-center items-end port:mt-[-2%] relative">

            <div class="h-[79%] w-[119.2%] port:w-[114%] port:h-[77%] absolute  pointer-events-none">
<!--                <ExitButton on:click={exit}-->
<!--                            background={`https://p2w.imgix.net/resources/client/dm/Btn_Red_S.png?auto=compress&auto=format`}-->
<!--                            image={`https://p2w.imgix.net/resources/client/dm/Icn_Close.png?auto=compress&auto=format`}/>-->
            </div>
        </div>

        <div style={`border-image-source: url(https://p2w.imgix.net/resources/client/store/Cmt_Str_Bg_PopUp_Main.png?auto=compress&auto=format);`}
             class="relative flex justify-start main-store vwWidth-[357] vwHeight-[570] port:w-[65vw] port:h-[75vw] rounded-[5%] ">
            <ShowCase {goodsArray}/>
        </div>
    </div>
</div>
{#if $showPopUpStoreLayout.isOpen}
    <StorePopUp/>
{/if}


<style>


    .main-store {
        border-image-slice: 118 fill;
        border-image-width: 3vw;
        border-image-outset: 1.05vw;
        border-image-repeat: stretch;
        margin-top: -0.5%;
    }

    .title-text-shade {
        filter: drop-shadow(0px 0.2vw 0px #8E1010);
    }

    @media (orientation: portrait) {
        .main-store {
            border-image-slice: 110 fill;
            border-image-width: 9vw;
            border-image-outset: 4vw;
            margin-top: -5vw;
        }

        .title-text-shade {
            filter: drop-shadow(0px 8.31193px 0px #8E1010);
        }
    }
</style>
