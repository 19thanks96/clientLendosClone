<script lang="ts">
    import { base } from '$app/paths'
    export let coin_balance: number;
      
     const bg_image:string = `https://p2w.imgix.net/resources/client/dm/Cmt_Counter.png?auto=compress&auto=format`;
     const coin:string = `https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format`;
     
</script>
<div style="width: 100px; height:100px">
        <span class="absolute top-2 left-12 z-11 text-white ">
            500
        </span>
        <img src={bg_image} class="absolute top-2 left-4 z-2 "/>
        <img style="position: absolute;" class="absolute top-1.5 left-4 z-10" src={coin} alt="coin"/>
    
</div>

