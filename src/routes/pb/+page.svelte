<script lang="ts">
    import {rewardState} from '$lib/state/reward.state';
    import {syncWithPlayerPbState} from '$lib/state/pb.state';
    import {playerState} from '$lib/state/player.state';
    import Spinner from '$lib/components/common/Spinner.svelte';
    import {AdapterCommunicationService} from '$lib/adapter-listener';
    import thor from "$lib/components/piggy-bank/images/thor.svelte?raw";
    import Content from "$lib/components/piggy-bank/components/Content.svelte"
    import CloseButton from "$lib/components/piggy-bank/components/CloseButton.svelte";
    import type {PiggyBankType} from "../../common/models/piggy-bank.type";
    import Reward from "$lib/components/piggy-bank/components/Reward.svelte";
    import {showInfoPopUp} from "$lib/state/infoPopUp.state";
    import Info from "$lib/components/piggy-bank/components/Info.svelte";
    import Money from "$lib/components/common/Money.svelte";

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


<aside class="modal">
    {#if $showInfoPopUp.isOpen}
        <div class="info__overlay">
            <Info infoText={$playerState?.pb?.info}/>
        </div>
    {/if}
    {#if $rewardState.isOpen}
        <Reward balance={balance} rewardAmount={$rewardState.amount} on:close={() => $rewardState.isOpen = false}/>
    {/if}

    {#if $playerState.isInitialized && $playerState.pb}
        {#if !$rewardState.isOpen}
            <Money {balance}
                 img={`https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format`}></Money>
        {/if}
    <div class="modal__content">
        <span class="thor">{@html thor}</span>
        <CloseButton on:click={exit} />
        <Content piggyBank={pb} />
    </div>
    {:else}
          <div style='transform: translate(calc(50vw - 50%), calc(50vh - 50%));'
                             class="w-full h-full flex justify-center items-center">
                            <Spinner/>
          </div>
    {/if}
</aside>

<style>
    .modal {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: radial-gradient(rgba(40, 113, 223, 0.7),rgba(8, 25, 57, 0.7));
    }

    .modal__content{
        position: relative;
        height: 900px;
        width: 1000px;
        background-image: url("/src/lib/components/piggy-bank/images/background.svg");
        background-size: cover;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .info__overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: radial-gradient(rgba(40, 113, 223, 0.7), rgba(5, 17, 40, 0.63)); /* Background for the Info overlay */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
    }
    .thor {
        position: absolute;
        left: 0;
        top: -5%;
        animation: thor 1s ;
    }

    @keyframes thor {
        0%{
            opacity: 0;
            transform: translateX(-9000px);
        }
        100%{
            opacity: 1;
            transform: translateX(0);
        }
    }

    @media screen and (max-width: 1020px) {
        .thor {
            display: none;
        }
    }
    @media screen and (max-width: 450px) {
        .modal__content{
            height: 600px;
            width: 500px;
            background-repeat: no-repeat;
            background-size:contain;
        }
    }

</style>