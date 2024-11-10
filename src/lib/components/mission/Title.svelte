<script lang="ts">
    import {base} from '$app/paths';
    import {showPopUpLayout} from '$lib/state/popup.state';
    import {AdapterCommunicationService} from '$lib/adapter-listener';
    import PopUpPrivacyAndTerms from '$lib/components/store/PopUpPrivacyAndTerms.svelte';
    import {playerState} from "$lib/state/player.state";

    let img = `${base}/newImg/Img_Cmn_PopUp_Title_Red.png`;
    export let description: string;
    export let text: string;

    function openPopup() {
        if (!!description) {
            $showPopUpLayout.isOpen = true;
            $showPopUpLayout.name = 'Info';
            $showPopUpLayout.description = description;
            AdapterCommunicationService.sendMessage({type: 'openPopup', message: 'click'});
        }
    }
</script>


<div style="background-image: url({img});"
     class="z-[5] h-[20%] scale-[118%] port:scale-[118.5%] w-full absolute top-[-5%] port:top-[-2.6%] overflow-hidden bg-contain bg-no-repeat pointer-events-none">
    <div
            class=" top-0 h-[47.5%] land:pl-[1.875vw] land:mt-[-0.5%] port:pl-[4.63vw] flex flex-row justify-center port:mt-[0.75%] items-center pointer-events-auto">

        <div class=" header-main-block-text  land:h-[7vh] port:mt-[-1%] flex flex-row justify-center items-center p-1">
            <span class="land:tracking-[-1.4px]">{text}</span>
        </div>

            <button on:click={openPopup}
                    style="touch-action: auto; "
                    class="flex justify-center items-center w-[3.2vh]  h-[3vh] ml-[5px] animation-info  scroll-auto">
                <svg class="flex justify-center items-center w-full h-full land:mt-[20%]"
                     xmlns="http://www.w3.org/2000/svg"
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

                        <linearGradient id="paint0_linear_952_1709" x1="3.72266" y1="3.74219" x2="28.0273" y2="31.3828"
                                        gradientUnits="userSpaceOnUse">
                            <stop stop-color="#F4D8DD"/>
                            <stop offset="1" stop-color="#F6D1D7"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_952_1709" x1="2.05469" y1="16.6094" x2="30.1719" y2="16.6094"
                                        gradientUnits="userSpaceOnUse">
                            <stop stop-color="#FD1C3C"/>
                            <stop offset="1" stop-color="#D41D41"/>
                        </linearGradient>
                    </defs>
                </svg>
            </button>

    </div>
</div>


<style lang="scss">

  .header-main-block-text {

    font-family: 'Fira Sans';
    font-style: normal;
    font-weight: 900;
    font-size: 3.333vh;
    line-height: 3.981vh;
    text-align: center;


    background: linear-gradient(181.3deg, #FFFF71 30.91%, #FCE000 46.39%, #FCE000 51.6%, #F2B40D 52.06%, #F5CF18 63.15%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;


    filter: drop-shadow(0px 0.25vw 0px #8E1010);
  }


  @media (orientation: portrait) {
    .header-main-block-text {
      -webkit-text-stroke-color: #C60909;
      -webkit-text-stroke-width: thin;
      font-size: 6vw;
      line-height: 4vh;
      filter: drop-shadow(0.1vw 0.5vw #8E1010);
      font-family: 'Fira Sans';
      font-style: normal;
      font-weight: 900;
      text-align: center;
      background: linear-gradient(181.3deg, #FFFF71 30.91%, #FCE000 46.39%, #FCE000 51.6%, #F2B40D 52.06%, #F5CF18 63.15%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }


</style>