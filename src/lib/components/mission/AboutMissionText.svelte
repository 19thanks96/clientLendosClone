<script lang="ts">

	import { formatNumber } from '$lib/utils';
	import { base } from '$app/paths';

	export let name: string;
	export let description: string;

	export let money: string;
	export let status: string;
	export let progress: number;
	let img = `${base}/newImg/Cmt_Mb_Progress_Full.png`;
	let frontMoney = formatNumber(money);
</script>

<div
	class="shrink overflow-hidden justify-evenly port:justify-between  grow flex h-full  flex-col p-[10px] leading-none ">
	<div class="gap-[3px] grid">

		<div style="white-space:nowrap; "
				 class="name ">{name}</div>
		<div style="white-space:nowrap; "
				 class="description">{description}</div>
	</div>

	<div
		class="w-full h-auto flex flex-col gap-[5px]"
		style="">
		<div class="progress-text">
			{status}
		</div>
		<div class="progress-bar-bg">

			<div style="width: min({progress}%, 100%)" class="progress-bar">

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

  .name {
    width: 145px;
    height: 17px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 1.2;
    color: #DDDDDD;
  }

  .description {
    width: 145px;
    height: 14px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 1;
    color: #A1A5AD;

  }

  .progress-text {
    width: 67px;
    height: 14px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 120%;
    color: #CECECE;
  }

  .progress-bar-bg {


    position: relative;
    width: 100%;
    height: 6px;
    background: #000000;
    border-radius: 4px;
  }

  .progress-bar {
    width: 157px;
    height: 6px;
    background: linear-gradient(90deg, #524DD8 0%, #725FEA 100%), linear-gradient(90deg, #E6B223 0%, #EADB18 100%), linear-gradient(90deg, #524DD8 0%, #725FEA 100%), linear-gradient(90deg, #E6B223 0%, #EADB18 100%), linear-gradient(90deg, #645FF3 0%, #826FFF 100%);
    border-radius: 4px;

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