<script lang="ts">
    export let image:string
</script>

<div class="flex justify-center items-center w-full h-full z-[12]">
    <div style="background-image: url({image}); aspect-ratio: 1/1;" class="land:w-[50vw] land:h-[50vw] port:w-[100vw] port:h-[100vw] z-[10] bg-[length:100%_100%] animate-rotation  "></div>
</div>
<style lang="css">
    .animate-rotation{
        will-change: transform;
        animation: rotation 10s linear infinite;
    }
    @keyframes rotation {
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
</style>