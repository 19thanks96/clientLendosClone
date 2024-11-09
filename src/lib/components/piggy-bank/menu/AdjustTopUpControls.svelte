<script lang="ts">
    import {pbState} from "$lib/state/pb.state";
    import {playerState} from "$lib/state/player.state";
    import {AdapterCommunicationService} from "$lib/adapter-listener";

    const btn_bet: string = `https://p2w.imgix.net/resources/client/common/Btn_Cmn_S_Blue_Up.png?auto=compress&auto=format`;
    const btn_bet_r: string = `https://p2w.imgix.net/resources/client/pb/Icon=Icn_Cmn_Plus.png?auto=compress&auto=format`;
    const btn_bet_l: string = `https://p2w.imgix.net/resources/client/pb/Icon=Icn_Cmn_Minus.png?auto=compress&auto=format`;

    const mini_coin: string = `https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format`;

    //#tutorial
    let isSendTutorialRequest = false;

    const increaseDesiredHoldAmount = () => {
        const holdDepositCeil = $pbState?.bankRemainingBalance > $playerState?.general?.balance
            ? $playerState?.general?.balance
            : $pbState.bankRemainingBalance;

        $pbState.desiredHoldDepositAmount += $pbState.step;
        if ($pbState.desiredHoldDepositAmount > holdDepositCeil) {
            $pbState.desiredHoldDepositAmount = holdDepositCeil
        }

        //#tutorial
        if($playerState.tutorial && $playerState.tutorial.step===2){
            AdapterCommunicationService.sendMessage({
                type: 'track',
                message: {type: 'clickTutorPbS1PlusButton'}
            });
        }

        if ($playerState.tutorial && $playerState.tutorial.step === 2 && $pbState.desiredHoldDepositAmount === $pbState.bankRemainingBalance) {
            if (isSendTutorialRequest) return;
            const holdPbButton = document.getElementById('pbHoldButton');
            const coordinates = holdPbButton?.getBoundingClientRect();
            AdapterCommunicationService.sendMessage({
                type: 'setTutorialCoordinates', message: {
                    element: 'holdPbButton',
                    coordinates: {
                        x: coordinates?.x || 0,
                        y: coordinates?.y || 0,
                        width: coordinates?.width || 0,
                        height: coordinates?.height || 0
                    }
                }
            })
            isSendTutorialRequest = true;
        }

    }

    const decreaseDesiredHoldAmount = () => {
        //#tutorial
        if ($playerState.tutorial && $playerState.tutorial.step === 2 && $pbState.desiredHoldDepositAmount === $pbState.bankRemainingBalance) {
            return;
        } else {
            if($playerState.tutorial && $playerState.tutorial.step===2){
                AdapterCommunicationService.sendMessage({
                    type: 'track',
                    message: {type: 'clickTutorPbS1MinusButton'}
                });
            }
            $pbState.desiredHoldDepositAmount -= $pbState.step;
            $pbState.desiredHoldDepositAmount = $pbState.desiredHoldDepositAmount < 0
                ? 0
                : $pbState.desiredHoldDepositAmount;
        }
    }

</script>

<div class=" bg-no-repeat flex  w-full  h-full rectangle">
    <button class="border-0 ml-[-1%]  translate-y-[8%]  h-full cursor-pointer my-auto"
            on:click={decreaseDesiredHoldAmount}>
        <div style="background-image: url('{btn_bet}'); "
             class="h-full aspect-[1/1] scale-[1.2] bg-contain bg-no-repeat ">
            <div class="flex justify-center items-center w-full h-[85%]">
                <img src={btn_bet_l} class="w-[45%]" alt="minus image"/>
            </div>
        </div>
    </button>


    <div class=" relative flex justify-center items-center w-full h-full ">
        <div class="h-full flex justify-center items-center">
            <img src="{mini_coin}" class="aspect-[1/1] h-full" alt="mini_coin"/>
        </div>
        <p class="wh_txt  text-[0px]">
            <span class="vhFont-[38] port:text-[2.76vh] leading-[1.2]">{$pbState.desiredHoldDepositAmount}</span>
            <span class="vhFont-[38] port:text-[2.76vh] leading-[1.2]">/</span>
            <span class="vhFont-[38] port:text-[2.76vh] leading-[1.2]">{$pbState.bankRemainingBalance}</span>
        </p>
    </div>


    <button id="increasePbButton" class="border-0 mr-[-1%] translate-y-[8%]  h-full cursor-pointer  my-auto"
            on:click={increaseDesiredHoldAmount}>
        <div style="background-image: url('{btn_bet}'); "
             class="h-full aspect-[1/1] scale-[1.2] bg-contain bg-no-repeat ">
            <div class="flex justify-center items-center w-full h-[85%]">
                <img src={btn_bet_r} class="w-[45%]" alt="plus image"/>
            </div>
        </div>
    </button>
</div>

<style>
    .wh_txt {


        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 900;

        line-height: 1.1;

        background: white;
        color: transparent;
        -webkit-background-clip: text;
        -webkit-text-stroke-color: #000000;
        -webkit-text-stroke-width: 0.05vw;
        filter: drop-shadow(1px 2px #333);
        line-height: 0.75;

    }

    .rectangle {
        background: rgba(9, 26, 27, 0.1);
        box-shadow: 0px 2px 0px rgba(196, 201, 199, 0.8), inset 0px 2px 4px rgba(131, 142, 136, 0.8);
        border-radius: 20px;
        width: 100%;

    }

    @media (orientation: portrait) {
        .wh_txt {
            -webkit-text-stroke-width: 0.15vw;

        }

    }
</style>
