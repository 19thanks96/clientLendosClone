<script lang="ts">
	import InfoButton from '$lib/components/common/InfoButton.svelte';

	export let image: string;
	export let isTutorialMission: boolean;
	export let pathToImg = 'https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/p2w/mission-logos/';
</script>

<div style="aspect-ratio: 1/1;" class="w-[98px] relative rounded-[8px]  ml-[3px]">
	<button on:click style="aspect-ratio: 1/1;" class="w-full  h-full absolute top-0 z-[4]">
		<div style="background-image: url('{pathToImg}{image}'); aspect-ratio: 1/1; background-position: center center;"
				 class=" rounded-[8px] bg-[gray] bg-contain h-full bg-no-repeat flex self-center"></div>

		<div
			class="absolute z-[6] right-[3px] top-[3px]  w-[16px] h-[16px] ">
			{#if !isTutorialMission}
				<InfoButton rounded={6}/>
			{/if}
		</div>
		{#if isTutorialMission}
			<img class="z-[7] absolute top-[-4%] left-[-4%] w-[44%] aspect-[1/1]  pointer-events-none"
					 src="https://p2w.imgix.net/resources/client/tutorial/Badge.png?auto=compress&auto=format"
					 alt="Tutorial Badge" />
		{/if}

	</button>
</div>

<style lang="scss">
  .top-glass-p2w {
    border-radius: 0.25vw 0.25vw 0.4vw 0.4vw;
  }

  .bottom-glass-p2w {
    border-radius: 0.25vw;
  }

  @media (orientation: portrait) {
    .top-glass-p2w {
      border-radius: 1vw 1vw 1.5vw 1.5vw;
    }
    .bottom-glass-p2w {
      border-radius: 1vw;
    }
  }
</style>