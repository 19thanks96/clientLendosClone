<script lang="ts">
    import {formatNumber} from '$lib/utils';

    export let money: string;
    export let IcnCoin: string;

    let frontMoney = formatNumber(money);

    export let id;

</script>

<div id={id} style="" class="flex flex-col w-[29%] port:w-[29%] h-full   justify-around text-left grow-0">
    <div class=" text-[#989180] flex justify-center items-center ">
        <div
                class="flex relative reward-block-shade justify-center items-center   vhHeight-[21] port:h-[4.074vw] font-['Fira_Sans'] font-black vhFont-[17] port:text-[2.778vw]  text-[#B7B097] port:w-[31.111vw]">


            <div
                    style="background-image: url('{IcnCoin}'); background-position: center center; aspect-ratio: 1/1.04; background-size: 100% 100%;"
                    class=" mx-[0.26vw] port:mx-[0.463vw] h-[97.5%] port:h-[105%] bg-no-repeat  "></div>
            <span
                    class=" font-['Fira_Sans'] shade-numbers font-black vhFont-[17.48] leading-[1.2] port:text-[3.333vw] port:leading-[1.2] text-slate-200">{frontMoney}</span>

        </div>
    </div>
    <div
            class=" flex vwHeight-[38] vwFont-[15]  port:text-[2.963vw] port:h-[7.315vw]  vwWidth-[102] port:w-[19.722vw] port:m-[-0.75vw]  justify-center self-center">
        <slot name="svg"/>
    </div>
</div>

<style lang="scss">
  .shade-numbers {

    -webkit-text-stroke-color: #3E3A37;
    -webkit-text-stroke-width: thin;
    filter: drop-shadow(0px 0.2vw 0px #151413);
  }

  @media (orientation: portrait) {
    .shade-numbers {

      -webkit-text-stroke-color: black;
      -webkit-text-stroke-width: thin;
      filter: drop-shadow(0.25vw 0.25vw #333);

    }
  }
</style>
