<script lang="ts">
    import BgImage from '$lib/components/mission/BgImage.svelte';
    import MainBlock from '$lib/components/mission/MainBlock.svelte';
    import HeaderMainBlock from '$lib/components/mission/HeaderMainBlock.svelte';
    import UserBalance from '$lib/components/common/Money.svelte';
    import MissionList from '$lib/components/mission/MissionList.svelte';
    import CountdownTimer from '$lib/components/common/CountdownTimer.svelte';
    import {rewardState} from '$lib/state/reward.state';
    import {AdapterCommunicationService} from '$lib/adapter-listener';
    import {playerState} from '$lib/state/player.state';
    import Spinner from '$lib/components/common/Spinner.svelte';
    import RewardLayoutDm from '$lib/components/reward/RewardLayoutDm.svelte';
    import {base} from '$app/paths';
    import Title from '$lib/components/mission/Title.svelte';

    let missions, balance, dateEnd, name;
    $: if ($playerState.isInitialized && $playerState?.mg && $playerState?.mg?.missions) {
        missions = $playerState.mg.missions;
        dateEnd = $playerState.mg.dateEnd;
        name = $playerState.mg.name;
        balance = $playerState.general.balance;
    }




    const exit = () => AdapterCommunicationService.sendMessage({type: 'exit', message: 'click'});
</script>

<div style='height: 100dvh;' class=" w-screen overflow-hidden">

    <BgImage bgImage={`${base}/newImg/Fx_Cmn_Overlay_Blue.png`} isTutorial={$playerState.tutorial}
             leftSideImg={!$playerState.tutorial ? `${base}/newImg/Chs_Dm_Archer.png` : `https://p2w.imgix.net/resources/client/tutorial/npc1.png?auto=compress&auto=format`}>

        {#if $playerState?.isInitialized && $playerState?.mg && $playerState?.mg?.missions?.length > 0}
            <div class="{$rewardState.isOpen ? 'opacity-0' :'opacity-1'}">
                <UserBalance {balance}
                             img={`https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format`}/>
            </div>
            {#key $playerState}
                <MainBlock>
                    <div class="w-full h-full" slot="header">
                        <HeaderMainBlock
                                bgHeaderMainBlock={`https://p2w.imgix.net/resources/client/dm/Pnl_Title_0002.png?auto=compress&auto=format`}
                                text={name} {exit}/>
                    </div>

                    <div slot=mission>
                        <MissionList {missions}/>
                    </div>

                    <div slot="title">
                        <Title
                                bgPopup={`https://p2w.imgix.net/resources/client/dm/Bg_Overlay_Reward.png?auto=compress&auto=format`}
                                description={$playerState.mg.info} text={name}/>
                    </div>
                    <span class="font-['Fira_Sans'] font-black text-[#F6EAC0]" slot='timer'>
											<CountdownTimer {dateEnd}/>
                    </span>
                </MainBlock>
            {/key}

        {:else}
            <Spinner></Spinner>
        {/if}
    </BgImage>
    {#if $rewardState.isOpen}
        <RewardLayoutDm  rewardAmount={$rewardState.amount}
                        on:close={() => $rewardState.isOpen = false }/>
    {/if}
</div>

<style lang='scss'>

</style>
