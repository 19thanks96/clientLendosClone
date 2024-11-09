<script lang="ts">
    import { base } from '$app/paths'

    const curtainsLeft:string = `https://p2w.imgix.net/resources/client/pb/Img_Curtains-left.png?auto=compress&auto=format`
    const curtainsRight:string = `https://p2w.imgix.net/resources/client/pb/Img_Curtains.png?auto=compress&auto=format`
</script>

<div class="flex absolute w-full justify-between z-9 port:hidden  curtains">
    <img src="{curtainsLeft}"  alt="curtains" class="w-[20%] h-full">
    <img src="{curtainsRight}" alt="curtains" class="w-[20%] h-full">
</div>



<style>
    .curtains {
        height: 100vh;
    }
</style>