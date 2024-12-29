<script lang="ts">
    import {rewardState} from '$lib/state/reward.state';

    import {playerState} from '$lib/state/player.state';
    import Spinner from '$lib/components/common/Spinner.svelte';
    import {AdapterCommunicationService} from '$lib/adapter-listener';
    import type {PiggyBankType} from "../../common/models/piggy-bank.type";
    import Reward from "$lib/components/piggy-bank/components/Reward.svelte";
    import {showInfoPopUp} from "$lib/state/infoPopUp.state";
    import Info from "$lib/components/piggy-bank/components/Info.svelte";
    import { base } from '$app/paths';
    import timer from '$lib/components/common/Timer.svelte?raw';
    import CountdownTimer from '$lib/components/common/CountdownTimer.svelte';
    import ExitButton from '$lib/components/common/ExitButton.svelte';
    import UserBalance from '$lib/components/common/Money.svelte';
    import Title from '$lib/components/mission/Title.svelte';

    import {  syncWithPlayerPbState } from '$lib/state/pb.state';

    import PbMainContent from '$lib/components/piggy-bank/reskin/PbMainContent.svelte';


    let pb:PiggyBankType;
    let balance:number;
    let dateEnd:string;
    $: if ($playerState.isInitialized && $playerState.pb && $playerState.pb.name) {
        pb = $playerState.pb;
        balance = $playerState.general.balance;
        name = $playerState.pb.name;

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
        <div class="{$rewardState.isOpen ? 'opacity-0' :'opacity-1'}">
            <UserBalance {balance} isNotReward={true}
            />
            <div class="absolute top-[36px] right-[15px] z-[9]">
                <ExitButton on:click={exit} />
            </div>
        </div>
        {#key $playerState}
                <div class=" w-full h-full header-wrapper blackHole z-[-2]">


                </div>
            <div style='background-image: url({base}/reskin/astronautPb.png)'
                 class="absolute h-full bg-contain bg-no-repeat astronaut z-[2]">

            </div>
            <div class=" w-full h-full header-wrapper blackHole z-[2] top-[15px_!important]">
                <div
                  class="relative top-[43%] left-[66%] timer text-[#D2D2D2] text-[10px] leading-[1.5] flex items-center pl-[5px]">
                        <span class="h-[15px] w-[15px] ">
													{@html timer}
                        </span>
                    <span  class="h-auto  ml-[5px] font-['Poppins'] font-[600] text-[10px] leading-[15px] text-[#D2D2D2]">
													<CountdownTimer {dateEnd} />
												</span>
                </div>
                <Title  title="Info Bank"
                        description={$playerState.pb.info} text={$playerState.pb.name} />
            </div>
            <div class="absolute top-[16px] left-0 right-0 bottom-0 border-rounded overflow-hidden">
                <div style='background-image:linear-gradient(to bottom, rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, 1) 95%), url({base}/reskin/blackHole.png)'
                     class="w-full h-full bg-contain bg-no-repeat blackHole">
                </div>
            </div>

                <PbMainContent piggyBank={$playerState.pb}/>

        {/key}
    {:else}
          <div style='transform: translate(calc(50vw - 50%), calc(50vh - 50%));'
                             class="w-full h-full flex justify-center items-center">
                            <Spinner/>
          </div>
    {/if}
</aside>

<style>

    .border-rounded {
        background: #050505;
        border: 1px solid #1E2026;
        border-radius: 32px;
        z-index: -2;

    }


    .blackHole {
        background-size: cover;

        background-position: center;
        mask: linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0) 100%);

    }
    .blackHole,
    .header-wrapper{
        height: 225px;
        position: absolute;
        top: 0;
    }

    .astronaut {
        background-size: contain;
        background-position: top center;
        height: 205px;
        top: 8px;
        margin: auto;
        width: 100%;
        z-index: 0;

    }

    .timer {
        width: 90px;
        height: 26px;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 14px;
        z-index: 2;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
    }




</style>