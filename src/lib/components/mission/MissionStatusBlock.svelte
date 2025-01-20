<script lang="ts">
    import {formatNumber} from '$lib/utils';
    import coin from "$lib/components/common/Coin.svelte?raw";

    export let money: string;
    export let IcnCoin: string;

    let frontMoney = formatNumber(money);

    export let id;

</script>

<div id={id} style="" class="flex flex-col w-[100px]  h-full  text-left grow-0">
    <div
            class=" flex w-[84px] h-[30px] justify-center items-center text-[#e8e8e8] text-xs font-semibold font-['Poppins'] uppercase rounded-lg my-[15px]">
        <slot name="svg"/>
    </div>
    <div class=" h-[29px] flex justify-center items-center my-[10px]">
        <div
                class="flex relative flex-col justify-center items-center   h-[12px] gap-[3px]  ">

            <div class="reward-text">Reward:</div>
            <span class="flex relative  justify-center items-center   h-[12px] gap-x-[3px]  ">

            {@html coin}
            <span
                    class=" shade-numbers  flex justify-center items-center">{frontMoney}</span>
            </span>

        </div>
    </div>
</div>

<style lang="scss">
  .shade-numbers {


      height: 17px;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;
      color: #E9E9E9;
  }

  .reward-text{
      /* Reward: */

      width: 41px;
      height: 12px;

      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 10px;
      line-height: 12px;
      text-align: center;
      color: #A1A5AD;

  }

  //@media (orientation: portrait) {
  //  .shade-numbers {
  //
  //    -webkit-text-stroke-color: black;
  //    -webkit-text-stroke-width: thin;
  //    filter: drop-shadow(0.25vw 0.25vw #333);
  //
  //  }
  //}
</style>
