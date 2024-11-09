<script lang="ts">
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';
import curtain from "$lib/components/piggy-bank/images/curtain.svelte?raw";
import coin from "$lib/components/piggy-bank/images/coin.svelte?raw";
import multiplier from "$lib/components/piggy-bank/images/multiplier.svelte?raw";
import {onDestroy, onMount} from "svelte";
import multiplierMobile from "$lib/components/piggy-bank/images/multiplierMobile.svelte?raw";

export let currentBalance:number
export let maxBalance:number

const percentageFilled = tweened(0, {
    duration: 1500,
    easing: cubicOut
});
$: percentageFilled.set((currentBalance / maxBalance) * 100);


let width = 0;

function updateSize() {
    width = window.innerWidth;
}

onMount(() => {
    window.addEventListener('resize', updateSize);
    updateSize();
});

onDestroy(() => {
    window.removeEventListener('resize', updateSize);
})


</script>

<div class="curtain">
    {@html curtain }
    <div class="curtain__coin">
        {@html coin}
    </div>
    <div class="curtain__multiplier">
        <span class="curtain__multiplier__text">x2</span>
        {@html width > 500 ? multiplier : multiplierMobile}
    </div>
    <span class="curtain__count">{`${currentBalance}/${maxBalance}`}</span>
    <div class="curtain__progress">
        <div class="curtain__progress__bar" style="width: {$percentageFilled}%;" >
            <div class="curtain__inner__progress__bar"></div>
        </div>
    </div>
</div>


<style>

    .curtain{
        z-index: 1;
        height: 40px;
        margin: 10px;
        position: relative;
    }

    .curtain__progress, .curtain__count, .curtain__coin, .curtain__multiplier {
        position: absolute;
        color: rgba(255, 255, 247, 1);
        font-family: "Fira Sans", sans-serif;
        font-weight: 900;
        -webkit-text-stroke: 1px rgba(62, 58, 55, 1);
        text-shadow: 0 1px rgba(21, 20, 19, 1);
    }
    .curtain__progress {
        top: 90%;
        left: 33%;
        background: rgba(62, 32, 132, 1);
        border-radius: 5px;
        text-align: center;
        width: 170px;
        z-index: 1;
    }
    .curtain__progress__bar, .curtain__inner__progress__bar {
        border-radius: 5px;
        transition: 0.4s linear;
        transition-property: width, background-color;
    }
    .curtain__progress__bar {
        height: 30px;
        background-image: linear-gradient(to bottom, rgba(90, 21, 201, 1), rgba(164, 21, 252, 1), rgba(251, 32, 255, 1));
        width: 0;
        background-color: rgba(62, 32, 132, 1);
    }
    .curtain__inner__progress__bar {
        height: 15px;
        background-image: linear-gradient(to bottom, rgba(232, 170, 245, 1), rgba(164, 67, 252, 1), rgba(200, 118, 255, 1));
    }
    .curtain__count {
        top: 95%;
        left: 43%;
        z-index: 2;
        font-size: 18px;
        letter-spacing: -1px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
    }

    .curtain__coin {
        top: 75%;
        left: 30%;
        z-index: 2;
    }

    .curtain__multiplier {
        top: 75%;
        left: 65%;
        z-index: 2;
    }

    .curtain__multiplier__text {
        position: absolute;
        top: 10%;
        left: 25%;
        z-index: 3;
        font-size: 22px;
        -webkit-text-stroke: 1px rgba(62, 58, 55, 1);
        text-shadow: 0 1px 0rgba(21, 20, 19, 1);
    }
    @media screen and (max-width: 450px) {
        .curtain {
            margin: 0;
        }
        .curtain__progress{
            width: 120px;
            top: 110%;
        }
        .curtain__progress__bar{
            height: 20px;
        }
        .curtain__inner__progress__bar{
            height: 10px;
        }
        .curtain__multiplier__text{
            font-size: 14px;
            top: 15%;
            left: 30%;

        }
        .curtain__count{
            font-size: 14px;
            left: 37%;
            top: 110%;
        }
        .curtain__coin{
            top: 95%;
            left: 25%;
        }
        .curtain__multiplier{
            left: 70%;
            top: 95%;
        }
    }

</style>