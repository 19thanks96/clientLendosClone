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
    let dateEnd
    $: if ($playerState.isInitialized && $playerState.pb && $playerState.pb.name) {
        pb = $playerState.pb;
        balance = $playerState.general.balance;
        name = $playerState.pb.name;
        dateEnd = $playerState.pb.dateEnd;

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
        <div class="absolute top-[32px] left-0 right-0 bottom-0 border-rounded overflow-hidden z-[99]">
        <Reward balance={balance} rewardAmount={$rewardState.amount} on:close={() => $rewardState.isOpen = false}/>
        </div>
    {/if}

    <!--{#if $playerState.isInitialized && $playerState.pb}-->
        <div class="{$rewardState.isOpen ? 'opacity-0' :'opacity-1'} relative ">
            <div class="relative top-[30px] left-[13px] z-[9]">
                <UserBalance {balance} isNotReward={true} />
            </div>
            <div class="absolute top-[30px] right-[15px] z-[9]">
                <ExitButton on:click={exit} />
            </div>
        </div>
        {#key $playerState}
                <div class=" w-full h-full header-wrapper blackHole z-[-2]">


                </div>
            <div style='background-image: url({base}/reskin/astronautPb.png)'
                 class="absolute h-full bg-contain bg-no-repeat astronaut z-[2]">

            </div>
            <div class="w-full h-full bg-contain bg-no-repeat blackHole z-[3] top-[14px_!important] ">
                <div style="background-image: url('https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/client/common/timerBg.svg')"
                     class="relative top-[61px] left-[0.1px] timer text-[#D2D2D2] text-[10px] leading-[1.5] flex items-center  bg-contain bg-no-repeat">
                    <div  class="w-full h-full bg-contain bg-no-repeat flex items-center justify-center">
										<span class="h-auto  ml-[5px] font-['Poppins'] font-[700] text-[14px] leading-[15px] text-[#080808]">
													<CountdownTimer {dateEnd} />
											</span>
                    </div>
                </div>
                <Title title={$playerState.pb.name}
                       description={$playerState.pb.info} text={name} className="top-[80px]" />
            </div>
            <div class="absolute top-[16px] left-0 right-0 bottom-0 border-rounded overflow-hidden z-[0]">
                <div
                  style='background-image:linear-gradient(to bottom, rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, 1) 95%),  url({base}/reskin/blackHole.png)'
                  class="w-full h-full bg-contain bg-no-repeat blackHole">

                </div>
            </div>

                <PbMainContent piggyBank={$playerState.pb}/>

        {/key}
    <!--{:else}-->
<!--    <div class="w-full h-full flex justify-center items-center relative left-1/2 translate-x-[-50%] ">-->
<!--                            <Spinner/>-->
<!--          </div>-->
    <!--{/if}-->
</aside>

<style>

</style>