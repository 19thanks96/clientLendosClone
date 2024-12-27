<script lang="ts">
    import {showPopUpStoreLayout} from '$lib/state/storePopup.state';
    import AppButton from '../common/AppButton.svelte';
    import ExitButton from '../common/ExitButton.svelte';
    import TimerToNewMission from '../common/CountdownTimer.svelte';
    import {StoreOfferType, TutorialSteps} from '../../../common/enums';
    import {AdapterCommunicationService} from '$lib/adapter-listener';
    import {playerState} from '$lib/state/player.state';
    import {goto} from '$app/navigation';
    import {base} from '$app/paths';
    import {StorePopUpMode} from '../../../types/storePopup.type';
    import {showPopUpLayout} from '$lib/state/popup.state';
    import {userBalanceBeforeRewardState} from '$lib/state/oldUserBalance.state';
    import UserBalance from '$lib/components/common/Money.svelte';
    import {handleTutorialStep} from "$lib/tutorial.service";
    import {removeBackgroundGlass} from "$lib/tutorial.utils";

    let isAnimationFinished = false
    let price = $showPopUpStoreLayout.price;
    const decreaseAmount = $showPopUpStoreLayout.price / 200;
    $: isEnoughCoins = $playerState.general.balance >= $showPopUpStoreLayout.price;
    $: buttonCaption = isEnoughCoins ? 'Buy' : 'Earn Coins';
    let interval: number;
    $: if ($showPopUpStoreLayout.purchaseSuccessful) {
        $showPopUpStoreLayout.isOpen = true;
        $showPopUpStoreLayout.description = 'Activate your bonus via notification';
    }
    let component: HTMLElement | null = null;

    const minusNumber = () => {
        price -= decreaseAmount;
        $showPopUpStoreLayout.balance -= decreaseAmount;
        if (price <= 0) {
            $showPopUpStoreLayout.balance = $userBalanceBeforeRewardState;
            price = 0
            clearInterval(interval);
        }
    };

    const holdReward = () => {
        if ($showPopUpStoreLayout.price !== 0 && price !== 0) {
            interval = setInterval(minusNumber, 10);
        }
    };
    const handleEarnCoinsAction = () => {
        handleClosePopup();
        if ($playerState.mg) {
            goto('/dm');
        } else if ($playerState.pb) {
            goto('/pb');
        } else {
            showPopUpLayout.set({
                name: 'Error',
                isOpen: true,
                description: 'Currently there\'s no options to earn coins',
                additionalText: 'Oops!',
                globalExit: true
            });
        }
    };

    const handleBuyAction = () => {
        if ($showPopUpStoreLayout.id === 'tutorialOffer') {
            AdapterCommunicationService.sendMessage({
                type: 'track',
                message: {type: 'clickTutorOfferS1BuyButton'}
            });
            $showPopUpStoreLayout.mode = StorePopUpMode.claim;
            handleTutorialStep(TutorialSteps.offerStep3)
        } else {
            $showPopUpStoreLayout.isLoading = true;
            AdapterCommunicationService.sendMessage({
                type: 'offerClaim',
                message: {offerId: $showPopUpStoreLayout.id}
            });
        }
        $userBalanceBeforeRewardState = $showPopUpStoreLayout.balance - $showPopUpStoreLayout.price;

    };

    $:if ($showPopUpStoreLayout.mode === StorePopUpMode.claim && !isAnimationFinished) {
        holdReward();
        isAnimationFinished = true
    }

    const handleClosePopup = () => {
        //#tutorial
        if ($showPopUpStoreLayout.id === 'tutorialOffer' && $playerState.tutorial?.step === 3 && !isEnoughCoins) {
            AdapterCommunicationService.sendMessage({
                type: 'hideTutorialHints',
            });
            removeBackgroundGlass();
            goto('/dm')
        }
        $showPopUpStoreLayout.isOpen = false;
        $showPopUpStoreLayout.name = '';
        $showPopUpStoreLayout.isLoading = false;
        $showPopUpStoreLayout.purchaseSuccessful = false;
        $showPopUpStoreLayout.description = '';
        $showPopUpStoreLayout.price = 0;
        $showPopUpStoreLayout.endDate = undefined;
        AdapterCommunicationService.sendMessage({type: 'hidePopup', message: 'click'});
    };

    const traceAnimationAndExit = () => {

        if ($showPopUpStoreLayout.id === 'tutorialOffer' && $playerState.tutorial?.step === 3) {
            AdapterCommunicationService.sendMessage({
                type: 'track',
                message: {type: 'clickTutorOfferS2ClaimButton'}
            });
            AdapterCommunicationService.sendMessage({
                type: 'tutorialProgress',
                message: {step: 3}
            });
            $playerState.tutorial.step = 4;
        }

        // trace animation, coins animation
        AdapterCommunicationService.sendMessage({
            type: 'offerAnimation',
            message: {
                componentPositions: component?.getBoundingClientRect()
            }
        });

        // setTimeout(() => {
        handleClosePopup();
        AdapterCommunicationService.sendMessage({type: 'exit', message: 'click'});
        // }, 2500);
    };

</script>


<div id="store-popup-backdrop" class="absolute flex justify-center items-center w-full h-full ">
    <div on:click={() => {
        if($showPopUpStoreLayout.mode !== StorePopUpMode.claim) {
            handleClosePopup()
        }
    }}
         style="background-image: url('https://p2w.imgix.net/resources/client/dm/Fx_Cmn_Overlay_Blue.png?auto=compress&auto=format'); aspect-ratio: 1/1;"
         class="land:w-[100vw] land:h-[100vw] port:w-[100vh] port:h-[100vh] z-[11] bg-[length:100%_100%] animate-rotation  "></div>
</div>
<div

        style={`background-image: url(https://p2w.imgix.net/resources/client/dm/Cmt_Cmn_Bg_Ovrl_Viloet.png?auto=compress&auto=format);`}
        class="w-[110%] h-[110%] bg-cover bg-no-repeat opacity-[0.8]  fixed z-[10]"></div>
<div class="z-[22]">
    <UserBalance balance={$showPopUpStoreLayout.balance}
                 img={`https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format`}/>
</div>
<div class="absolute max-h-[70vh] vhWidth-[535] port:max-h-[56.146vh] port:w-[74.352vw] z-[22] land:scale-75 translate-y-[10%]">
    <div class="w-full h-full  ml-[12.5%] port:mt-[-12%] port:ml-[8%] relative ">

    </div>
    <div style='border-image-source: url({`${base}/svg/Cmt_Str_Bg_PopUp_Secondary.svg`});'
         class="vhWidth-[450] port:w-[62.5vw] m-[auto] h-full bg-cover relative top-[-87%] port:top-[-91%] goods-popup flex flex-col items-center">
        <div
                style="background-image: url('https://p2w.imgix.net/resources/client/store/Cmt_Str_Bg_PopUp_Header.png?auto=compress&auto=format');"
                class="w-[100%] h-[28.5%] bg-[length:100%_100%] m-[-7vw] port:m-[-19vw] port:translate-y-[10%]   flex justify-center items-center ">
            <div class="w-[101%] port:w-[130%] port:h-[130%] h-[34%] absolute land:scale-[1.33]">
                {#if $showPopUpStoreLayout.mode !== StorePopUpMode.claim && ($showPopUpStoreLayout.id !== 'tutorialOffer' || !isEnoughCoins)}
                    <ExitButton on:click={handleClosePopup}
                                background={`https://p2w.imgix.net/resources/client/dm/Btn_Red_S.png?auto=compress&auto=format`}
                                image={`https://p2w.imgix.net/resources/client/dm/Icn_Close.png?auto=compress&auto=format`}/>
                {/if}
            </div>
            <div
                    style={`background-image: url(${$showPopUpStoreLayout.type === StoreOfferType.bonusCash ?  `https://p2w.imgix.net/resources/client/store/Icn_Str_Money.png?auto=compress&auto=format)` : `https://p2w.imgix.net/resources/client/store/Icn_Str_Slot.png?auto=compress&auto=format)`};`}
                    class="relative vhWidth-[317] port:w-[24.74vh] port:h-[24.74vh] mt-[-6vh] vhHeight-[317] bg-[length:100%_100%] z-[1] land:translate-y-[-15.5%] port:translate-y-[-10.5%] ">
                <div
                        style="background-image: url('https://p2w.imgix.net/resources/client/sc/FX_Stars_Left.png?auto=compress&auto=format')"
                        class="absolute h-1/3 w-1/3  bg-contain z-[1]">
                </div>
                <div
                        style="background-image: url('https://p2w.imgix.net/resources/client/sc/FX_Stars_Right.png?auto=compress&auto=format');"
                        class="absolute h-1/3 w-1/4 right-[-5%] top-[16%] bg-contain z-[1]">
                </div>
            </div>
            <div
                    style="background-image: url('https://p2w.imgix.net/resources/client/store/Img_Str_Bg_PopUp_Money.png?auto=compress&auto=format'); "
                    class="absolute self-end w-[90%] mb-[1vh] vhHeight-[97] bg-[length:100%_100%] land:translate-y-[-55%] port:translate-y-[-20.5%]"></div>
        </div>
        <div
                style="background-image: url('https://p2w.imgix.net/resources/client/store/Img_Str_Bg_PopUp_Title.png?auto=compress&auto=format'); "
                class="w-[120%] h-[10vh] bg-[length:100%_100%] mt-[12.5%] port:mt-[22.5%] flex justify-center z-[1]">
            <div style="text-shadow: 0px 4.01543px 0px #151413;"
                 class="font-['Fira_Sans'] mt-[3%] port:mt-[2%] vhFont-[42] text-[#FFFFFF] text-center font-[900]">{$showPopUpStoreLayout.name}</div>
        </div>
        {#if $showPopUpStoreLayout.endDate && $showPopUpStoreLayout.mode !== StorePopUpMode.claim}
            <div
                    style="border-image-source: url(https://p2w.imgix.net/resources/client/store/Cmt_Mb_Pnl_List_Description.png?auto=compress&auto=format);"
                    class="timer-bg vhWidth-[390] vhHeight-[54] port:w-[30.469vh] port:h-[4.219vh] bg-[length:100%_100%] flex justify-center items-center">
                <div
                        style="background-image: url('https://p2w.imgix.net/resources/client/store/Icn_Str_Clock.png?auto=compress&auto=format');"
                        class="vhWidth-[30] port:w-[2.344vh] port:h-[2.344vh] mr-[0.5vw] my-auto vhHeight-[30] bg-[length:100%_100%] ">
                </div>
                <div class="text-[#828896]  align-center vhFont-[26] leading-[1.2] font-[600] font-['Fira_Sans']  my-auto">
                    <TimerToNewMission dateEnd={$showPopUpStoreLayout.endDate}/>
                </div>
            </div>
        {/if}
        {#if $showPopUpStoreLayout.purchaseSuccessful}
            <div
                    class="text-center  max-h-[16vh] w-[90%] font-['Fira_Sans'] font-[900] text-[#6C717E] vhFont-[33] leading-[1.2] port:text-[2.813vh]">
                Purchase successful
            </div>
        {/if}
        <div style=" white-space: pre-line;"
             class="text-center {$showPopUpStoreLayout.purchaseSuccessful ? 'my-[6.5vh]' : $showPopUpStoreLayout.endDate ? 'mt-[3vh]' : 'mt-[1vh]'} px-[2vh] max-h-[16vh] w-[80%] font-['Fira_Sans'] font-[600] text-[#6C717E] scroll-store-popup touch-pan-y overflow-y-auto vhFont-[28] port:text-[2.188vh] ">
            {$showPopUpStoreLayout.description}
        </div>
        {#if $showPopUpStoreLayout.price && $showPopUpStoreLayout.mode !== StorePopUpMode.claim}
            <div class="max-h-[10vh] mt-[2vh] flex flex-col justify-center items-center">
                {#if !isEnoughCoins && !$showPopUpStoreLayout.purchaseSuccessful}
                    <div
                            class="text-[#F25151] flex items-center justify-center flex-col font-['Fira_Sans'] font-[600] vhFont-[28] port:text-[2.188vh]  ">
                        Not enough coins!
                    </div>
                {/if}
                <div style=" filter: drop-shadow(0px 0px #151413); -webkit-text-stroke: 0.1vw #151413; "
                     class="font-['Fira_Sans'] font-[900] vhFont-[38] text-[#FFFFF7] leading-[1.2] flex justify-center items-center  ">
                    <div
                            style="background-image: url('https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format');"
                            class="vhWidth-[46] vhHeight-[46] bg-[length:100%_100%] ">
                    </div>
                    <span class='{!isEnoughCoins && !$showPopUpStoreLayout.purchaseSuccessful ? "text-[#F25151]" : "" }'>
                            {$showPopUpStoreLayout.price}
                        </span>
                </div>
            </div>
        {/if}
        <div bind:this={component}
             class="w-[68%] vhFont-[36] port:text-[3.148vw] h-[7vh] mt-[2vh] mb-[5.5vh] port:mb-[4vh] port:w-[87%] port:h-[7vh] flex justify-center items-center animation-offer">
            {#if $showPopUpStoreLayout.mode === StorePopUpMode.view}
                <div id="sorePopUpBuyButton" class="w-full h-full  flex justify-center items-center">
                    <AppButton on:click={isEnoughCoins ? handleBuyAction : handleEarnCoinsAction} bigButton={true}
                               caption={buttonCaption}
                               isLoading={$showPopUpStoreLayout.isLoading}
                               isActive={true}
                               color={'green'}></AppButton>
                </div>
            {/if}
            {#if $showPopUpStoreLayout.mode === StorePopUpMode.claim}
                <div id="sorePopUpClaimButton" class="h-full w-full flex justify-center items-center">
                    <AppButton on:click={traceAnimationAndExit} bigButton={true}
                               caption="Claim"
                               isActive={true}
                               color={'green'}></AppButton>
                </div>
            {/if}
        </div>
    </div>
</div>


<style>
    .animate-rotation {
        animation: rotation 10s linear infinite;
    }

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .goods-popup {
        border-image-slice: 90 fill;
        border-image-width: 4vw;
        border-image-outset: 0px;
        border-image-repeat: stretch;
    }

    @media (orientation: portrait) {
        .goods-popup {
            border-image-width: 8vw;
        }
    }

    .timer-bg {
        border-image-slice: 27 fill;
        border-image-width: 1vw;
        border-image-outset: 0px;
        border-image-repeat: stretch;
    }

    @media (orientation: portrait) {
        .goods {
            right: 10vw;
        }

        .timer-bg {
            border-image-width: 4vw;
        }
    }


    .scroll-store-popup::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: #9F8A6CB2;
        overflow: hidden;
    }

    .scroll-store-popup::-webkit-scrollbar {
        border-radius: 10px;
        width: 0.8vw;
        background-color: none;
    }

    .scroll-store-popup::-webkit-scrollbar-thumb {
        background-image: linear-gradient(to right, #E4DBBEE5, #FDFCF3, #E4DBBEE5);
        border-image: linear-gradient(to bottom, #E4DBBEE5, #FDFCF3, #E4DBBEE5) 1;
        border-radius: 10px;
    }

    @media (orientation: portrait) {

        .scroll-store-popup::-webkit-scrollbar {
            border-radius: 10px;
            width: 1.5vw;
        }
    }
</style>
