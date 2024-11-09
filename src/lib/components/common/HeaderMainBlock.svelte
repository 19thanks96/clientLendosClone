<script lang="ts">
	export let bgHeaderMainBlock: string
	export let text: string

	let textStyle = ''
</script>

<div style="background-image: url({bgHeaderMainBlock});"
     class="h-full w-full bg-no-repeat bg-center text-center flex flex-col justify-center items-center  port:text-[6.41vw] vhFont-[110] font-['Fira_Sans'] font-black bg-contain tablet">
    <div style={textStyle} class="header-main-block-text">{text?.toUpperCase()}</div>
</div>

<style lang="css">
    .header-main-block-text {
        padding-top: 3%;
        word-spacing: 100vw;
        background: linear-gradient(to top, #FFF859, #FFCD03, #FFF618, #FFF8D6, #FFF8D6);
        color: transparent;
        -webkit-background-clip: text;
        -webkit-text-stroke-color: #C60909;
        -webkit-text-stroke-width: 0.15vw;

        filter: drop-shadow(0.1vw 0.5vw #8E1010);
        line-height: 1.1;
    }

    @media (orientation: portrait) {
        .header-main-block-text {


            -webkit-text-stroke-color: #C60909;
            -webkit-text-stroke-width: 0.15vw;
            font-size: 10.185vw;
            filter: drop-shadow(0.1vw 0.5vw #8E1010);

        }
    }

    @media (max-aspect-ratio: 1/1) and (min-aspect-ratio: 1/1.75) {
        .tablet {
            font-size: 5vw;
            /*transform: scale(1.1);*/
        }
    }

    @media (max-aspect-ratio: 1/1) and (min-aspect-ratio: 1/1.5) {
        .tablet {
            font-size: 4vw;
            /*transform: scale(1.3);*/
        }
    }

</style>
