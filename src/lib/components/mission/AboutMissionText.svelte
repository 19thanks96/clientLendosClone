<script lang="ts">

    import {formatNumber} from '$lib/utils';
    import {base} from '$app/paths';

    export let name: string;
    export let description: string;

    export let money: string;
    export let status: string;
    export let progress: number;
    let img = `${base}/newImg/Cmt_Mb_Progress_Full.png`;
    let frontMoney = formatNumber(money);
</script>

<div
        class="shrink overflow-hidden justify-evenly port:justify-between  grow flex h-full  flex-col land:px-[0.3vw] port:px-[1.08vw] leading-none ">

    <div style="white-space:nowrap; "
         class="vwFont-[17.16] port:max-w-[29.907vw] port:text-[3.333vw]   leading-[1] port:leading-[1] text-[#C5683F] font-['Fira_Sans'] font-black text-ellipsis ">{name}</div>
    <div style="white-space:nowrap; "
         class="vwFont-[12] port:pb-[1.019vw] port:max-w-[29.907vw] port:text-[2.5vw] leading-[1.1] port:leading-[1.2] text-[#989180] font-['Fira_Sans'] font-black  text-ellipsis">{description}</div>

    <div
            class="port:w-full vwHeight-[25] port:h-[5.37vw] vwWidth-[169] bg-contain bg-no-repeat flex items-center  bg-reward-progress "
            style="">
        <div
                class="absolute z-[2] left-[45%] translate-x-[-50%] flex flex-row items-center port:gap-[0.463vw] gap-[0.26vw] font-['Fira_Sans'] font-black ">

            <div style=" -webkit-text-stroke-color: rgba(62, 58, 55, 1);"
                 class="vwFont-[16] port:text-[2.963vw] text-[white] white-text-stroke leading-none port:leading-[1.2]">{status}</div>
        </div>
        <div class="h-full  port:w-full overflow-hidden" style="{`width: ${progress}%;` }">
            <div
                    class="h-full vwWidth-[169] port:w-[33.2vw] pbar2 bg-contain bg-no-repeat flex justify-center items-center relative"
                    style="background-image: url({img}); background-size: 100% 100%;">
            </div>
        </div>

    </div>

</div>

<style lang="scss">
  .bg-reward-progress {
    background: rgba(156, 132, 110, 0.15);
    box-shadow: 0px 0.1vw 0px rgba(255, 255, 255, 0.8), inset 0px 0.2vw 0.2vw rgba(159, 138, 108, 0.3);
    border-radius: 0.34vw;
  }

  .white-text-stroke {
    -webkit-text-stroke-width: 0.02vw;
    filter: drop-shadow(0px 0.2vw 0px #151413);
  }


  @media(orientation: portrait) {

    .white-text-stroke {
        -webkit-text-stroke-width: 0.15vw;
        filter: drop-shadow(0px 0.25vw 0px #151413);
    }
    .bg-reward-progress {
      background: rgba(156, 132, 110, 0.15);
      box-shadow: 0 0.1vw 0 rgba(255, 255, 255, 0.8), inset 0 0.2vw 0.386vw rgba(159, 138, 108, 0.3);
      border-radius: 1.5vw;
    }
  }


</style>