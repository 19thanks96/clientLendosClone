<script lang="ts">
    import {goto} from '$app/navigation';
    import {playerState} from '$lib/state/player.state';
    import {page} from "$app/stores";

    export let balance: number;
    export let img: string;
    let isFormWidget = $page.url.searchParams.get('fromWidget')
    export let isReward = false;


    $: frontMoney = Math.round(balance)?.toLocaleString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ') ?? '';

    //#tutorial
    $:isClickable = $playerState.store && (!$playerState.tutorial || $playerState.tutorial && $playerState.tutorial.step === 4)


    const onClickBalance = async () => {
        if (isClickable && !isFormWidget) {
            // await goto('/store')
        }
    }
</script>

<div on:click={onClickBalance}
     class="{isClickable? 'cursor-pointer':''} mobile-bind-to-top absolute z-[11] top-[0.15vw] left-[1.25vw] port:top-[2.037vw] port:left-[4.037vw] flex items-center justify-center vwHeight-[64] font-['Fira_Sans'] font-black vwFont-[18] port:h-[5.926vw] port:w-[22.222vw] port:text-[3.519vw] text-white vwWidth-[114.38]">
    <img alt="" class="vwHeight-[30] port:h-[5.926vw]"
         src='https://p2w.imgix.net/resources/client/common/Coin_Bg_Left.png?auto=compress&auto=format'>
    <div
            class=" bg-contain bg-repeat-x vwHeight-[30] port:h-[5.926vw] flex items-center justify-center"
            style="background-image: url('https://p2w.imgix.net/resources/client/common/Coin_Bg_Center.png?auto=compress&auto=format'); flex-grow: 1;">
        {frontMoney}
    </div>
    <img src={'https://p2w.imgix.net/resources/client/common/Coin_Bg_Right.png?auto=compress&auto=format'}
         class="vwHeight-[30] port:h-[5.926vw]" alt="">
    <img src={img}
         class="vwHeight-[30] port:h-[5.926vw] absolute top-0 left-0 getPos
          bind-to-top" alt="">
</div>

<style lang="scss">
  .bind-to-top {
    transform: scale(1.4) translate(-15%, 42.5%);
  }

  @media (orientation: portrait) {
    .bind-to-top {
      transform: scale(1.4) translate(-9%, 4.5%);
    }

    .mobile-bind-to-top{
      position: fixed;
      left: 5%;
      top: 3%;
    }
  }
</style>