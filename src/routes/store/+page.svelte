<script lang='ts'>
    import BgImage from '$lib/components/store/BgImage.store.svelte';
    import UserBalance from '$lib/components/common/Money.svelte';
    import PrivacyButton from '$lib/components/common/PrivacyButton.svelte';
    import MainBlock from '$lib/components/store/MainBlock.svelte';
    import {playerState} from '$lib/state/player.state';
    import Spinner from '$lib/components/common/Spinner.svelte';
    import {showPopUpStoreLayout} from '$lib/state/storePopup.state';
    import {base} from '$app/paths';
    import {AdapterCommunicationService} from '$lib/adapter-listener';

    let goodsArray: unknown, title: unknown;

    $: if ($playerState.isInitialized && $playerState.store && $playerState.store.offers) {
        goodsArray = $playerState.store.offers;
    }

    const exit = () => AdapterCommunicationService.sendMessage({type: 'exit', message: 'click'});

</script>
<div style='height: 100dvh;' class=" w-screen overflow-hidden">
    <BgImage bgImage={`${base}/newImg/Fx_Cmn_Overlay_Blue.png`} isTutorial={$playerState.tutorial}
             leftSideImg={!$playerState.tutorial ? `${base}/newImg/Chs_Str_FortuneTeller.png`  : `https://p2w.imgix.net/resources/client/tutorial/npc1.png?auto=compress&auto=format`}>
        {#if $playerState.isInitialized && $playerState.store && $playerState.store.offers.length > 0 }
            <div class="{$showPopUpStoreLayout.isOpen ? 'opacity-0':'opacity-1'}">
                <UserBalance balance={$playerState.general.balance}
                             img={`https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format`}/>
            </div>
            <PrivacyButton
                    background={`https://p2w.imgix.net/resources/client/store/Btn_Cmn_S_Blue_Hover.png?auto=compress&auto=format`}
                    bgPopup={`https://p2w.imgix.net/resources/client/dm/Cmt_Cmn_Bg_Ovrl_Viloet.png?auto=compress&auto=format`}
                    image={`https://p2w.imgix.net/resources/client/store/Icon_Privacy.png?auto=compress&auto=format`}
                    text={$playerState.store.terms}/>
            <MainBlock {goodsArray} {exit}/>
        {:else}
            <div style="transform: translate(0, calc(50vh - 50%));"
                 class="w-full h-full flex justify-center items-center">
                <Spinner/>
            </div>
        {/if}
    </BgImage>
</div>

