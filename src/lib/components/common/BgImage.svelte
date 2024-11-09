<script lang="ts">
    import {base} from '$app/paths'
    import {onMount} from 'svelte';

    export let bgImage: string
    const leftSideImg = `https://p2w.imgix.net/resources/client/dm/Img_Artcher_1.png?auto=compress&auto=format`

    let ready = false;
    onMount(() => ready = true);

</script>

<div style="background-image: url({bgImage});"
     class="bg-center  bg-no-repeat  relative overflow-hidden h-full w-full bg-cover bg-black ">
    <div class="w-full h-full relative flex justify-center items-center">

        <div style="background-image: url({leftSideImg});"
             class="w-[22%] h-[80%] absolute left-[-22vw] bottom-0 bg-cover bg-no-repeat { ready ? 'left-side-img' : ''}"></div>

        <slot/>
    </div>
</div>

<style lang="css">
    .left-side-img {
        animation: leftSideAppearance 0.5s ease forwards;
        animation-delay: 1s;
    }

    @keyframes leftSideAppearance {
        from {
            left: -22vw;
        }
        to {
            left: 0vw;
        }
    }

    @media (max-aspect-ratio: 5/3) {
        .left-side-img {
            display: none;
        }
    }
</style>