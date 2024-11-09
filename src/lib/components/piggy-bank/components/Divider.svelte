<script lang="ts">
import smallCoin from "$lib/components/piggy-bank/images/smallCoin.svelte?raw";
import placecoins from "$lib/components/piggy-bank/images/placecoins.svelte?raw";
import placecoinsMobile from "$lib/components/piggy-bank/images/placecoinsMobile.svelte?raw";
import {onDestroy, onMount} from "svelte";

export let amount:number;

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



<div class="line"></div>
    <div class="placeForCoins">
        <div class="backgroundForCoins">
            {@html width > 500 ? placecoins : placecoinsMobile}
        </div>
      <div class="smallCoin">
                {@html smallCoin}
        <span class="smallCoin__text">{amount}</span>
     </div>
</div>


<style>
    .line{
        position:absolute;
        top: -5%;
        height: 5px;
        width: 380px;
        z-index: 1;
        background-image: url("/src/lib/components/piggy-bank/images/line.svg");
    }
    .backgroundForCoins{
        position: absolute;
        z-index: -1;
    }
    .placeForCoins{
        position: absolute;
        top: -45%;
        right: 35%;
        width: 110px;
        height: 110px;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .smallCoin{
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 3px;
        gap: 5px;
        margin-top: 2px;
    }
    .smallCoin__text{
        font-size: 24px;
        margin-right: 10px;
        margin-bottom:3px;
        color: rgba(255, 255, 247, 1);
        font-family: "Fira Sans", sans-serif;
        font-weight: 900;
        -webkit-text-stroke: 1.5px rgba(62, 58, 55, 1);
        text-shadow: 0 2px rgba(21, 20, 19, 1),
        0 3px rgba(21, 20, 19, 1);
        letter-spacing: -1px;
    }

    @media screen and (max-width: 450px) {
        .line{
            width: 280px;
            left: 3%;
            top: 0;
        }
        .placeForCoins{
            width: 80px;
            height: 80px;
            background-size: 80px 80px;
            top: -35%;
            right: 35%;
        }
        .smallCoin__text{
            font-size: 17px;
            margin-bottom: 2px;
            -webkit-text-stroke: 1.5px rgba(62, 58, 55, 1);
            text-shadow: 0 0 rgba(21, 20, 19, 1),
            0 0 rgba(21, 20, 19, 1);
        }
        .smallCoin__text::before{
            -webkit-text-stroke: 0 rgba(62, 58, 55, 1);
            text-shadow: 0 0 rgba(21, 20, 19, 1),
            0 0 rgba(21, 20, 19, 1);
        }
    }
</style>