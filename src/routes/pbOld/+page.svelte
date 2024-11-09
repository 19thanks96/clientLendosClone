<script lang="ts">
    import Money from '$lib/components/common/Money.svelte';
    import RewardLayoutPb from '$lib/components/piggy-bank/layout/RewardLayoutPb.svelte';
    import {rewardState} from '$lib/state/reward.state';
    import ExitButton from '$lib/components/common/ExitButton.svelte';
    import {syncWithPlayerPbState} from '$lib/state/pb.state';
    import {playerState} from '$lib/state/player.state';
    import Info from '$lib/components/common/Info.svelte';
    import Spinner from '$lib/components/common/Spinner.svelte';
    import {AdapterCommunicationService} from '$lib/adapter-listener';
    import PbMainBlock from '$lib/components/piggy-bank/PbMainBlock.svelte';
    import {base} from '$app/paths';
    import BgImage from '$lib/components/mission/BgImage.svelte';
    import VikingLayout from "$lib/components/piggy-bank/layout/VikingLayout.svelte";
    import type {PiggyBankType} from "../../common/models/piggy-bank.type";

    let pb:PiggyBankType;
    let balance:number;
    $: if ($playerState.isInitialized) {
        pb = $playerState.pb;
        balance = $playerState.general.balance;

        if ($playerState.pb) {
            syncWithPlayerPbState($playerState);
        }
    }


    const exit = () => AdapterCommunicationService.sendMessage({type: 'exit', message: 'click'});
</script>


<div class=" h-screen w-screen box-border srcn overflow-hidden">
    <BgImage bgImage={`${base}/newImg/Fx_Cmn_Overlay_Blue.png`} isTutorial={true}
             leftSideImg={!$playerState.tutorial ? `https://p2w.imgix.net/resources/client/pb/Chs_Mb_Thor.png?auto=compress&auto=format` : `https://p2w.imgix.net/resources/client/tutorial/npc1.png?auto=compress&auto=format`}>

        {#if $playerState.isInitialized && $playerState.pb}
            <!--            <div  class="flex absolute w-screen h-screen justify-between xl:flex">-->
            <!--            </div>-->
            <!--            <Curtains></Curtains>-->

            <Info
                    background={`https://p2w.imgix.net/resources/client/store/Btn_Cmn_S_Violet_Active.png?auto=compress&auto=format`}
                    image={`https://p2w.imgix.net/resources/client/store/Icn_Cmn_Info.png?auto=compress&auto=format`}
                    bgPopup={`https://p2w.imgix.net/resources/client/dm/Cmt_Cmn_Bg_Ovrl_Viloet.png?auto=compress&auto=format`}
                    text={$playerState?.pb?.info}/>
            <PbMainBlock {pb}/>
<!--            <VikingLayout></VikingLayout>-->
            <ExitButton on:click={exit}
                        background={`https://p2w.imgix.net/resources/client/dm/Btn_Red_S.png?auto=compress&auto=format`}
                        image={`https://p2w.imgix.net/resources/client/dm/Icn_Close.png?auto=compress&auto=format`}/>
            <div class="{$rewardState.isOpen ? 'opacity-0':'opacity-1'}">
                <Money {balance}
                       img={`https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format`}></Money>

            </div>
        {:else}
            <div style='transform: translate(calc(50vw - 50%), calc(50vh - 50%));'
                 class="w-full h-full flex justify-center items-center">
                <Spinner/>
            </div>
        {/if}

    </BgImage>

    {#if $rewardState.isOpen}
        <RewardLayoutPb {balance} amount={$rewardState.amount}
                        on:close={() => $rewardState.isOpen = false}/>
    {:else }
        <div></div>
    {/if}

</div>