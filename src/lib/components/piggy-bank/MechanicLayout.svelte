<script lang="ts">

    export let bgImageUrl: string;


    const bg_after: string = `https://p2w.imgix.net/resources/client/pb/Img_Background_1.png?auto=compress&auto=format`;
</script>


<div style="background-image: url('{bg_after}'); background-position:center;"
     class="bg-cover  bgMain  bg-no-repeat  relative overflow-hidden h-full w-full"
>
    <slot/>
</div>

<style>
    .bgMain {
        backdrop-filter: brightness(0.3) blur(5px);
        background-color: black;
    }

    @media (orientation: portrait) {
        .bgMain {
            background-size: max(239.259vw, 239.259vw);
        }
    }

</style>