<script lang="ts">

	export let firstTextPart: string;
	export let secondTextPart: string;
	export let scale: number;
	let yeelowTextStyle = 'background: linear-gradient(to top, #ffd22a, #ffd22a); color: transparent; -webkit-background-clip: text; filter: drop-shadow(0 0.25vw #ad5a23 ); '

	let textStyle = `background: linear-gradient(to top, #FFF8D6, #FFF618, #FFCD03, #FFF859); color: transparent; -webkit-background-clip: text; text-align: center; scale:${scale}`
</script>

<div class="absolute mt-[2.8%] port:mt-[12%]  w-full font-black   flex flex-col gap-[10px] justify-center items-center  port:text-[13.519vw] vwFont-[69] leading-[1.15] font-['Fira_Sans'] rewardCongratulationText  bg-contain">
	<div style={textStyle} class="" >{firstTextPart}</div>
	<!--    <div style={textStyle} class="port:hidden">COMPLETED</div>-->
	{#if secondTextPart}
		<div style={textStyle} class="block">{secondTextPart}</div>
	{/if}

</div>

<style lang="scss">
  .rewardCongratulationText {
    filter: drop-shadow(0 0.25vw #ad5a23 );
  }
  @media (orientation: portrait) {
    .rewardCongratulationText {
      filter: drop-shadow(0 1vw #ad5a23 );
    }
  }
</style>