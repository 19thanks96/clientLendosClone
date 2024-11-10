<script lang="ts">

    export let background: string;
    export let image: string;
</script>

<button  on:click style="background-image: url({background}); pointer-events:all;"
     class=" absolute  top-[1.19792vw] right-[1.19792vw] port:top-[3%] port:right-[4%] bg-cover exit-button vwWidth-[32] port:w-[7vw] port:h-[7vw] vwHeight-[32] z-[5]">
    <img class='m-[25%] vwWidth-[17] vwHeight-[17] port:w-[3.5vw] port:h-[3.5vw] cursor-pointer' src={image}
         alt="exit"/>
</button>

