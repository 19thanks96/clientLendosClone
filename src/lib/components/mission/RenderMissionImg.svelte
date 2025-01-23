<script lang="ts">
	import InfoButton from '$lib/components/common/InfoButton.svelte';

	export let image: string;
	export let isTutorialMission: boolean;
	export let pathToImg = 'https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/p2w/mission-logos/';
</script>

<button on:click class="mission-card__image" style="background-image: url('{pathToImg}{image}'); background-position: center center;">
	<div class="mission-card__image-info f-center-center">
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

<style lang="scss">
	.mission-card__image {
      width: 98px;
	  flex-shrink: 0;
      height: 98px;
      border-radius: 8px;
      position: relative;
    background: rgba(0, 0, 0, 0.60);
	  &-info {
        width: 16px;
        height: 16px;
        border-radius: 5.565px;
        position: absolute;
		display: flex;
        justify-content: center;
		align-items: center;
        top: 3px;
        right: 3px;
        //border: 0.667px solid rgba(216, 225, 255, 0.20);
        //background: rgba(0, 0, 0, 0.90);

	  }
    }
</style>

<!--<div class="w-[98px] relative rounded-[8px]  ml-[3px] mission-banner">-->
<!--	<button on:click class="w-full  h-full absolute top-0 z-[4]">-->
<!--		<div style="background-image: url('{pathToImg}{image}'); background-position: center center;"-->
<!--				 class=" rounded-[8px] bg-[gray] bg-contain bg-no-repeat flex self-center mission-image"></div>-->

<!--		<div-->
<!--			class="absolute z-[6] right-[3px] top-[3px]  w-[16px] h-[16px] ">-->
<!--			{#if !isTutorialMission}-->
<!--				<InfoButton rounded={6}/>-->
<!--			{/if}-->
<!--		</div>-->
<!--		{#if isTutorialMission}-->
<!--			<img class="z-[7] absolute top-[-4%] left-[-4%] w-[44%] aspect-[1/1]  pointer-events-none"-->
<!--					 src="https://p2w.imgix.net/resources/client/tutorial/Badge.png?auto=compress&auto=format"-->
<!--					 alt="Tutorial Badge" />-->
<!--		{/if}-->

<!--	</button>-->
<!--</div>-->

<!--<style lang="scss">-->
<!--  .top-glass-p2w {-->
<!--    border-radius: 0.25vw 0.25vw 0.4vw 0.4vw;-->
<!--  }-->

<!--  .bottom-glass-p2w {-->
<!--    border-radius: 0.25vw;-->
<!--  }-->

<!--  .mission-banner {-->
<!--    height: 98px;-->
<!--    width: 98px;-->
<!--	flex-shrink: 0;-->
<!--  }-->

<!--  .mission-image {-->
<!--	flex-shrink: 0;-->
<!--    height: 100%;-->
<!--  }-->

<!--  @media (orientation: portrait) {-->
<!--    .top-glass-p2w {-->
<!--      border-radius: 1vw 1vw 1.5vw 1.5vw;-->
<!--    }-->
<!--    .bottom-glass-p2w {-->
<!--      border-radius: 1vw;-->
<!--    }-->
<!--  }-->
<!--</style>-->