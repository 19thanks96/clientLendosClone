<script lang="ts">

    const bg_bar_empty_full: string = `https://p2w.imgix.net/resources/client/pb/Cmt_Progress_Empty.png?auto=compress&auto=format`;

    const bg_bar_full: string = `https://p2w.imgix.net/resources/client/pb/Cmt_Progress_Full.png?auto=compress&auto=format`;
    const icn_coin: string = `https://p2w.imgix.net/resources/client/common/Icn_Coins_L.svg?auto=compress&auto=format`;
    const bg_icn_coin: string = `https://p2w.imgix.net/resources/client/common/Cmt_Hummer.svg?auto=compress&auto=format`;
    const icn_coin_s: string = `https://p2w.imgix.net/resources/client/common/Icn_Coins_S.svg?auto=compress&auto=format`;
    export let progress: number;

    export let intermediateMultiplierPercents: number = 50;
    export let finalMultiplierPercents: number = 100;
    export let intermediateUnlockPercents: number = 50;
    const formatNumber = (num: number) => {
        let formatted = num.toFixed(1).toString();
        if (formatted.endsWith('.0')) {
            formatted = formatted.slice(0, -2);
        }
        return parseFloat(formatted);
    }
</script>

<div class="w-full h-full flex items-center pbar relative "
     style="  border-image-source: url({bg_bar_empty_full}); ">
    <div class="mx-[3.4%] h-[57%] overflow-hidden" style="{`width: ${progress}%;` }">
        <div class="h-full w-[800px] pbar2"
             style="border-image-source: url({bg_bar_full});">

        </div>
    </div>
    <!--{#if intermediateMultiplierPercents < progress }-->
    <!--	<div style="transform:translate(-{intermediateUnlockPercents}%, -60%);  left: {intermediateUnlockPercents}%; top: 50%;" class="absolute h-full aspect-[1/1]">-->
    <!--	<div style="-->
    <!--	background-image: url({'https://p2w.imgix.net/resources/client/dm/FX_Overlay_Yellow.png?auto=compress&auto=format'});   aspect-ratio: 1/1;" class=" h-[150%] z-[10] bg-[length:100%_100%] animate-rotation  "></div>-->
    <!--	</div>-->
    <!--{/if}-->
    <div class="absolute bg-no-repeat flex justify-center bg-cover h-[90%] "
         style="background-image: url({bg_icn_coin});transform:translateX(-{intermediateUnlockPercents}%);  left: {intermediateUnlockPercents}%; aspect-ratio: 1/1;">
        <img src="{icn_coin_s}" class="absolute right-[-1%] bottom-0  w-[90%] h-[85%]" alt="coin"/>
        <span class="absolute bottom-[-10%] right-[0%] x_txt text-[0px]  w-[125%] text-end">
                <span class="vhFont-[36] port:text-[4vw]">
                    x
                </span>
                <span class="vhFont-[44] port:text-[5.741vw]">
                {formatNumber((intermediateMultiplierPercents + 100) / 100)}
                </span>
            </span>

    </div>
    <!--{#if  progress == 100 }-->
    <!--	<div style="transform:translate(-80%, -60%);  left: 100%; top: 50%;" class="absolute h-full aspect-[1/1]">-->
    <!--		<div style="-->
    <!--		background-image: url({'https://p2w.imgix.net/resources/client/dm/Fx_Cmn_Overlay_Blue.png?auto=compress&auto=format'});   aspect-ratio: 1/1;" class=" h-[150%] z-[10] bg-[length:100%_100%] animate-rotation  "></div>-->


    <!--	</div>-->
    <!--{/if}-->
    <div class="absolute right-0 bg-no-repeat flex justify-center bg-cover h-[105%] translate-x-[10%]"
         style="background-image: url({bg_icn_coin}); aspect-ratio: 1/1;">
        <img src="{icn_coin}" alt="big_coin" class="absolute right-[-1%] bottom-0  w-[90%] h-[95%]">
        <span class="absolute bottom-[-7%] right-[7%] text-[0px] x_txt  w-[125%] text-end ">
                <span class="vhFont-[44] port:text-[6vw]">
                   x
                </span>
                <span class="vhFont-[54] port:text-[7.037vw]">
									{formatNumber((finalMultiplierPercents + 100) / 100)}
								</span>
            </span>
    </div>
</div>


<style lang="scss">

  .animate-rotation {
    animation: rotation 10s linear infinite;
    filter: drop-shadow(0px 0px 10px violet);
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .pbar {
    border-image-slice: 50% fill;
    border-image-width: 100%;
    border-image-outset: 0;
    border-image-repeat: repeat;
  }

  .pbar2 {
    border-image-slice: 17 fill;
    border-image-width: 5vw;
    border-image-outset: 0;
    border-image-repeat: repeat;
  }

  .x_txt {
    /* X2 */
    font-family: 'Fira Sans';
    font-style: normal;
    font-weight: 900;
    /* identical to box height */
    background: white;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-stroke-color: #3E3A37;
    -webkit-text-stroke-width: thin;
    filter: drop-shadow(0 0.6vh #3E3A37);
    line-height: 1.2;
  }

  @media(orientation: portrait) {
    .pbar {
      border-image-slice: 25 fill;
      border-image-width: 5vw;
    }
    .x_txt {
      filter: drop-shadow(0 0.8vw #3E3A37);

    }
  }

</style>
