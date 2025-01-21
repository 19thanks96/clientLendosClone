<script lang="ts">
	import InfoButton from '$lib/components/common/InfoButton.svelte';

	export let image: string;
	export let isTutorialMission: boolean;
	export let pathToImg = 'https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/p2w/mission-logos/';
</script>

<div class="w-[98px] relative rounded-[8px]  ml-[3px] mission-banner">
	<button on:click class="w-full  h-full absolute top-0 z-[4]">
		<div style="background-image: url('{pathToImg}{image}'); background-position: center center;"
				 class=" rounded-[8px] bg-[gray] bg-contain bg-no-repeat flex self-center mission-image"></div>

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

  .mission-banner {
    height: 98px;
    width: 98px;
	flex-shrink: 0;
  }

  .mission-image {
	flex-shrink: 0;
    height: 100%;
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