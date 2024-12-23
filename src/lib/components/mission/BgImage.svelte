<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	export let bgImage: string;
	export let leftSideImg: string;
	export let isPb:boolean = false;
	export let isTutorial:boolean = false;
	let ready = false;
	onMount(() => ready = true);

</script>

<!--<div style="	backdrop-filter: blur(20px);"-->
<!--	class="h-full bg-[rgb(0,0,0,0.4)] absolute top-0 left-0 bottom-0 right-0 w-full  flex justify-center items-center opacity-80 overflow-hidden">-->


<!--</div>-->
<div class="w-full h-full  flex justify-center items-center absolute top-0 overflow-hidden">
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
            transform-origin: right bottom;
            right: 55.75%;
            opacity: 1;
        }
    }


		@media (max-aspect-ratio: 16/9) {
			@keyframes leftSideAppearance {
				from {
						right: 122vw;
						opacity: 0;
						transform-origin: right bottom;
				}
				to {
						right: 60%;
						opacity: 1;
				}
      }
    }




    @keyframes leftSideAppearanceTutorial {
        from {
            left: 122vw;
            opacity: 0;
            transform-origin: right bottom;
        }
        to {
            transform-origin: right bottom;
            right: 56vw;
            opacity: 1;
        }
    }
    @media (max-aspect-ratio: 16/9) {
        @keyframes leftSideAppearanceTutorial {
            from {
                right: 122vw;
                opacity: 0;
                transform-origin: right bottom;
            }
            to {
                transform-origin: right bottom;
                right: 60vw;
                opacity: 1;
            }
        }
    }

    @media (max-aspect-ratio: 5/3) {
        .left-side-img, .left-side-img-tutorial  {
            display: none;
        }
    }
</style>