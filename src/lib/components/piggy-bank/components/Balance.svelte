<script lang="ts">
import smallCoin from "$lib/components/piggy-bank/images/smallCoin.svelte?raw";
import {goto} from "$app/navigation";
import {playerState} from "$lib/state/player.state";

export let balance:number

$:isClickable = $playerState.store && (!$playerState.tutorial || $playerState.tutorial && $playerState.tutorial.step === 4)

$:console.log(isClickable)

const onClickBalance = async () => {
    if (isClickable) {
        await goto('/store')
    }
}

</script>
<div class="balance" on:click={onClickBalance}>
    <span class="balance__inner__bar"></span>
    <span class="balance__icon">{@html smallCoin}</span>
    <span class="balance__amount">{balance}</span>
</div>


<style>
    .balance{
        position: absolute;
        top: 2%;
        left: 2%;
        background-image: linear-gradient(to bottom, rgba(17, 13, 25, 0.8), rgba(17, 6, 27, 0.65));
        box-shadow: 0 2px 2px rgba(17, 13, 25, 0.5),
        2px 0 2px rgba(17, 13, 25, 0.5),
        -2px 0 2px rgba(17, 13, 25, 0.5),
        0 -2px 2px rgba(17, 13, 25, 0.5),
        0 2px 2px rgba(0, 0, 0, 0.25);
        border-radius: 15px;
        height: 20px;
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .balance__icon{
        position: absolute;
        left: -15%;
        top: -25%;
    }
    .balance__inner__bar{
        position: absolute;
        top: 2%;
        left: 2%;
        height: 10px;
        width: 75px;
        border-radius: 15px;
        background-image: linear-gradient(to bottom, rgba(201, 249, 255, 0.4), rgba(173, 219, 255, 0.2),rgba(201, 249, 255, 0.15));
    }
    .balance__amount{
        color: rgba(255, 255, 247, 1);
        font-family: "Fira Sans", sans-serif;
        font-weight: 900;
        -webkit-text-stroke: 0.5px rgba(62, 58, 55, 1);
        text-shadow: 0 2px rgba(21, 20, 19, 1);
        padding-left: 10px;
    }

    @media screen and (max-width: 450px) {
        .balance{
            left: 4%;
            height: 15px;
            width: 70px;
        }
        .balance__inner__bar{
            width: 65px;
        }
        .balance__icon{
            top: -20%;
        }
        .balance__amount{
            font-size: 12px;
        }
    }
</style>