<script lang="ts">
    import {goto} from "$app/navigation";
    export let background:string
    export let image:string
</script>

<span on:click={() => goto('/sc')} style="background-image: url({background});" class="absolute bottom-[1.19792vw] right-[1.19792vw] port:bottom-[2.037vw] port:right-[2.037vw]  vwWidth-[80] vwHeight-[80] port:w-[7.407vw] port:h-[7.407vw] bg-cover music-button z-[10]"><img class='m-[25%]  vwWidth-[40] vwHeight-[40] port:w-[3.704vw] port:h-[3.704vw]'  src={image} alt="music" /></span>
