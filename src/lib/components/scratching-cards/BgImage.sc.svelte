<script lang="ts">
    import { base } from '$app/paths'
    import { onMount } from 'svelte';
    
    export let bgImage: string;
    const leftSideImg:string = `https://p2w.imgix.net/resources/client/sc/Img_Leprechaun.png?auto=compress&auto=format`;
    const rightSideImg:string = `https://p2w.imgix.net/resources/client/sc/Img_Pot_SC.png?auto=compress&auto=format`;


    let ready = false;
    onMount(() => ready = true);

</script>

<div style="background-image: url({bgImage}); background-color: black; " class="bg-center  bg-no-repeat  relative overflow-hidden h-full w-full bgImage">
    <div class="w-full h-full relative flex justify-center items-center">
        
    <div style="background-image: url({leftSideImg});" class="w-[22%] h-[60%] absolute left-[17vw] bottom-[-60vw] bg-contain bg-no-repeat { ready ? 'left-side-img' : ''} port:hidden" ></div>
    <div style="background-image: url({rightSideImg});" class="vhWidth-[525] vhHeight-[574] absolute right-[8.2vw] hidden bottom-[2vw] bg-cover bg-no-repeat { ready ? 'right-side-img' : ''} port:hidden" ></div>
    
    <slot/>
    </div>
</div>

<style lang="css">
    .bgImage{
        background-position-y: 71%;
        background-size: max(100vw, 177.77vh);
    }
    @media (orientation: portrait) {
        .bgImage{
        background-position-y: 50%;
        background-size: max(196.111vw, 110.313vh);
    }
    }
    .left-side-img{
        animation: leftSideAppearance 0.5s ease forwards;
        pointer-events: none;
    }

    @keyframes leftSideAppearance {
        from{
            bottom: -60vw;
        }
        to{
            bottom: 0vw;
        }
    }
    @media (aspect-ratio: 16/9){
        .right-side-img{
            animation: rightSideAppearance 0.5s ease forwards;
            display: block;
        }
    }
    

    @keyframes rightSideAppearance {
        from{
            bottom: -60vw;
        }
        to{
            bottom: 2vw;
        }
    }

    @media (max-aspect-ratio: 5/3) {
        .left-side-img{
            display: none;
        }
    }
</style>