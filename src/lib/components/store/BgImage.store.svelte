<script lang="ts">
	import { onMount } from 'svelte';

	export let bgImage: string;
	export let leftSideImg: string;
	export let isTutorial:boolean = false;
	let ready = false;
	onMount(() => ready = true);

</script>
<!--<div style=""-->
<!--		 class="relative overflow-hidden h-full w-full bg-cover  flex justify-center items-center opacity-80">-->
<!--	<div-->
<!--		style=""-->
<!--		class="   absolute overflow-hidden land:w-[100vw] port:w-[100vh] land:h-[100vw] port:h-[100vh]">-->
<!--	</div>-->
<!--</div>-->
<div style="	backdrop-filter: blur(20px);"
	class="h-full absolute top-0 left-0 bottom-0 right-0 w-full  bg-[rgb(0,0,0,0.4)] flex justify-center items-center  overflow-hidden">

<!--	<div style="background-image: url({bgImage});"-->
<!--			 class="bg-center  bg-no-repeat  overscroll-none overflow-hidden  land:w-[87vh] port:w-[100vw] land:h-[87vh] port:h-[100vw] port:scale-150  bg-contain   ">-->
<!--	</div>-->
</div>
<div class="w-full h-full  flex justify-center items-center absolute top-0 overflow-hidden">
	{#if !isTutorial}
		<div style="background-image: url({leftSideImg});"
				 class="w-[20.5%] h-[76.5%] absolute right-[120vw] bottom-[7vh] bg-center bg-contain bg-no-repeat  { ready  ? 'left-side-img' : ''} "></div>
	{:else }
	<div style="background-image: url({leftSideImg});"
			 class="w-[20.5%] h-[68.5%] absolute left-[-22vw] bottom-[11%] bg-contain bg-no-repeat  { ready ? 'left-side-img-tutorial' : ''} "></div>

	{/if}
	<slot />
</div>

<style lang="css">
    .left-side-img {
        animation: leftSideAppearance 0.5s ease forwards;
        animation-delay: 1s;
        pointer-events: none;

    }
    .left-side-img-tutorial{
        animation: leftSideAppearanceTutorial 0.5s ease forwards;
        animation-delay: 1s;
        z-index: 6;
        pointer-events: none;

    }

    @keyframes leftSideAppearance {
        from {
            right: 122vw;
						opacity: 0;
            transform-origin: right bottom;

        }
        to {
            right: 57%;
						opacity: 1;
						transform-origin: right bottom;
        }
    }
    @keyframes leftSideAppearanceTutorial {
        from {
            left: -22vw;
            opacity: 0;
        }
        to {
            left: 22vw;
            opacity: 1;
        }
    }

    @media (max-aspect-ratio: 5/3) {
        .left-side-img, .left-side-img-tutorial{
            display: none;
        }
    }
</style>