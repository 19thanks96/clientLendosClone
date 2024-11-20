<script lang="ts">
import minus from "$lib/components/piggy-bank/images/minus.svelte?raw";
import plus from "$lib/components/piggy-bank/images/plus.svelte?raw";
import smallCoin from "$lib/components/piggy-bank/images/smallCoin.svelte?raw";
import {pbState} from "$lib/state/pb.state";
import {playerState} from "$lib/state/player.state";
import {AdapterCommunicationService} from "$lib/adapter-listener";

//#Tutorial
let isSendTutorialRequest = false;


const increaseDesiredHoldAmount = () => {
    const holdDepositCeil = $pbState?.bankRemainingBalance > $playerState?.general?.balance
        ? $playerState?.general?.balance
        : $pbState.bankRemainingBalance;

    if ($pbState.desiredHoldDepositAmount > holdDepositCeil) {
        $pbState.desiredHoldDepositAmount = holdDepositCeil
    }

    //#tutorial
    if($playerState?.tutorial && $playerState?.tutorial.step===2){
      $pbState.desiredHoldDepositAmount += $pbState.step * 5;
        AdapterCommunicationService.sendMessage({
            type: 'track',
            message: {type: 'clickTutorPbS1PlusButton'}
        });
    } else {
      $pbState.desiredHoldDepositAmount += $pbState.step;

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
            return;
        }
        $pbState.desiredHoldDepositAmount -= $pbState.step;
        $pbState.desiredHoldDepositAmount = $pbState.desiredHoldDepositAmount < 0
            ? 0
            : $pbState.desiredHoldDepositAmount;
    }
}

</script>

<div class="addCoins">
    <button class="addCoins__button" on:click={decreaseDesiredHoldAmount}>
        <span class="addCoins__button__inner"></span>
        <span class="addCoins__icon">
                    {@html minus}
                </span>
    </button>
    <div class="addCoins__amount">
        {@html smallCoin}
        <span class="addCoins__amount__text">{$pbState.desiredHoldDepositAmount}</span>
    </div>
    <button id="increasePbButton" class="addCoins__button" on:click={increaseDesiredHoldAmount}>
        <span class="addCoins__button__inner"></span>
        <span class="addCoins__icon">
                    {@html plus}
         </span>
    </button>
</div>

<style>
    .addCoins{
        height: 45px;
        width: 310px;
        background-color:rgba(248, 255, 255, 1);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 5px;
        position: relative;
    }
    .addCoins__amount{
        display: flex;
        align-items: center;
        gap: 5px;
    } 
    .addCoins__icon{
        position: absolute;
        top: 25%;
        right: 20%;
    }
    .addCoins__amount__text{
        font-size: 28px;
        color: rgba(255, 255, 247, 1);
        font-family: "Fira Sans", sans-serif;
        font-weight: 900;
        -webkit-text-stroke: 1.5px rgba(62, 58, 55, 1);
        text-shadow: 0 3px rgba(21, 20, 19, 1);
        letter-spacing: -1px;
    }

    .addCoins__button{
        border: none;
        height: 35px;
        width: 35px;
        border-radius: 15px;
        background-image: linear-gradient(to bottom, rgba(49, 112, 238, 1), rgba(56, 83, 200, 1), rgba(40, 205, 249, 1));
        box-shadow: 0 3px 4px rgba(38, 35, 188, 0.5),
        0 6px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        position: relative;
    }
    .addCoins__button__inner{
        position: absolute;
        height: 17px;
        width: 25px;
        top: 10%;
        right: 15%;
        border-radius: 9px;
        background-image: linear-gradient(to bottom, rgba(141, 203, 255, 1),rgba(103, 143, 255, 1), rgba(69, 95, 214, 1));
    }
    @media screen and (max-width: 450px) {
        .addCoins{
            height: 30px;
            width: 250px;
        }
        .addCoins__amount__text{
            font-size: 20px;
        }
        .addCoins__button{
            height: 20px;
            width: 25px;
            margin-bottom: 1px;
        }
        .addCoins__button__inner{
            height: 12px;
            width: 17px;
        }
        .addCoins__icon{
            top: 20%;
            right: 20%;
        }
    }
</style>