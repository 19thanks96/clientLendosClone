<script lang="ts">
    import {showPopUpStoreLayout} from '$lib/state/storePopup.state';
    import {StoreOfferType, TutorialSteps} from '../../../common/enums';
    import TimerToNewMission from '../common/CountdownTimer.svelte';
    import {formatNumber} from '$lib/utils.js';
    import {AdapterCommunicationService} from '$lib/adapter-listener';
    import {onMount} from 'svelte';
    import {base} from '$app/paths';
    import {StorePopUpMode} from '../../../types/storePopup.type';
    import type {StoreOffer} from '../../../common/models/store-offer.type';
    import {playerState} from '$lib/state/player.state';
    import {handleTutorialStep} from "$lib/tutorial.service";
    import {deselectItemsOnPage, removeBackgroundGlass} from "$lib/tutorial.utils";

    export let goodsArray: any;

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

    onMount(() => {
        let showcase = document.querySelector('.showcase');
        let bodySizes = document.body.getBoundingClientRect();
        let isDesktopOrientation = bodySizes.width > bodySizes.height;
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            if (!isDesktopOrientation && showcase) {
                showcase.style.width = '102.5%';
                showcase.style.padding = '0px';
                showcase.style.margin = '0 0 0 -0.5vw';
                showcase.style.borderBottomRightRadius = '7%';
                showcase.style.borderTopRightRadius = '0';
            }
        }
    });

</script>
<div style="scrollbar-gutter: stable; "
     class=" absolute overflow-hidden overflow-y-scroll scrolled touch-pan-y pr-[1.2vw] port:pr-[0.5vw]  scrollable h-[100.5%] port:h-[101%] w-[110%] port:w-[104%] rounded-[4vh] port:rounded-[5vw] content-start  flex flex-wrap gap-y-[2.3%]  port:gap-y-[2.5%] showcase">
    <div class="w-full h-[1%] port:h-[1%]"></div>
    { #each goodsArray as offer (offer.id)}
        <div style="flex: 1 1 100%;"
             class=" max-w-[33%] port:max-w-[33%] h-[27.75%] port:h-[27.75%] flex relative offer ">
            {#if offer.name && offer.price}
                <button id={offer.id} on:click={() => showStorePopUp(offer)}
                        style={`border-image-source: url(${base}/svg/Cmt_Str_Bg_Item.svg); justify-content: space-evenly; transform: translateX(-50%)`}
                        class="absolute left-1/2 case w-[80%] h-[92.5%] port:w-[82%] port:h-[94%] z-[2] flex  items-center flex-col">
                    <div style="color: #FFFFF7;"
                         class="font-['Fira_Sans'] land:translate-y-[-10%] z-[1] white-text-shade vhFont-[12] port:text-[1.354vh] leading-[1.2] text-center font-black land:mt-[0.5vh] w-[30%] h-[17.5%] flex justify-center items-center">
                        {offer.name}
                    </div>
                    <div
                            style={`background-image: url(${offer.type === StoreOfferType.bonusCash ?  `https://p2w.imgix.net/resources/client/store/Icn_Str_Money.png?auto=compress&auto=format)` : `https://p2w.imgix.net/resources/client/store/Icn_Str_Slot.png?auto=compress&auto=format)`}; color: #FFFFF7; `}
                            class="w-[69%] port:mb-[5%] h-[45%] port:w-[69%] port:h-[44.5%] bg-center scale-[1.3] mt-[-10%] bg-contain bg-no-repeat  flex justify-center  items-end  font-['Fira_Sans'] vhFont-[14.3] port:text-[1.563vh] leading-[1.2] text-center font-black ">
						<span
                                class="translate-y-[-25%] port:translate-y-[-10%] white-text-shade">{offer.reward ? offer.reward : '???'}</span>
                    </div>
                    <div
                            style={`background-image:url(https://p2w.imgix.net/resources/client/store/Cmt_Str_Bg_Item_Money.png?auto=compress&auto=format); border-bottom-right-radius: 20%; border-bottom-left-radius: 20%;`}
                            class="w-[90%] h-[20%] bg-cover flex justify-center items-center">
                        <div
                                style="background-image: url('https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format'); background-position: center center; aspect-ratio: 1/1"
                                class="h-[82.5%] bg-no-repeat bg-contain "></div>
                        <span
                                class="font-['Fira_Sans'] mt-[-0.15vw]  port:mt-[-0.3vw] white-text-shade text-[#FFFFF7] vwFont-[18]  port:text-[1.979vh] port:leading-[1.2] text-center font-black">{formatNumber(offer.price)}</span>
                    </div>
                </button>
            {/if}
            <div style={`background-size: 100% 200%; `}
                 class="absolute shelf overflow-hidden  bottom-[-3%] w-[104%] h-[27%] "></div>
            {#if offer.endDate}
                <div class="w-full flex justify-center">
                    <div
                            style={`border-image-source: url(${base}/newImg/timer.svg); box-shadow: 3px 0px 3px rgba(70, 19, 14, 0.3), -3px 0px 3px rgba(70, 19, 14, 0.3);`}
                            class="absolute bg-no-repeat bottom-[-4%] port:bottom-[-7%] w-[87%] port:w-[87%] h-[23%] port:h-[21.75%] flex justify-center z-[1] items-end red-rug">
                        <div style="-webkit-text-stroke: #870000 thin;"
                             class="mb-[0%] port:mb-[2%] font-['Fira_Sans'] port:text-[2.593vw] font-[900] vhFont-[13] leading-[1.2]  text-center text-[#F6EAC0]">
                            <TimerToNewMission dateEnd={offer.endDate}/>
                        </div>
                    </div>
                </div>
            {/if}
        </div>

    {/each}
    <!--	</div>-->
</div>


<style lang="scss">
  @media (orientation: landscape) {
    .showcase {
      border-bottom-right-radius: 3.6vw 9vw;

      .offer {
        &:nth-child(2),
        &:nth-child(5),
        &:nth-child(8),
        &:nth-child(11),
        &:nth-child(14),
        &:nth-child(17),
        &:nth-child(20) {
          .shelf {
            border-image-source: url('https://p2w.imgix.net/resources/client/store/Img_Str_Shelf.png?auto=compress&auto=format');
            border-image-slice: 90 fill;
            border-image-width: 2.5vw;
            border-image-outset: 1.5vw 0;
            border-image-repeat: stretch;
            width: 300%;
            background-position-x: left;
            transform: translateY(53%);
          }
        }
      }
    }
  }


  .case {
    border-image-slice: 90 fill;
    border-image-width: 4vw;
    border-image-outset: 0vw;
    border-image-repeat: stretch;
  }


  .red-rug {
    border-image-slice: 30 fill;
    border-image-width: 2vw;
    border-image-outset: 0;
    border-image-repeat: stretch;
  }

  .white-text-shade {
    -webkit-text-stroke-color: #3E3A37;
    -webkit-text-stroke-width: thin;
    text-shadow: 0 0.1vw #3E3A37;
    filter: drop-shadow(0vw 0.1vw rgb(21, 20, 19));
  }

  .scrollable::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    border-color: rgba(0, 0, 0, 0.7);
    background-color: rgba(0, 0, 0, 0.2);
    margin: 1vw 0 0vw 0;

  }

  .scrollable::-webkit-scrollbar {
    border-radius: 10px;
    width: 10px;
    height: 10px;
    background-color: none;
    overflow: hidden;
  }

  .scrollable::-webkit-scrollbar-thumb {
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
    .scrollable {
      margin-left: -0.8vw;
      margin-right: 2vw;
      padding-left: 0vw;
      padding-right: 4vw;
      width: 111%;
      border-bottom-right-radius: 12vw 22vw;
      border-top-right-radius: 12vw 22vw;
    }
    .white-text-shade {
      -webkit-text-stroke-color: #3E3A37;
      -webkit-text-stroke-width: thin;
      filter: drop-shadow(0vw 0.3vw #3E3A37);
    }
    .case {
      border-image-width: 9vw;
      border-image-outset: 0vw;
    }

    .red-rug {
      border-image-width: 2vw;
      -webkit-text-stroke: thin #870000;

    }

    .scrollable::-webkit-scrollbar {
      border-radius: 10px;
      width: 1.5vw;
    }

    .scrollable::-webkit-scrollbar-track {
      margin-bottom: 2vw;
      margin-top: 4vw;
    }
    .showcase {
      .offer {
        &:nth-child(2),
        &:nth-child(5),
        &:nth-child(8),
        &:nth-child(11),
        &:nth-child(14),
        &:nth-child(17),
        &:nth-child(20) {
          .shelf {
            border-image-source: url('https://p2w.imgix.net/resources/client/store/Img_Str_Shelf.png?auto=compress&auto=format');
            border-image-slice: 90 fill;
            border-image-width: 8.6vw;
            border-image-outset: 5vw 0;
            border-image-repeat: stretch;
            width: 300%;
            background-position-x: left;
            transform: translateY(65%);
          }

        }

        &:nth-last-child(even) {
          .shelf {
            border-bottom-right-radius: 5%;
          }
        }
      }
    }

  }

</style>
