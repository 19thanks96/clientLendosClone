<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {playerState} from "$lib/state/player.state";
    import {goto} from "$app/navigation";
    import {AdapterCommunicationService} from "$lib/adapter-listener";
    import {userBalanceBeforeRewardState} from "$lib/state/oldUserBalance.state";
    import {MissionStatus} from "../../../../common/models/mission.type";
    import {enrichTutorialMissions} from "$lib/tutorial.service";
    import {rewardState} from "$lib/state/reward.state";

    import RewardText from "$lib/components/reward/RewardText.svelte";
    import UserBalance from "$lib/components/common/Money.svelte";
 import SecondAppButton from '$lib/components/common/SecondAppButton.svelte';
 import RewardCongratulationText from '$lib/components/reward/RewardCongratulationText.svelte';

    export let balance: number;
    export let rewardAmount: number;
    let dispatch = createEventDispatcher();
    let startAnimation: boolean = false
    let opacityButton = 1
    let interval: number;

    const decreaseAmount = rewardAmount / 200;
    const redirectOrHideAfterTimeout = () => {
        if (!!$playerState.store && $playerState.store.offers.length !== 0 && !$playerState.mg.missions.some((m => m.missionType === 'pbClaim' && m.status === 'completed'))) {
            AdapterCommunicationService.sendMessage({
                type: 'redirect',
                message: '/store'
            })
            goto('/store')
        } else if (!!$playerState.mg && $playerState.mg.missions.length !== 0) {
            AdapterCommunicationService.sendMessage({
                type: 'redirect',
                message: '/dm'
            })
            goto('/dm')
        } else {
            AdapterCommunicationService.sendMessage({type: 'exit', message: 'click'})
        }
    }
    const addNumber = () => {
        rewardAmount -= decreaseAmount;
        $userBalanceBeforeRewardState += decreaseAmount;
        if (rewardAmount <= 0) {
            rewardAmount = balance
            clearInterval(interval);
            setTimeout(() => {
                //#tutorial
                dispatch('close')
                AdapterCommunicationService.sendMessage({type: 'hidePopup', message: 'click'})
                if ($playerState.tutorial?.step === 2) {
                    let missionReward;
                    $playerState.mg.missions = $playerState.mg.missions.map((m) => {
                        if (m.id === 'mgTutorialPb') {
                            m.status = MissionStatus.inactive;
                            missionReward = m.rewards;
                        }
                        return m;
                    });
                    $playerState.general.balance = $playerState.general.balance + (missionReward * 2);
                    $playerState.mg.missions = enrichTutorialMissions($playerState.mg.missions, $playerState.tutorial, 'store');
                    AdapterCommunicationService.sendMessage({
                        type: 'tutorialProgress',
                        message: {step: 2}
                    });
                    $playerState.tutorial.step = 3;
                    AdapterCommunicationService.sendMessage({
                        type: 'redirect',
                        message: '/dm'
                    })
                    goto('/dm')
                } else {
                    redirectOrHideAfterTimeout()
                }

            }, 1000)
        }
    };


    const claimRewardWithRedirect = () => {
        //#tutorial
        if ($playerState.tutorial?.step === 2) {
            AdapterCommunicationService.sendMessage({
                type: 'hideTutorialHints',
            });
        }
        AdapterCommunicationService.sendMessage({
            type: 'track',
            message: {type: 'clickGetPbReward', entityId: $rewardState?.entityId}
        });
        opacityButton = 0;
        startAnimation = true;


        setTimeout(() => {
            if (rewardAmount !== 0) {
                interval = setInterval(addNumber, 10);
            }
        }, 1000)
    }


</script>

<div class="z-[11] bg-black bg-opacity-90 absolute top-0 left-0 right-0  bottom-0 text-white overflow-hidden rounded-[32px] ">
    <div class='first-reward-element'>
        <RewardCongratulationText first="You" second="Open box!"/>
    </div>
    <div class="third-reward-element balance-pos top-[13px] left-[13px] z-[9] relative">
        <UserBalance {balance} isNotReward={false}/>
    </div>
    <div style="background-image: url('https://p2w.imgix.net/resources/client/dm/DMReward.png?auto=compress&auto=format');background-position: bottom; background-size: 100% 100%; " class='second-reward-element w-full h-full bg-cover bg-no-repeat  bg-black'>
    </div>
    <div style="background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 38.5%, rgba(0, 0, 0, 0.7) 61%, rgba(0, 0, 0, 0) 100%);"
         class="w-full h-[138px] fixed  right-0 bottom-0  z-[12]">

    </div>

    <RewardText on:holdReward={claimRewardWithRedirect} {rewardAmount} {startAnimation}/>
    <div class="h-full w-full flex justify-center third-reward-element">
        <div id="claimRewardPbButton" style="opacity: {opacityButton}; transition: all 0.5s ease-out;"
             class='third-reward-element text-center w-[90%] h-[45px]  z-50 flex items-center justify-center fixed bottom-[4%] '>
            <SecondAppButton caption="Claim"  on:click={() => claimRewardWithRedirect()} variant="reward"/>
        </div>
    </div>

</div>
<style>

    @keyframes show-reward {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }

    }

    .first-reward-element {
        animation: show-reward 0.1s ease-in-out;
    }

    .second-reward-ement {
        animation: show-elements 0.75s ease-in-out;
    }

    .third-reward-element {
        animation: show-elements 1.25s ease-in-out;
    }

    @keyframes show-elements {
        0% {
            opacity: 0;
        }
        90% {
            opacity: 0;

        }
        100% {
            opacity: 1;
        }
    }
</style>