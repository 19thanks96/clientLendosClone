<script lang="ts">
    import {base} from '$app/paths';
    import ExitButton from '$lib/components/common/ExitButton.svelte';

    let img = `${base}/newImg/dmHeader.png`;

    export let exit: () => void;
</script>

<div  style="background-image: url({img});"
     class="h-full land:h-[97%] w-[95%] port:w-full mx-auto  bg-no-repeat bg-center text-center  flex flex-col mt-[-20.5%] port:mt-[-16.5%] justify-center items-center  port:text-[6.41vw] vhFont-[110] font-['Fira_Sans'] font-black bg-cover tablet">
</div>
<div class="w-full relative h-[17.5%] land:h-[60%] port:mt-[-18.75%] land:mt-[-1vh] scale-110 bg-contain bg-no-repeat flex justify-center items-center">
    <div class="absolute top-0 port:w-[110%] port:h-[104%] w-[116%] h-[103%] translate-y-[-100%]">
<!--        <ExitButton on:click={exit}-->
<!--                    background={`https://p2w.imgix.net/resources/client/dm/Btn_Red_S.png?auto=compress&auto=format`}-->
<!--                    image={`https://p2w.imgix.net/resources/client/dm/Icn_Close.png?auto=compress&auto=format`}/>-->
    </div>
</div>


<style lang="css">
</style>
